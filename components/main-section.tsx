import { SlidersHorizontal } from "lucide-react";
import { useState } from "react";
import type { Collection } from "@/app/generated/prisma/client";
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox";
import { PLATFORM_CONFIG } from "@/config/platform-config";
import { STATUS_CONFIG } from "@/config/status-config";
import { cn } from "@/lib/utils";
import type { CollectionStats } from "@/types/collection";
import GameCard from "./game-card";
import { Button } from "./ui/button";

export default function MainSection({
  searchState,
  collection,
  collectionStats,
  userId,
}: {
  searchState: string;
  collection: Collection[];
  collectionStats: CollectionStats;
  userId: string;
}) {
  const filterOptions = [
    "Recently Added",
    "Alphabetical",
    "Highest Rating",
    "Most Played",
  ] as const;

  const categories = [
    {
      title: "All Games",
    },
    {
      title: "Playing",
      amount: collectionStats.currentlyPlaying,
    },
    {
      title: "Completed",
      amount: collectionStats.completed,
    },
    {
      title: "Backlog",
      amount: collectionStats.backlog,
    },
    {
      title: "Wishlist",
      amount: collectionStats.wishlist,
    },
  ] as const;

  type Status = (typeof categories)[number]["title"];
  type FilterOption = (typeof filterOptions)[number];

  const [activeCategory, setActiveCategory] = useState<Status>("All Games");
  const [sortBy, setSortBy] = useState<FilterOption>("Recently Added");

  const filteredCollection = collection
    .filter((item) => {
      const filteredGames = item.title
        .toLowerCase()
        .includes(searchState.toLowerCase());

      const filteredCategory =
        activeCategory === "All Games" ||
        item.status.toLowerCase() === activeCategory.toLowerCase();

      return filteredGames && filteredCategory;
    })
    .sort((a, b) => {
      const dateA = new Date(a.createdAt).getTime();
      const dateB = new Date(b.createdAt).getTime();

      if (sortBy === "Recently Added") {
        return dateB - dateA;
      }
      if (sortBy === "Highest Rating") {
        return b.score - a.score;
      }
      if (sortBy === "Most Played") {
        return b.playtime - a.playtime;
      }
      if (sortBy === "Alphabetical") {
        return a.title.localeCompare(b.title);
      }

      return 0;
    });

  return (
    <div>
      <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <h2 className="font-bold font-heading text-2xl text-foreground">
          My Collection
        </h2>

        <Combobox
          defaultValue={"Recently Added"}
          items={filterOptions}
          // onValueChange={setSortBy}
          onValueChange={(value) => {
            if (value && filterOptions.includes(value as FilterOption)) {
              setSortBy(value as FilterOption);
            }
          }}
        >
          <div className="relative w-44">
            <SlidersHorizontal className="absolute top-1/2 left-3 z-10 size-4 -translate-y-1/2 text-muted-foreground" />

            <ComboboxInput
              className="bg-card py-4 pl-7"
              placeholder="Select a filter option"
            />
          </div>

          <ComboboxContent>
            <ComboboxEmpty>No items found.</ComboboxEmpty>

            <ComboboxList>
              {(item) => (
                <ComboboxItem key={item} value={item}>
                  {item}
                </ComboboxItem>
              )}
            </ComboboxList>
          </ComboboxContent>
        </Combobox>
      </div>

      <div className="mb-6 flex items-center gap-2 overflow-x-auto pb-1">
        {categories.map((status) => (
          <Button
            className={cn(
              "whitespace-nowrap rounded-lg px-4 py-4.5 font-medium text-sm transition-all",
              activeCategory === status.title
                ? "bg-primary text-primary-foreground shadow-md shadow-primary/20"
                : "bg-secondary text-muted-foreground hover:bg-secondary/80 hover:text-foreground"
            )}
            key={status.title}
            onClick={() => setActiveCategory(status.title)}
          >
            {status.title}
            {"amount" in status && (
              <span className="text-xs opacity-70">{status.amount}</span>
            )}
          </Button>
        ))}
      </div>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {filteredCollection.length > 0
          ? filteredCollection.map((collection) => (
              <GameCard
                collection={collection}
                Icon={STATUS_CONFIG[collection.status].icon}
                id={collection.id}
                imageURL={collection.imageURL}
                key={collection.id}
                PlatformIcon={PLATFORM_CONFIG[collection.platform].icon}
                platform={PLATFORM_CONFIG[collection.platform].label}
                platformColor={PLATFORM_CONFIG[collection.platform].className}
                playtime={collection.playtime}
                score={collection.score}
                status={STATUS_CONFIG[collection.status].label}
                statusColor={STATUS_CONFIG[collection.status].className}
                title={collection.title}
                userId={userId}
              />
            ))
          : ""}
      </div>

      {filteredCollection.length === 0 && (
        <div className="py-16 text-center">
          <p className="text-muted-foreground">No games found.</p>
        </div>
      )}
    </div>
  );
}
