export const dynamic = "force-dynamic";

import type { Metadata } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getCollection, getCollectionStats } from "@/actions/collection";
import MainPage from "./_main-page";

export const metadata: Metadata = {
  title: "All Collection",
};

export default async function Home() {
  const cookieStore = await cookies();
  const userID = cookieStore.get("userID")?.value;

  if (!userID) {
    redirect("/login");
  }

  const collectionStats = await getCollectionStats(userID);
  const collection = await getCollection(userID);

  return (
    <MainPage
      collection={collection}
      collectionStats={collectionStats}
      userId={userID}
    />
  );
}
