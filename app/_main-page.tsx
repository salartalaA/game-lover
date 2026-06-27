"use client";

import { useState } from "react";
import CollectionStatus from "@/components/collection-status";
import Header from "@/components/header";
import MainSection from "@/components/main-section";
import type { CollectionStats } from "@/types/collection";
import type { Collection } from "./generated/prisma/client";

export default function MainPage({
  collectionStats,
  collection,
}: {
  collectionStats: CollectionStats;
  collection: Collection[];
}) {
  const [searchState, setSearchState] = useState<string>("");

  return (
    <div className="min-h-screen bg-background">
      <Header searchState={searchState} setSearchState={setSearchState} />
      <main className="mx-auto max-w-7xl space-y-8 px-4 py-6 sm:px-6">
        <CollectionStatus collectionStats={collectionStats} />

        <MainSection
          collection={collection}
          collectionStats={collectionStats}
          searchState={searchState}
        />
      </main>
    </div>
  );
}
