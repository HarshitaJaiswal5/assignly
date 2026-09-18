import type { Assignment } from '@/types/taskCard.types';

export const assignments: Assignment[] = [
  {
    id: 1,
    category: 'Academic support',
    title: 'Print and bind CS301 project report',
    description:
      'Print the report, add a black spiral bind, and leave it at North Hall.',

    requester: {
      name: 'Nisha Kulkarni',
      verified: true,
    },

    payment: {
      amount: 450,
      label: 'total',
    },

    due: {
      date: 'Today',
      time: '6:00 PM',
    },

    handoff: {
      location: 'North Hall Print Desk',
      distance: '0.8 km',
    },

    task: {
      title: "What you'll do",
      description:
        'Print the attached CS301 report, use A4 double-sided pages, add a black spiral bind, and leave it at the North Hall Print Desk.',
    },

    attachments: [
      {
        name: 'CS301_Final_Report.pdf',
        meta: '18 pages',
        type: 'pdf',
      },
      {
        name: 'Binding_reference.jpg',
        type: 'image',
      },
    ],
  },

  {
    id: 2,
    category: 'Delivery',
    title: 'Deliver lab notebook to North Hall',
    description:
      'Pick up the lab notebook from Science Block and hand it to Prof. Rao in North Hall.',

    requester: {
      name: 'Prof. Arjun Rao',
      verified: true,
    },

    payment: {
      amount: 300,
      label: 'total',
    },

    due: {
      date: 'Today',
      time: '4:30 PM',
    },

    handoff: {
      location: 'North Hall',
      distance: '0.6 km',
    },

    task: {
      title: "What you'll do",
      description:
        'Pick up the lab notebook from the Science Block and safely hand it over to Prof. Rao at North Hall.',
    },

    attachments: [],
  },

  {
    id: 3,
    category: 'Academic support',
    title: 'Format research references for PSY204',
    description:
      'Format the reference list in APA 7th edition for a PSY204 assignment.',

    requester: {
      name: 'Dr. Meera Sharma',
      verified: true,
    },

    payment: {
      amount: 250,
      label: 'total',
    },

    due: {
      date: 'Tomorrow',
      time: '11:00 AM',
    },

    handoff: {
      location: 'Central Library',
      distance: '1.2 km',
    },

    task: {
      title: "What you'll do",
      description:
        'Review and format the provided reference list according to APA 7th edition guidelines.',
    },

    attachments: [],
  },

  {
    id: 4,
    category: 'Data & Excel',
    title: 'Create Excel sheet for ECO102 data',
    description:
      'Organize the dataset in Excel with formulas and basic charts.',

    requester: {
      name: 'Rohan Deshpande',
      verified: true,
    },

    payment: {
      amount: 350,
      label: 'total',
    },

    due: {
      date: 'Tomorrow',
      time: '5:00 PM',
    },

    handoff: {
      location: 'E Block',
      distance: '1.0 km',
    },

    task: {
      title: "What you'll do",
      description:
        'Organize the ECO102 dataset, add the required formulas, and create basic charts in Excel.',
    },

    attachments: [],
  },

  {
    id: 5,
    category: 'Presentation',
    title: 'Prepare slides for marketing presentation',
    description:
      'Create 10–12 slides for the marketing case study presentation.',

    requester: {
      name: 'Ananya Iyer',
      verified: true,
    },

    payment: {
      amount: 400,
      label: 'total',
    },

    due: {
      date: 'In 2 days',
      time: '6:00 PM',
    },

    handoff: {
      location: 'Management Block',
      distance: '1.5 km',
    },

    task: {
      title: "What you'll do",
      description:
        'Create a clean 10–12 slide presentation covering the marketing case study and its key findings.',
    },

    attachments: [],
  },

  {
    id: 6,
    category: 'Academic support',
    title: 'Solve 5 calculus problems for MTH101',
    description:
      'Solve and show steps for the attached calculus problems.',

    requester: {
      name: 'Karthik Subramani',
      verified: false,
    },

    payment: {
      amount: 200,
      label: 'total',
    },

    due: {
      date: 'In 2 days',
      time: '9:00 AM',
    },

    handoff: {
      location: 'Online',
      distance: '2 km',
    },

    task: {
      title: "What you'll do",
      description:
        'Solve the five attached calculus problems and provide clear step-by-step working for each solution.',
    },

    attachments: [],
  },
];