import type { LucideIcon } from "lucide-react";
import type { Platform, Status } from "@/app/generated/prisma/enums";

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
  backlog: number;
  completed: number;
  currentlyPlaying: number;
  totalGames: number;
  wishlist: number;
}

export interface NewCollection {
  completion: number;
  imageURL: string;
  note: string;
  platform: Platform;
  playtime: number;
  score: number;
  status: Status;
  title: string;
}

export interface UpdatedCollection {
  completion: number;
  id: string;
  imageURL: string;
  note: string;
  platform: Platform;
  playtime: number;
  score: number;
  status: Status;
  title: string;
}
