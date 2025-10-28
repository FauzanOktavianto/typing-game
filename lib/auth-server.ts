import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export async function getSession() {
  const session = await auth.api.getSession({
    headers: await import("next/headers").then((h) => h.headers()),
  });

  return session;
}

export async function requireAuth() {
  const session = await getSession();

  if (!session?.session) {
    redirect("/");
  }

  return session.session;
}

