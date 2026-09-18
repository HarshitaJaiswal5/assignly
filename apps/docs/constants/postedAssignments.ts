import type { MyAssignments } from "@/types/myAssignments.types";

export const postedAssignments: MyAssignments.PostedAssignment[] = [
  {
    id: 201,

    title: "Create Excel sheet for ECO102 data",

    category: "Data & Excel",

    description:
      "Organize the dataset in Excel with formulas and basic charts.",

    payment: {
      amount: 350,
      label: "total",
    },

    due: {
      date: "Tomorrow",
      time: "5:00 PM",
    },

    location: "E Block",

    status: "pending",

    applicants: [
      {
        id: 1,
        name: "Rohan Sharma",
        rating: 4.8,
        completedGigs: 18,
        verified: true,
      },

      {
        id: 2,
        name: "Ananya Iyer",
        rating: 4.7,
        completedGigs: 11,
        verified: true,
      },

      {
        id: 3,
        name: "Karthik Rao",
        rating: 4.5,
        completedGigs: 9,
        verified: false,
      },
    ],
  },

  {
    id: 202,

    title: "Prepare marketing presentation",

    category: "Design & Presentation",

    description:
      "Create 10–12 slides for the marketing case study presentation.",

    payment: {
      amount: 400,
      label: "total",
    },

    due: {
      date: "In 2 days",
      time: "6:00 PM",
    },

    location: "Management Block",

    status: "pending",

    applicants: [
      {
        id: 4,
        name: "Meera Joshi",
        rating: 4.9,
        completedGigs: 24,
        verified: true,
      },
    ],
  },
];