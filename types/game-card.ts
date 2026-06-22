import type { LucideIcon } from "lucide-react";

export interface GameCardItem {
  Icon: LucideIcon;
  imageUrl: string;
  PlatformIcon: LucideIcon;
  platform: string;
  platformColor: string;
  playTime: number;
  score: number;
  status: string;
  statusColor: string;
  title: string;
}
