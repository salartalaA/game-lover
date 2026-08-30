import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/actions/users";
import LoginPage from "./_login";

export const metadata: Metadata = {
  title: "Login",
};

export default async function Login() {
  const currentUser = await getCurrentUser();

  if (currentUser) {
    redirect("/");
  }

  return <LoginPage />;
}
