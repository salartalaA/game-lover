"use server";

import { revalidatePath } from "next/cache";
import prisma from "@/lib/prisma";
import type { NewCollection, UpdatedCollection } from "@/types/collection";
import { getCurrentUser } from "./users";

export async function getCollection() {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return;
  }

  return await prisma.collection.findMany({
    where: {
      userId: currentUser.id,
    },
  });
}

export async function getCollectionById(id: string) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return;
  }

  return await prisma.collection.findUnique({
    where: {
      id,
      userId: currentUser.id,
    },
  });
}

export async function getCollectionStats() {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return;
  }

  const [totalGames, groupedStats] = await Promise.all([
    prisma.collection.count({
      where: {
        userId: currentUser.id,
      },
    }),

    prisma.collection.groupBy({
      by: ["status"],
      _count: {
        status: true,
      },
      where: {
        userId: currentUser.id,
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

export async function deleteCollectionById(id: string) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return;
  }

  const deletedCollection = await prisma.collection.delete({
    where: {
      id,
      userId: currentUser.id,
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
}: NewCollection) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return;
  }

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
      userId: currentUser.id,
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
