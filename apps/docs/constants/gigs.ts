
export type GigFile = {
  name: string;
  size: string;
  type: 'pdf' | 'zip';
  url: string;
};

export type GigPoster = {
  name: string;
  branch: string;
  year: number;
  rating: number;
  gigs: number;
};

export type Gig = {
  id: string;
  title: string;
  category: string;
  status: string;
  posted: string;
  description: string;
  outcome: string;
  reward: number;
  deadline: string;
  daysLeft: number;
  applicants: number;
  spots: number;
  effort: string;
  level: string;
  location: string;
  skills: string[];
  tools: string[];
  deliverables: string[];
  guidelines: string[];
  eligibility: string[];
  files: GigFile[];
  poster: GigPoster;
};

export const gigs: Gig[] = [
  {
    id: '2018',
    title: 'Graph Problems Tutoring',
    category: 'DSA',
    status: 'Open',
    posted: '2 days ago',

    description:
      'Looking for a student proficient in Data Structures and Algorithms who can help juniors understand graph concepts through practical examples and problem-solving sessions. The work involves preparing explanations, solving problems, and conducting interactive tutoring sessions.',

    outcome:
      'Conduct 3 interactive tutoring sessions covering graph traversal, shortest paths, and minimum spanning trees.',

    reward: 1500,
    deadline: '28 Nov 2026',
    daysLeft: 8,

    applicants: 6,
    spots: 1,

    effort: '5-7 hours',
    level: 'Intermediate',
    location: 'VIT Bhopal',

    skills: [
      'Java',
      'Data Structures',
      'Graph Algorithms',
      'Problem Solving',
      'Communication',
    ],

    tools: [
      'LeetCode',
      'Google Meet',
      'VS Code',
    ],

    deliverables: [
      'Prepare graph algorithm explanations.',
      'Conduct 3 interactive tutoring sessions.',
      'Solve at least 10 graph-based problems.',
      'Share session notes and problem solutions.',
    ],

    guidelines: [
      'All sessions must be conducted online.',
      'Use Java for code demonstrations.',
      'Explain the intuition before showing the solution.',
      'Share learning resources after each session.',
    ],

    eligibility: [
      'B.Tech CSE students',
      'Intermediate DSA knowledge',
      'Good communication skills',
    ],

    files: [
      {
        name: 'Graph Problems Reference.pdf',
        size: '2.4 MB',
        type: 'pdf',
        url: '/dummy-files/graph-problems-reference.pdf',
      },
      {
        name: 'Practice Problems.zip',
        size: '1.2 MB',
        type: 'zip',
        url: '/dummy-files/graph-practice.zip',
      },
    ],

    poster: {
      name: 'Aarav Sharma',
      branch: 'CSE',
      year: 3,
      rating: 4.8,
      gigs: 5,
    },
  },
];

export const getGigById = (gigId: string): Gig | undefined => {
  return gigs.find((gig) => gig.id === gigId);
};
