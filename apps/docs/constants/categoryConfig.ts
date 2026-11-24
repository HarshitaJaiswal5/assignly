import { GigCategory } from "@/types/dashboard.types";
import { AppWindow, Code2, Database, Laptop, LucideIcon, Palette, PenTool, Terminal } from "lucide-react";

export const categoryConfig: Record<
    GigCategory,
    { icon: LucideIcon; iconColor: string; iconBg: string }
  > = {
    [GigCategory.DSA]: {
      icon: Code2,
      iconColor: 'text-orange-500',
      iconBg: 'bg-orange-50',
    },
    [GigCategory.WEB_DEV]: {
      icon: Laptop,
      iconColor: 'text-blue-500',
      iconBg: 'bg-blue-50',
    },
    [GigCategory.CODING]: {
      icon: Terminal,
      iconColor: 'text-green-500',
      iconBg: 'bg-green-50',
    },
    [GigCategory.DATABASE]: {
      icon: Database,
      iconColor: 'text-purple-500',
      iconBg: 'bg-purple-50',
    },
    [GigCategory.DESIGN]: {
      icon: Palette,
      iconColor: 'text-pink-500',
      iconBg: 'bg-pink-50',
    },
    [GigCategory.WRITING]: {
      icon: PenTool,
      iconColor: 'text-orange-500',
      iconBg: 'bg-orange-50',
    },
    [GigCategory.OTHERS]: {
      icon: AppWindow,
      iconColor: 'text-gray-500',
      iconBg: 'bg-gray-50',
    },
  };