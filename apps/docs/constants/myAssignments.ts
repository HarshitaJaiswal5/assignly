import type { MyAssignments } from "@/types/myAssignments.types";

export const requestedAssignments: MyAssignments.RequestedAssignment[] = [
  {
    id: 101,
    title: "Print and bind CS301 project report",
    category: "Academic support",

    description:
      "Print, bind, and hand off the report at North Hall before today's deadline.",

    payment: {
      amount: 450,
      label: "total",
    },

    due: {
      date: "Today",
      time: "6:00 PM",
    },

    location: "North Hall Print Desk",

    status: "accepted",

    assignedTo: {
      id: 12,
      name: "Rahul Sharma",
    },
  },

  {
    id: 102,
    title: "Format PSY204 research references",
    category: "Academic support",

    description:
      "Format the reference list according to APA 7th edition.",

    payment: {
      amount: 250,
      label: "total",
    },

    due: {
      date: "Tomorrow",
      time: "11:00 AM",
    },

    location: "Central Library",

    status: "pending",
  },
];