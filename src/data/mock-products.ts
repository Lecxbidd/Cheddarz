export type MockCategory =
  | "children"
  | "boys"
  | "guys"
  | "ladies"
  | "adults"
  | "streetwear"
  | "casualwear"
  | "accessories";

export type MockProduct = {
  id: string;
  slug: string;
  name: string;
  price: number;
  oldPrice?: number;
  rating?: number;
  unitsSold?: number;
  officialStore?: boolean;
  payOnDelivery?: boolean;
  category: MockCategory;
  imageUrl: string;
  description: string;
  isFeatured: boolean;
};

export const CATEGORY_LABELS: Record<MockCategory, string> = {
  children: "Kid Wears",
  boys: "Boy Wears",
  guys: "Guy Wears",
  ladies: "Ladies Wears",
  adults: "Adult Wears",
  streetwear: "Streetwear",
  casualwear: "Casual Wears",
  accessories: "Accessories",
};

const CATEGORY_KEYWORDS: Record<MockCategory, string[]> = {
  children: ["Playtime", "Cozy", "School Day", "Weekend", "Soft Touch"],
  boys: ["Athletic", "Explorer", "Urban", "Classic", "Motion"],
  guys: ["Tailored", "Modern", "Executive", "Essential", "Premium"],
  ladies: ["Elegant", "Chic", "Refined", "Grace", "Signature"],
  adults: ["Everyday", "Comfort", "Smart", "Versatile", "Relaxed"],
  streetwear: ["Drop", "Hype", "City", "Oversized", "Tech"],
  casualwear: ["Weekend", "Daily", "Lightweight", "Comfort", "Minimal"],
  accessories: ["Carry", "Layer", "Travel", "Signature", "Essentials"],
};

const CATEGORY_ITEMS: Record<MockCategory, string[]> = {
  children: ["Fleece Set", "Puffer Vest", "Rain Jacket", "Knit Set", "Cotton Hoodie"],
  boys: ["Denim Shirt", "Bomber Jacket", "Polo Shirt", "Cargo Pants", "Training Set"],
  guys: ["Oxford Shirt", "Merino Sweater", "Tailored Blazer", "Straight Jeans", "Loafers"],
  ladies: ["Satin Blouse", "Midi Dress", "Cropped Jacket", "Pleated Skirt", "Tote Bag"],
  adults: ["Relaxed Chinos", "Everyday Tee", "Zip Sweatshirt", "Structured Coat", "Commuter Pants"],
  streetwear: ["Graphic Hoodie", "Nylon Jacket", "Tech Cargo", "Oversized Tee", "Sneaker Pack"],
  casualwear: ["Linen Shirt", "Air Tee Pack", "Jogger Set", "Polo Knit", "Soft Hoodie"],
  accessories: ["Leather Belt", "Crossbody Bag", "Beanie", "Travel Wallet", "Canvas Cap"],
};

const CATEGORY_IMAGE_QUERY: Record<MockCategory, string> = {
  children: "kids,fashion,clothing,full-body",
  boys: "boys,teen,fashion,outfit,full-body",
  guys: "men,formal,suit,blazer,full-body",
  ladies: "women,elegant,formal,dress,full-body",
  adults: "adult,smart-casual,fashion,full-body",
  streetwear: "streetwear,urban,fashion,full-body",
  casualwear: "casual,fashion,outfit,full-body",
  accessories: "fashion,accessories,bag,belt,product",
};

function slugify(input: string) {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function imageForCategory(
  category: MockCategory,
  index: number,
  keyword: string,
  item: string
) {
  const categoryQuery = CATEGORY_IMAGE_QUERY[category];
  const itemQuery = `${keyword} ${item}`.toLowerCase().replace(/\s+/g, ",");
  const seed = encodeURIComponent(`${categoryQuery}-${itemQuery}-${index + 1}`);
  // Use stable seeded images to avoid upstream 503 failures.
  return `https://picsum.photos/seed/${seed}/900/1100`;
}

const categories = Object.keys(CATEGORY_LABELS) as MockCategory[];
const productsPerCategory = 15;
let sequence = 1;

export const MOCK_PRODUCTS: MockProduct[] = categories.flatMap((category) => {
  const keywords = CATEGORY_KEYWORDS[category];
  const items = CATEGORY_ITEMS[category];

  return Array.from({ length: productsPerCategory }, (_, index) => {
    const keyword = keywords[index % keywords.length];
    const item = items[index % items.length];
    const name = `${keyword} ${CATEGORY_LABELS[category]} ${item}`;
    const id = `p-${String(sequence++).padStart(3, "0")}`;
    const slug = `${slugify(name)}-${id}`;
    const basePrice = 28 + (index % 5) * 14 + categories.indexOf(category) * 6;
    const price = Number((basePrice + (index % 3) * 2.5).toFixed(2));
    const oldPrice = Number((price * 1.22).toFixed(2));

    return {
      id,
      slug,
      name,
      price,
      oldPrice,
      rating: Number((4.2 + ((index + 2) % 7) * 0.1).toFixed(1)),
      unitsSold: 45 + index * 17 + categories.indexOf(category) * 23,
      officialStore: index % 3 === 0,
      payOnDelivery: index % 2 === 0,
      category,
      imageUrl: imageForCategory(category, index, keyword, item),
      description: `${name} is crafted for ${CATEGORY_LABELS[
        category
      ].toLowerCase()} shoppers, with durable fabric, comfortable fit, and premium finishing details.`,
      isFeatured: index < 3,
    };
  });
});

const repeatedImages = (() => {
  const seen = new Set<string>();
  const duplicates = new Set<string>();
  for (const product of MOCK_PRODUCTS) {
    if (seen.has(product.imageUrl)) {
      duplicates.add(product.imageUrl);
    } else {
      seen.add(product.imageUrl);
    }
  }
  return Array.from(duplicates);
})();

if (repeatedImages.length > 0) {
  // Keep dev server alive; warn loudly instead of crashing runtime.
  console.warn(
    `[mock-products] Duplicate product image URL(s): ${repeatedImages.join(", ")}`
  );
}

