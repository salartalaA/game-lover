// "use server";

// import bcrypt from "bcryptjs";
// import { cookies } from "next/headers";
// import { redirect } from "next/navigation";
// import prisma from "@/lib/prisma";

// export async function addUser(email: string, password: string) {
//   const salt = await bcrypt.genSalt(10);
//   const hashedPassword = await bcrypt.hash(password, salt);

//   const user = await prisma.user.findUnique({
//     where: {
//       email,
//     },
//   });

//   if (user) {
//     return redirect("/login");
//   }

//   await prisma.user.create({
//     data: {
//       email,
//       password: hashedPassword,
//     },
//   });

//   redirect("/login");
// }

// export async function getUser(email: string, password: string) {
//   const user = await prisma.user.findUnique({
//     where: {
//       email,
//     },
//   });

//   if (!user) {
//     return redirect("/register");
//   }

//   const isPasswordCorrect = await bcrypt.compare(password, user.password);

//   if (!isPasswordCorrect) {
//     return null;
//   }

//   const cookieStore = await cookies();

//   cookieStore.set("userID", user.id);

//   return user;
// }

"use server";

import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
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
    return redirect("/login");
  }

  await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
    },
  });

  redirect("/login");
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
    return redirect("/register");
  }

  const isPasswordCorrect = await bcrypt.compare(password, user.password);

  if (!isPasswordCorrect) {
    return;
  }

  const cookieStore = await cookies();

  cookieStore.set("userID", user.id);

  redirect("/");
}

export async function logout() {
  const cookieStore = await cookies();

  cookieStore.delete("userID");
}
