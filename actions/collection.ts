"use server";

import { revalidatePath } from "next/cache";
import prisma from "@/lib/prisma";
import type { NewCollection, UpdatedCollection } from "@/types/collection";

export async function getCollection(userId: string) {
  return await prisma.collection.findMany({
    where: {
      userId,
    },
  });
}

export async function getCollectionById(id: string, userId: string) {
  return await prisma.collection.findUnique({
    where: {
      id,
      userId,
    },
  });
}

export async function getCollectionStats(userId: string) {
  const [totalGames, groupedStats] = await Promise.all([
    prisma.collection.count({
      where: {
        userId,
      },
    }),

    prisma.collection.groupBy({
      by: ["status"],
      _count: {
        status: true,
      },
      where: {
        userId,
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
    backlog:
      groupedStats.find((item) => item.status === "BACKLOG")?._count.status ??
      0,
  };
}

export async function deleteCollectionById(id: string, userId: string) {
  const deletedCollection = await prisma.collection.delete({
    where: {
      id,
      userId,
    },
  });

  revalidatePath("/");

  return deletedCollection;
}

export async function addCollection({
  title,
  completion,
  imageURL,
  platform,
  playtime,
  score,
  status,
  note,
  userId,
}: NewCollection) {
  const newCollection = await prisma.collection.create({
    data: {
      title,
      completion,
      imageURL,
      platform,
      playtime,
      score,
      status,
      note,
      userId,
    },
  });

  revalidatePath("/");

  return newCollection;
}

export async function editCollectionById({
  id,
  title,
  completion,
  imageURL,
  platform,
  playtime,
  score,
  status,
  note,
}: UpdatedCollection) {
  const updatedData = await prisma.collection.update({
    data: {
      title,
      completion,
      imageURL,
      platform,
      playtime,
      score,
      status,
      note,
    },
    where: {
      id,
    },
  });

  revalidatePath("/");

  return updatedData;
}
