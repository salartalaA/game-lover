import { Gamepad2, Joystick, type LucideIcon, Monitor } from "lucide-react";
import type { Platform } from "@/app/generated/prisma/enums";

export const PLATFORM_CONFIG = {
  PC: {
    label: "PC",
    icon: Monitor,
    className: "text-blue-400 bg-blue-400/10 border-blue-400/20",
  },
  PLAYSTATION: {
    label: "PlayStation",
    icon: Gamepad2,
    className: "text-indigo-400 bg-indigo-400/10 border-indigo-400/20",
  },
  XBOX: {
    label: "Xbox",
    icon: Joystick,
    className: "text-green-400 bg-green-400/10 border-green-400/20",
  },
  NINTENDO_SWITCH: {
    label: "Nintendo Switch",
    icon: Gamepad2,
    className: "text-red-400 bg-red-400/10 border-red-400/20",
  },
} satisfies Record<
  Platform,
  {
    label: string;
    icon: LucideIcon;
    className: string;
  }
>;
