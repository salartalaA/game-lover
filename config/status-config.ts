import { CircleCheck, Clock, Heart, type LucideIcon, Play } from "lucide-react";
import type { Status } from "@/app/generated/prisma/enums";

export const STATUS_CONFIG = {
  PLAYING: {
    label: "Playing",
    icon: Play,
    className: "text-emerald-400 bg-emerald-400/10 border-emerald-400/20",
  },
  COMPLETED: {
    label: "Completed",
    icon: CircleCheck,
    className: "text-blue-400 bg-blue-400/10 border-blue-400/20",
  },
  BACKLOG: {
    label: "Backlog",
    icon: Clock,
    className: "text-amber-400 bg-amber-400/10 border-amber-400/20",
  },
  WISHLIST: {
    label: "Wishlist",
    icon: Heart,
    className: "text-pink-400 bg-pink-400/10 border-pink-400/20",
  },
} satisfies Record<
  Status,
  {
    label: string;
    icon: LucideIcon;
    className: string;
  }
>;
