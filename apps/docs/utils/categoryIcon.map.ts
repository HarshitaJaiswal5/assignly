import { GigCategory } from "@/types/dashboard.types";
import { AppWindow, Briefcase, Code, Code2, Database, FileText, LucideIcon, Palette } from "lucide-react";

export const categoryIcons: Record<GigCategory, LucideIcon> = {
  [GigCategory.DSA]: Code2,
  [GigCategory.WEB_DEV]: AppWindow,
  [GigCategory.CODING]: Code,
  [GigCategory.DATABASE]: Database,
  [GigCategory.DESIGN]: Palette,
  [GigCategory.WRITING]: FileText,
  [GigCategory.OTHERS]: Briefcase,
};