export const dynamic = "force-dynamic";

import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getCollection, getCollectionStats } from "@/actions/collection";
import { getCurrentUser } from "@/actions/users";
import MainPage from "./_main-page";

export const metadata: Metadata = {
  title: "All Collection",
};

export default async function Home() {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    redirect("/login");
  }

  const userID = currentUser.id;

  const collectionStats = await getCollectionStats();
  const collection = await getCollection();

  return (
    <MainPage
      // biome-ignore lint/style/noNonNullAssertion: I'm sure we have data
      collection={collection!}
      // biome-ignore lint/style/noNonNullAssertion: I'm sure we have data
      collectionStats={collectionStats!}
      userId={userID}
    />
  );
}
