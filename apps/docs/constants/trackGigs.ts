import type { Assignment } from "@/types/assignment.types";

export const trackAssignments: Assignment.TrackAssignment[] = [
  {
    id: "1",
    title: "Print and bind CS301 project report",
    description:
      "Print the report, add a black spiral bind, and leave it at North Hall.",

    category: "Academic support",

    requester: {
      name: "Nisha Kulkarni",
      verified: true,
    },

    payment: {
      amount: 450,
    },

    delivery: {
      date: "Today",
      time: "6:00 PM",
    },

    location: {
      name: "North Hall Print Desk",
      distance: "0.8 km",
    },

    status: "OPEN",

    subject: ["Computer Science"],

    postedAt: "Today · 2:30 PM",
  },

  {
    id: "2",
    title: "Prepare slides for marketing presentation",
    description:
      "Create 10–12 slides for the marketing case study presentation.",

    category: "Presentation",

    requester: {
      name: "Ananya Iyer",
      verified: true,
    },

    payment: {
      amount: 400,
    },

    delivery: {
      date: "Today",
      time: "8:00 PM",
    },

    location: {
      name: "Management Block",
      distance: "1.5 km",
    },

    status: "SUBMITTED",

    subject: ["Marketing"],

    postedAt: "Today · 1:15 PM",
  },

  {
    id: "3",
    title: "Format PSY204 research references",
    description:
      "Format the reference list in APA 7th edition for a PSY204 assignment.",

    category: "Academic support",

    requester: {
      name: "Dr. Meera Sharma",
      verified: true,
    },

    payment: {
      amount: 250,
    },

    delivery: {
      date: "Aug 15",
      time: "11:00 AM",
    },

    location: {
      name: "Central Library",
      distance: "1.2 km",
    },

    status: "COMPLETED",

    subject: ["Psychology"],

    postedAt: "Aug 14 · 4:20 PM",
  },

  {
    id: "4",
    title: "Create Excel sheet for ECO102 data",
    description:
      "Organize the dataset in Excel with formulas and basic charts.",

    category: "Data & Excel",

    requester: {
      name: "Rohan Deshpande",
      verified: true,
    },

    payment: {
      amount: 350,
    },

    delivery: {
      date: "Aug 10",
      time: "5:00 PM",
    },

    location: {
      name: "E Block",
      distance: "1.0 km",
    },

    status: "CANCELLED",

    subject: ["Economics", "Excel"],

    postedAt: "Aug 9 · 11:30 AM",
  },
];