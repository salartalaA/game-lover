"use server";

import crypto from "node:crypto";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import prisma from "@/lib/prisma";

export async function register(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (user) {
    return null;
  }

  await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
    },
  });

  return true;
}

export async function login(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!user) {
    return null;
  }

  const isPasswordCorrect = await bcrypt.compare(password, user.password);

  if (!isPasswordCorrect) {
    return;
  }

  const sessionId = crypto.randomUUID();

  const expires = new Date(Date.now() + 1000 * 60 * 60 * 24 * 7);

  await prisma.session.create({
    data: {
      id: sessionId,
      expires,
      userId: user.id,
    },
  });

  const cookieStore = await cookies();

  cookieStore.set("session", sessionId, {
    httpOnly: true,
    sameSite: process.env.NODE_ENV === "production" ? "strict" : "lax",
    secure: process.env.NODE_ENV === "production",
    expires,
  });

  return true;
}

export async function logout() {
  const cookieStore = await cookies();

  const sessionId = cookieStore.get("session")?.value;

  if (sessionId) {
    await prisma.session.deleteMany({
      where: {
        id: sessionId,
      },
    });
  }

  cookieStore.delete("session");
}

export async function getCurrentUser() {
  const cookieStore = await cookies();

  const sessionId = cookieStore.get("session")?.value;

  if (!sessionId) {
    return;
  }

  const session = await prisma.session.findUnique({
    where: {
      id: sessionId,
    },
    include: {
      user: true,
    },
  });

  if (!session) {
    return;
  }

  if (session.expires < new Date()) {
    return;
  }

  return session.user;
}
