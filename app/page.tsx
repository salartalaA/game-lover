export const dynamic = "force-dynamic";

import { getCollection, getCollectionStats } from "@/actions/collection";
import MainPage from "./_main-page";

export default async function Home() {
  const collectionStats = await getCollectionStats();
  const collection = await getCollection();

  return <MainPage collection={collection} collectionStats={collectionStats} />;
}
