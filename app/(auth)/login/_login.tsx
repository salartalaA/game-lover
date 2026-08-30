"use client";

import { Loader, Lock, LogInIcon, Mail } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";
import { login } from "@/actions/users";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function LoginPage() {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    setLoading(true);

    const result = await login(formData);

    if (result) {
      toast.success("Welcome back!", {
        position: "top-right",
        className: "bg-card! text-primary! border-card!",
        closeButton: true,
      });
    } else {
      toast.error("Invalid credentials", {
        position: "top-right",
        className: "bg-card! text-destructive! border-card!",
        closeButton: true,
      });
    }

    setLoading(false);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="w-full max-w-md">
        <div className="mb-10 text-center">
          <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-primary">
            <LogInIcon className="h-7 w-7 text-primary-foreground" />
          </div>
          <h1 className="font-bold text-3xl text-foreground tracking-tight">
            Welcome Back
          </h1>
          <p className="mt-2 text-muted-foreground">Log in to your account</p>
        </div>

        <div className="rounded-xl border border-border bg-card p-8 shadow-sm">
          <form className="space-y-4" onSubmit={handleSubmit}>
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

            <Button
              className="w-full rounded-lg bg-primary py-6 text-center"
              disabled={loading}
            >
              {loading ? <Loader className="animate-spin" /> : "Log in"}
            </Button>
          </form>
        </div>

        <p className="mt-6 text-center text-muted-foreground text-sm">
          Don't have an account?{"  "}
          <Link
            className="font-medium text-primary hover:underline"
            href={"/register"}
          >
            Create one
          </Link>
        </p>
      </div>
    </div>
  );
}
