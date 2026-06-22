import CollectionStatus from "@/components/collection-status";
import Header from "@/components/header";
import MainSection from "@/components/main-section";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="mx-auto max-w-7xl space-y-8 px-4 py-6 sm:px-6">
        <CollectionStatus />

        <MainSection />
      </main>
    </div>
  );
}
