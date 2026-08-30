import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/actions/users";
import RegisterPage from "./_register";

export const metadata: Metadata = {
  title: "Register",
};

export default async function Register() {
  const currentUser = await getCurrentUser();

  if (currentUser) {
    redirect("/");
  }

  return <RegisterPage />;
}
