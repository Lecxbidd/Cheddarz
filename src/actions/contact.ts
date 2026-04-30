"use server";

export type ContactActionState = {
  error?: string;
  success?: boolean;
};

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function submitContact(
  _prev: ContactActionState,
  formData: FormData
): Promise<ContactActionState> {
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();

  if (!name || !email || !message) {
    return { error: "Please fill in name, email, and message." };
  }
  if (!EMAIL_REGEX.test(email)) {
    return { error: "Please provide a valid email address." };
  }
  if (message.length < 10) {
    return { error: "Message should be at least 10 characters." };
  }
  if (message.length > 1000) {
    return { error: "Message should be under 1000 characters." };
  }

  // Extend with e.g. supabase.from('contact_messages').insert(...) when you add a table + RLS.
  return { success: true };
}
