import type { Assignment } from '@/types/assignment.types';

export const trackAssignments: Assignment.TrackAssignment[] = [
  {
    id: '1',
    title: 'Print and bind CS301 project report',
    description:
      'Print the report, add a black spiral bind, and leave it at North Hall.',
    category: 'Academic support',

    user: {
      name: 'Nisha Kulkarni',
      emailVerified: true,
    },

    amount: 450,
    distance: 0.8,
    deliveryDate: '2026-09-29',
    deliveryAddress: 'North Hall Print Desk',

    status: 'OPEN',
    subject: ['Computer Science'],
    postedAt: '2026-09-29T14:30:00',
  },

  {
    id: '2',
    title: 'Prepare slides for marketing presentation',
    description:
      'Create 10–12 slides for the marketing case study presentation.',
    category: 'Presentation',

    user: {
      name: 'Ananya Iyer',
      emailVerified: true,
    },

    amount: 400,
    distance: 1.5,
    deliveryDate: '2026-09-29',
    deliveryAddress: 'Management Block',

    status: 'SUBMITTED',
    subject: ['Marketing'],
    postedAt: '2026-09-29T13:15:00',
  },

  {
    id: '3',
    title: 'Format PSY204 research references',
    description:
      'Format the reference list in APA 7th edition for a PSY204 assignment.',
    category: 'Academic support',

    user: {
      name: 'Dr. Meera Sharma',
      emailVerified: true,
    },

    amount: 250,
    distance: 1.2,
    deliveryDate: '2026-08-15',
    deliveryAddress: 'Central Library',

    status: 'COMPLETED',
    subject: ['Psychology'],
    postedAt: '2026-08-14T16:20:00',
  },

  {
    id: '4',
    title: 'Create Excel sheet for ECO102 data',
    description:
      'Organize the dataset in Excel with formulas and basic charts.',
    category: 'Data & Excel',

    user: {
      name: 'Rohan Deshpande',
      emailVerified: true,
    },

    amount: 350,
    distance: 1.0,
    deliveryDate: '2026-08-10',
    deliveryAddress: 'E Block',

    status: 'CANCELLED',
    subject: ['Economics', 'Excel'],
    postedAt: '2026-08-09T11:30:00',
  },
];
