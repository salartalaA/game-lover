import { PrismaPg } from "@prisma/adapter-pg";
import { type Prisma, PrismaClient } from "../app/generated/prisma/client";
import "dotenv/config";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({
  adapter,
});

const collectionData: Prisma.CollectionCreateInput[] = [
  {
    title: "Red Dead Redemption 2",
    imageURL:
      "https://upload.wikimedia.org/wikipedia/en/4/44/Red_Dead_Redemption_II.jpg",
    platform: "PLAYSTATION",
    status: "COMPLETED",
    score: 5,
    playtime: 148,
    completion: 100,
    note: "Completed every side mission and loved the emotional ending.",
  },
  {
    title: "The Witcher 3: Wild Hunt",
    imageURL:
      "https://upload.wikimedia.org/wikipedia/en/0/0c/Witcher_3_cover_art.jpg",
    platform: "PC",
    status: "PLAYING",
    score: 5,
    playtime: 95,
    completion: 62,
    note: "Exploring Toussaint DLC and finishing contracts.",
  },
  {
    title: "Elden Ring",
    imageURL:
      "https://cdn.cloudflare.steamstatic.com/steam/apps/1245620/header.jpg",
    platform: "PC",
    status: "PLAYING",
    score: 5,
    playtime: 200,
    completion: 82,
    note: "Exploring optional bosses before finishing the main story.",
  },
  {
    title: "Cyberpunk 2077",
    imageURL:
      "https://cdn.cloudflare.steamstatic.com/steam/apps/1091500/header.jpg",
    platform: "PC",
    status: "PLAYING",
    score: 4,
    playtime: 85,
    completion: 38,
    note: "Night City feels alive after updates and patches.",
  },
  {
    title: "God of War Ragnarök",
    imageURL:
      "https://upload.wikimedia.org/wikipedia/en/e/ee/God_of_War_Ragnar%C3%B6k_cover.jpg",
    platform: "PLAYSTATION",
    status: "BACKLOG",
    score: 0,
    playtime: 0,
    completion: 0,
    note: "Waiting to start after finishing current games.",
  },
  {
    title: "Hades",
    imageURL:
      "https://cdn.cloudflare.steamstatic.com/steam/apps/1145360/header.jpg",
    platform: "PC",
    status: "COMPLETED",
    score: 5,
    playtime: 55,
    completion: 100,
    note: "One of the best roguelike experiences ever made.",
  },
  {
    title: "Sekiro: Shadows Die Twice",
    imageURL:
      "https://cdn.cloudflare.steamstatic.com/steam/apps/814380/header.jpg",
    platform: "PC",
    status: "COMPLETED",
    score: 5,
    playtime: 70,
    completion: 100,
    note: "Perfect combat system and very challenging bosses.",
  },
  {
    title: "Hollow Knight",
    imageURL:
      "https://cdn.cloudflare.steamstatic.com/steam/apps/367520/header.jpg",
    platform: "PC",
    status: "PLAYING",
    score: 5,
    playtime: 40,
    completion: 55,
    note: "Exploring Hallownest and unlocking new abilities.",
  },
  {
    title: "Baldur's Gate 3",
    imageURL:
      "https://cdn.cloudflare.steamstatic.com/steam/apps/1086940/header.jpg",
    platform: "PC",
    status: "PLAYING",
    score: 5,
    playtime: 72,
    completion: 46,
    note: "Choices actually matter in every dialogue.",
  },
  {
    title: "Ghost of Tsushima",
    imageURL:
      "https://upload.wikimedia.org/wikipedia/en/b/b6/Ghost_of_Tsushima.jpg",
    platform: "PLAYSTATION",
    status: "COMPLETED",
    score: 5,
    playtime: 63,
    completion: 100,
    note: "Beautiful open world and satisfying combat.",
  },
];

export async function main() {
  for (const u of collectionData) {
    await prisma.collection.create({ data: u });
  }
}

main();
