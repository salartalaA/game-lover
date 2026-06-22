"use client";
import {
  CircleCheck,
  Clock,
  Gamepad2,
  Heart,
  Monitor,
  Play,
  SlidersHorizontal,
} from "lucide-react";
import { useState } from "react";
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox";
import { cn } from "@/lib/utils";
import type { GameCardItem } from "../types/game-card";
import GameCard from "./game-card";
import { Button } from "./ui/button";

export default function MainSection() {
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
      amount: 2,
    },
    {
      title: "Completed",
      amount: 2,
    },
    {
      title: "Backlog",
      amount: 1,
    },
    {
      title: "Wishlist",
      amount: 2,
    },
  ] as const;

  type Category = (typeof categories)[number]["title"];

  const [activeCategory, setActiveCategory] = useState<Category>("All Games");

  const gamesInformation: GameCardItem[] = [
    {
      title: "Cyberpunk 2077",
      status: "Playing",
      Icon: Play,
      imageUrl: "https://images.unsplash.com/photo-1542751371-adc38448a05e",
      platform: "PC",
      PlatformIcon: Monitor,
      score: 4,
      playTime: 85,
      statusColor: "text-emerald-400 bg-emerald-400/10 border-emerald-400/20",
      platformColor: "text-blue-400 bg-blue-400/10 border-blue-400/20",
    },
    {
      title: "The Legend of Zelda: Tears of the Kingdom",
      status: "Completed",
      Icon: CircleCheck,
      imageUrl: "https://images.unsplash.com/photo-1551103782-8ab07afd45c1",
      platform: "Nintendo Switch",
      PlatformIcon: Gamepad2,
      score: 5,
      playTime: 120,
      statusColor: "text-blue-400 bg-blue-400/10 border-blue-400/20",
      platformColor: "text-red-400 bg-red-400/10 border-red-400/20",
    },
    {
      title: "Starfield",
      status: "Backlog",
      Icon: Clock,
      imageUrl: "https://images.unsplash.com/photo-1614732414444-096e5f1122d5",
      platform: "Xbox",
      PlatformIcon: Gamepad2,
      score: 3,
      playTime: 12,
      statusColor: "text-amber-400 bg-amber-400/10 border-amber-400/20",
      platformColor: "text-green-400 bg-green-400/10 border-green-400/20",
    },
    {
      title: "Elden Ring",
      status: "Playing",
      Icon: Play,
      imageUrl: "https://images.unsplash.com/photo-1511512578047-dfb367046420",
      platform: "PC",
      PlatformIcon: Monitor,
      score: 5,
      playTime: 200,
      statusColor: "text-emerald-400 bg-emerald-400/10 border-emerald-400/20",
      platformColor: "text-blue-400 bg-blue-400/10 border-blue-400/20",
    },
    {
      title: "Final Fantasy XVI",
      status: "Wishlist",
      Icon: Heart,
      imageUrl: "https://images.unsplash.com/photo-1552820728-8b83bb6b2b28",
      platform: "PlayStation",
      PlatformIcon: Gamepad2,
      score: 0,
      playTime: 0,
      statusColor: "text-pink-400 bg-pink-400/10 border-pink-400/20",
      platformColor: "text-indigo-400 bg-indigo-400/10 border-indigo-400/20",
    },
    {
      title: "Halo Infinite",
      status: "Completed",
      Icon: CircleCheck,
      imageUrl: "https://images.unsplash.com/photo-1493711662062-fa541adb3fc8",
      platform: "Xbox",
      PlatformIcon: Gamepad2,
      score: 5,
      playTime: 35,
      statusColor: "text-blue-400 bg-blue-400/10 border-blue-400/20",
      platformColor: "text-green-400 bg-green-400/10 border-green-400/20",
    },
    {
      title: "Hollow Knight: Silksong",
      status: "Wishlist",
      Icon: Heart,
      imageUrl: "https://images.unsplash.com/photo-1550745165-9bc0b252726f",
      platform: "PC",
      PlatformIcon: Monitor,
      score: 0,
      playTime: 0,
      statusColor: "text-pink-400 bg-pink-400/10 border-pink-400/20",
      platformColor: "text-blue-400 bg-blue-400/10 border-blue-400/20",
    },
  ];

  return (
    <div>
      <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <h2 className="font-bold font-heading text-2xl text-foreground">
          My Collection
        </h2>

        <Combobox defaultValue={filterOptions[0]} items={filterOptions}>
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
        {categories.map((category) => (
          <Button
            className={cn(
              "whitespace-nowrap rounded-lg px-4 py-4.5 font-medium text-sm transition-all",
              activeCategory === category.title
                ? "bg-primary text-primary-foreground shadow-md shadow-primary/20"
                : "bg-secondary text-muted-foreground hover:bg-secondary/80 hover:text-foreground"
            )}
            key={category.title}
            onClick={() => setActiveCategory(category.title)}
          >
            {category.title}
            {"amount" in category && (
              <span className="text-xs opacity-70">{category.amount}</span>
            )}
          </Button>
        ))}
      </div>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {gamesInformation.map((information) => (
          <GameCard
            Icon={information.Icon}
            imageUrl={information.imageUrl}
            key={information.title}
            PlatformIcon={information.PlatformIcon}
            platform={information.platform}
            platformColor={information.platformColor}
            playTime={information.playTime}
            score={information.score}
            status={information.status}
            statusColor={information.statusColor}
            title={information.title}
          />
        ))}
      </div>
    </div>
  );
}
