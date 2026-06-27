-- CreateEnum
CREATE TYPE "Platform" AS ENUM ('PC', 'PLAYSTATION', 'XBOX', 'NINTENDO_SWITCH');

-- CreateEnum
CREATE TYPE "Status" AS ENUM ('PLAYING', 'COMPLETED', 'BACKLOG', 'WISHLIST');

-- CreateTable
CREATE TABLE "Collection" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "imageURL" TEXT NOT NULL,
    "platform" "Platform" NOT NULL,
    "status" "Status" NOT NULL,
    "score" INTEGER NOT NULL,
    "playtime" INTEGER NOT NULL,
    "note" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Collection_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Collection_title_key" ON "Collection"("title");
