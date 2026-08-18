import {
  BriefcaseBusiness,
  BookOpen,
  Calculator,
  FileText,
  PenLine,
} from "lucide-react";

import type { Task } from "@/types/taskCard.types";

export const tasks: Task[] = [
  {
    title: "Print and bind CS301 project report",
    description:
      "Print the report, add a black spiral bind, and leave it at North Hall.",
    price: "₹450",
    due: "Due today · 6:00 PM",
    location: "North Hall Print Desk",
    distance: "0.8 km",
    requester: "Nisha Kulkarni",
    icon: FileText,
    iconType: "orange",
    urgent: true,
  },

  {
    title: "Deliver lab notebook to North Hall",
    description:
      "Pick up the lab notebook from Science Block and hand it to Prof. Rao in North Hall.",
    price: "₹300",
    due: "Due today · 4:30 PM",
    location: "North Hall",
    distance: "0.6 km",
    requester: "Prof. Arjun Rao",
    icon: BookOpen,
    iconType: "yellow",
    urgent: true,
  },

  {
    title: "Format research references for PSY204",
    description:
      "Format the reference list in APA 7th edition for a PSY204 assignment.",
    price: "₹250",
    due: "Due tomorrow · 11:00 AM",
    location: "Central Library",
    distance: "1.2 km",
    requester: "Dr. Meera Sharma",
    icon: FileText,
    iconType: "orange",
  },

  {
    title: "Create Excel sheet for ECO102 data",
    description:
      "Organize the dataset in Excel with formulas and basic charts.",
    price: "₹350",
    due: "Due tomorrow · 5:00 PM",
    location: "E Block",
    distance: "1.0 km",
    requester: "Rohan Deshpande",
    icon: Calculator,
    iconType: "green",
  },

  {
    title: "Prepare slides for marketing presentation",
    description:
      "Create 10–12 slides for the marketing case study presentation.",
    price: "₹400",
    due: "Due in 2 days · 6:00 PM",
    location: "Management Block",
    distance: "1.5 km",
    requester: "Ananya Iyer",
    icon: BriefcaseBusiness,
    iconType: "purple",
  },

  {
    title: "Solve 5 calculus problems for MTH101",
    description:
      "Solve and show steps for the attached calculus problems.",
    price: "₹200",
    due: "Due in 2 days · 9:00 AM",
    location: "Online",
    distance: "0.0 km",
    requester: "Karthik Subramani",
    icon: PenLine,
    iconType: "blue",
  },
];