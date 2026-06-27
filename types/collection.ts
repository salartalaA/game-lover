import type { LucideIcon } from "lucide-react";

export interface GameCardItem {
  Icon: LucideIcon;
  id: string;
  imageURL: string;
  PlatformIcon: LucideIcon;
  platform: string;
  platformColor: string;
  playtime: number;
  score: number;
  status: string;
  statusColor: string;
  title: string;
}

export interface CollectionStats {
  completed: number;
  currentlyPlaying: number;
  totalGames: number;
  wishlist: number;
}
