"use server";

import { revalidatePath } from "next/cache";
import prisma from "@/lib/prisma";

export async function getCollection() {
  return await prisma.collection.findMany();
}

export async function getCollectionById(id: string) {
  return await prisma.collection.findUnique({
    where: {
      id,
    },
  });
}

export async function deleteCollectionById(id: string) {
  const deletedCollection = await prisma.collection.delete({
    where: {
      id,
    },
  });

  revalidatePath("/");

  return deletedCollection;
}

export async function getCollectionStats() {
  const [totalGames, groupedStats] = await Promise.all([
    prisma.collection.count(),
    prisma.collection.groupBy({
      by: ["status"],
      _count: {
        status: true,
      },
    }),
  ]);

  return {
    totalGames,
    currentlyPlaying:
      groupedStats.find((item) => item.status === "PLAYING")?._count.status ??
      0,
    completed:
      groupedStats.find((item) => item.status === "COMPLETED")?._count.status ??
      0,

    wishlist:
      groupedStats.find((item) => item.status === "WISHLIST")?._count.status ??
      0,
  };
}
