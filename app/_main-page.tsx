"use client";

import { useState } from "react";
import CollectionStatus from "@/components/collection-status";
import Header from "@/components/header";
import MainSection from "@/components/main-section";

export default function MainPage() {
  const [searchState, setSearchState] = useState<string>("");

  return (
    <div className="min-h-screen bg-background">
      <Header searchState={searchState} setSearchState={setSearchState} />
      <main className="mx-auto max-w-7xl space-y-8 px-4 py-6 sm:px-6">
        <CollectionStatus />

        <MainSection searchState={searchState} />
      </main>
    </div>
  );
}
