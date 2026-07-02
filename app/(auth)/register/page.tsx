import { Lock, Mail, UserPlus } from "lucide-react";
import type { Metadata } from "next";
import { cookies } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";
import { register } from "@/actions/users";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const metadata: Metadata = {
  title: "Register",
};

export default async function Register() {
  const cookieStore = await cookies();
  const userID = cookieStore.get("userID");

  if (userID) {
    redirect("/");
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="w-full max-w-md">
        <div className="mb-10 text-center">
          <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-primary">
            <UserPlus className="h-7 w-7 text-primary-foreground" />
          </div>
          <h1 className="font-bold text-3xl text-foreground tracking-tight">
            Create your account
          </h1>
          <p className="mt-2 text-muted-foreground">Sign up to get started</p>
        </div>

        <div className="rounded-xl border border-border bg-card p-8 shadow-sm">
          <form action={register} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  className="flex h-12 pl-10 shadow-sm"
                  id="email"
                  name="email"
                  placeholder="you@example.com"
                  required
                  type="email"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  className="flex h-12 pl-10 shadow-sm placeholder:text-lg placeholder:tracking-wider"
                  id="password"
                  name="password"
                  placeholder="••••••••"
                  required
                  type="password"
                />
              </div>
            </div>

            {/* <div className="space-y-2">
              <Label htmlFor="password">Confirm Password</Label>
              <div className="relative">
                <Lock className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  className="flex h-12 pl-10 shadow-sm placeholder:text-lg placeholder:tracking-wider"
                  id="confirmPassword"
                  name="confirmPassword"
                  placeholder="••••••••"
                  required
                  type="password"
                />
              </div>
            </div> */}

            <Button className="w-full rounded-lg bg-primary py-6 text-center">
              Create account
            </Button>
          </form>
        </div>

        <p className="mt-6 text-center text-muted-foreground text-sm">
          Already have an account?{"  "}
          <Link
            className="font-medium text-primary hover:underline"
            href={"/login"}
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
