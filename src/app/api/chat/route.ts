type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

import { MOCK_PRODUCTS } from "@/data/mock-products";

type Recommendation = {
  name: string;
  slug: string;
  price: number;
  category: string;
  reason: string;
};

type ChatResponsePayload = {
  reply: string;
  recommendations: Recommendation[];
  followUps: string[];
  supportLinks: Array<{ label: string; href: string }>;
};

type SupportIntent =
  | "shipping"
  | "returns"
  | "contact"
  | "track_order"
  | "checkout_payment"
  | "account_login"
  | "privacy_terms"
  | "unknown";

const SUPPORT_KNOWLEDGE = `
Support quick facts:
- Shipping: normal delivery usually 3-7 business days, express 1-3 where available.
- Returns: users can start from /returns and check policy details there.
- Tracking: order tracking is available on /track-order.
- Contact support: /contact.
- Cart and checkout: /cart and /checkout.
- Login/signup/help: /login and /signup.
- Privacy and terms: /privacy and /terms.
`.trim();

function getRelevantProducts(query: string, limit = 8) {
  const normalized = query.toLowerCase().trim();
  const terms = normalized.split(/\s+/).filter(Boolean);
  if (terms.length === 0) return MOCK_PRODUCTS.slice(0, limit);

  const scored = MOCK_PRODUCTS.map((product) => {
    const haystack = `${product.name} ${product.description} ${product.category}`.toLowerCase();
    const score = terms.reduce((acc, term) => (haystack.includes(term) ? acc + 1 : acc), 0);
    return { product, score };
  })
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score);

  return (scored.length > 0 ? scored : MOCK_PRODUCTS.map((product) => ({ product, score: 0 })))
    .slice(0, limit)
    .map((item) => item.product);
}

function toProductContext(query: string) {
  const relevant = getRelevantProducts(query, 8);
  const lines = relevant.map(
    (product) =>
      `- ${product.name} | category: ${product.category} | price: $${product.price.toFixed(
        2
      )} | url: /products/${product.slug}`
  );
  return { relevant, context: lines.join("\n") };
}

function detectSupportIntent(message: string): SupportIntent {
  const text = message.toLowerCase();
  if (/(shipping|delivery|ship|dispatch)/.test(text)) return "shipping";
  if (/(return|refund|exchange|cancel order)/.test(text)) return "returns";
  if (/(contact|agent|human|customer care|customer support|talk to someone)/.test(text))
    return "contact";
  if (/(track|where is my order|tracking)/.test(text)) return "track_order";
  if (/(payment|pay|checkout|card|apple pay|google pay|stripe)/.test(text))
    return "checkout_payment";
  if (/(login|sign in|signup|sign up|password|account|profile)/.test(text))
    return "account_login";
  if (/(privacy|terms|policy|gdpr)/.test(text)) return "privacy_terms";
  return "unknown";
}

function supportLinksForIntent(intent: SupportIntent) {
  switch (intent) {
    case "shipping":
      return [
        { label: "Shipping info", href: "/shipping" },
        { label: "Track order", href: "/track-order" },
        { label: "Contact support", href: "/contact" },
      ];
    case "returns":
      return [
        { label: "Returns & exchanges", href: "/returns" },
        { label: "Contact support", href: "/contact" },
      ];
    case "contact":
      return [{ label: "Contact support", href: "/contact" }];
    case "track_order":
      return [
        { label: "Track order", href: "/track-order" },
        { label: "Contact support", href: "/contact" },
      ];
    case "checkout_payment":
      return [
        { label: "Go to checkout", href: "/checkout" },
        { label: "View cart", href: "/cart" },
      ];
    case "account_login":
      return [
        { label: "Login", href: "/login" },
        { label: "Sign up", href: "/signup" },
        { label: "Profile", href: "/profile" },
      ];
    case "privacy_terms":
      return [
        { label: "Privacy policy", href: "/privacy" },
        { label: "Terms", href: "/terms" },
      ];
    default:
      return [];
  }
}

function localReply(latestMessage: string) {
  const text = latestMessage.toLowerCase();
  const { relevant } = toProductContext(latestMessage);
  const intent = detectSupportIntent(latestMessage);
  if (text.includes("size")) {
    return "For sizing: if you are between sizes, choose one size up for a relaxed fit. Tell me your usual size and fit preference (slim/regular/oversized) and I will recommend specific products.";
  }
  if (intent === "shipping") {
    return "Standard delivery usually takes 3-7 business days depending on your location. Express delivery is 1-3 business days where available.";
  }
  if (intent === "returns") {
    return "You can start returns/exchanges from our returns page. If your order is eligible, support can guide you step-by-step.";
  }
  if (intent === "track_order") {
    return "You can track your order from the track-order page. If tracking looks delayed, contact support and include your order details.";
  }
  if (
    text.includes("who are you") ||
    text.includes("what can you do") ||
    text.includes("help me")
  ) {
    return "I can help with store questions (products, sizing, delivery, returns) and also answer general questions beyond the store. Ask anything, and for shopping requests I will include matching picks from the catalogue.";
  }
  if (
    text.includes("weather") ||
    text.includes("news") ||
    text.includes("history") ||
    text.includes("code") ||
    text.includes("math")
  ) {
    return "I can answer that. I do not have guaranteed live browsing in fallback mode, but I can still give a solid explanation and practical guidance. If you want product picks too, add your budget and category.";
  }

  const picks = relevant
    .slice(0, 3)
    .map((product) => `• ${product.name} ($${product.price.toFixed(2)})`)
    .join("\n");

  return `I can help with styling, sizing, and product picks. Based on your request, try these:\n${picks}\n\nTell me your budget and preferred category for more accurate recommendations.`;
}

function buildFallbackPayload(latestMessage: string): ChatResponsePayload {
  const intent = detectSupportIntent(latestMessage);
  const relevant = getRelevantProducts(latestMessage, 3);
  const looksShopping =
    /(wear|outfit|dress|shirt|shoe|style|budget|catalogue|recommend|gift|size|fit|men|women|kids)/i.test(
      latestMessage
    ) || intent === "unknown";
  return {
    reply: localReply(latestMessage),
    recommendations: looksShopping
      ? relevant.map((product) => ({
          name: product.name,
          slug: product.slug,
          price: product.price,
          category: product.category,
          reason: "Matches your request based on category and description similarity.",
        }))
      : [],
    followUps: [
      "Show me options under $70",
      "I need formal wear recommendations",
      "How do returns work?",
      "How can I track my order?",
    ],
    supportLinks: supportLinksForIntent(intent),
  };
}

function safeParsePayload(raw: string): ChatResponsePayload | null {
  try {
    const parsed = JSON.parse(raw) as Partial<ChatResponsePayload>;
    if (!parsed.reply || typeof parsed.reply !== "string") return null;
    const recommendations = Array.isArray(parsed.recommendations)
      ? parsed.recommendations
          .filter(
            (item) =>
              item &&
              typeof item.name === "string" &&
              typeof item.slug === "string" &&
              typeof item.price === "number" &&
              typeof item.category === "string" &&
              typeof item.reason === "string"
          )
          .slice(0, 4)
      : [];
    const followUps = Array.isArray(parsed.followUps)
      ? parsed.followUps.filter((item) => typeof item === "string").slice(0, 4)
      : [];
    const supportLinks = Array.isArray((parsed as { supportLinks?: unknown[] }).supportLinks)
      ? ((parsed as { supportLinks?: unknown[] }).supportLinks ?? [])
          .filter(
            (item): item is { label: string; href: string } =>
              !!item &&
              typeof item === "object" &&
              "label" in item &&
              "href" in item &&
              typeof (item as { label: unknown }).label === "string" &&
              typeof (item as { href: unknown }).href === "string"
          )
          .slice(0, 4)
      : [];
    return {
      reply: parsed.reply,
      recommendations: recommendations as Recommendation[],
      followUps,
      supportLinks,
    };
  } catch {
    return null;
  }
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { messages?: ChatMessage[] };
    const messages = (body.messages ?? [])
      .filter((message) => message && (message.role === "user" || message.role === "assistant"))
      .map((message) => ({
        role: message.role,
        content: String(message.content ?? "").slice(0, 4000),
      }))
      .slice(-20);

    const latestUserMessage =
      [...messages].reverse().find((message) => message.role === "user")?.content ?? "";
    const { context } = toProductContext(latestUserMessage);
    const intent = detectSupportIntent(latestUserMessage);

    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      return Response.json(buildFallbackPayload(latestUserMessage));
    }

    const systemPrompt =
      "You are Cheddar Apparel's support assistant and general chatbot. You should answer store support questions (shipping, returns, tracking, payments, account, policy), product/style questions, and broad general questions. Use concise, helpful language. If a user asks for real-time info you cannot verify, say that briefly and provide best-possible guidance. For store support, include useful support links whenever relevant. Output valid JSON only.";

    const openAiResponse = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: process.env.OPENAI_MODEL ?? "gpt-4.1-mini",
        temperature: 0.4,
        max_tokens: 700,
        messages: [
          { role: "system", content: systemPrompt },
          {
            role: "system",
            content: `Relevant catalog context:\n${context}`,
          },
          {
            role: "system",
            content: `Support knowledge:\n${SUPPORT_KNOWLEDGE}`,
          },
          {
            role: "system",
            content:
              'Return JSON with shape: {"reply": string, "recommendations": [{"name": string, "slug": string, "price": number, "category": string, "reason": string}], "followUps": string[], "supportLinks": [{"label": string, "href": string}]}. Keep recommendations <= 4, followUps <= 4, supportLinks <= 4. If user question is not shopping-related, recommendations can be empty. For support questions, include relevant supportLinks using site paths like /contact, /returns, /track-order, /shipping, /login, /checkout, /privacy, /terms.',
          },
          ...messages.map((message) => ({ role: message.role, content: message.content })),
        ],
      }),
    });

    if (!openAiResponse.ok) {
      return Response.json(buildFallbackPayload(latestUserMessage));
    }

    const data = (await openAiResponse.json()) as {
      choices?: Array<{ message?: { content?: string } }>;
    };
    const content = data.choices?.[0]?.message?.content?.trim() ?? "";
    const parsedPayload = safeParsePayload(content);
    if (!parsedPayload) return Response.json(buildFallbackPayload(latestUserMessage));
    if (parsedPayload.supportLinks.length === 0) {
      parsedPayload.supportLinks = supportLinksForIntent(intent);
    }
    return Response.json(parsedPayload);
  } catch {
    return Response.json(buildFallbackPayload(""), { status: 200 });
  }
}

