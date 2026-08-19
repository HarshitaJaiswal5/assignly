import type { TrackGig } from "@/types/trackGigs.types";

export const trackGigs: TrackGig[] = [
  {
    id: 1,

    title: "Print and bind CS301 project report",

    category: "Academic support",

    description:
      "Print the report, add a black spiral bind, and leave it at North Hall.",

    requester: {
      name: "Nisha Kulkarni",
      verified: true,
    },

    payment: {
      amount: 450,
      label: "total",
    },

    due: {
      date: "Today",
      time: "6:00 PM",
    },

    location: {
      name: "North Hall Print Desk",
      distance: "0.8 km",
    },

    status: "pending",
  },

  {
    id: 2,

    title: "Prepare slides for marketing presentation",

    category: "Presentation",

    description:
      "Create 10–12 slides for the marketing case study presentation.",

    requester: {
      name: "Ananya Iyer",
      verified: true,
    },

    payment: {
      amount: 400,
      label: "total",
    },

    due: {
      date: "Today",
      time: "8:00 PM",
    },

    location: {
      name: "Management Block",
      distance: "1.5 km",
    },

    status: "submitted",

    submittedAt: "Today · 5:10 PM",
  },

  {
    id: 3,

    title: "Format PSY204 research references",

    category: "Academic support",

    description:
      "Format the reference list in APA 7th edition for a PSY204 assignment.",

    requester: {
      name: "Dr. Meera Sharma",
      verified: true,
    },

    payment: {
      amount: 250,
      label: "total",
    },

    due: {
      date: "Aug 15",
      time: "11:00 AM",
    },

    location: {
      name: "Central Library",
      distance: "1.2 km",
    },

    status: "completed",

    completedAt: "Aug 15 · 10:20 AM",
  },

  {
    id: 4,

    title: "Create Excel sheet for ECO102 data",

    category: "Data & Excel",

    description:
      "Organize the dataset in Excel with formulas and basic charts.",

    requester: {
      name: "Rohan Deshpande",
      verified: true,
    },

    payment: {
      amount: 350,
      label: "total",
    },

    due: {
      date: "Aug 10",
      time: "5:00 PM",
    },

    location: {
      name: "E Block",
      distance: "1.0 km",
    },

    status: "failed",

    failedAt: "Aug 10 · 5:30 PM",

    failureReason: "Deadline missed",
  },
];