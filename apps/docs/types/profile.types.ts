export interface ProfileStats {
  completedGigs: number;
  rating: number;
  completionRate: number;
  assignmentsPosted: number;
}

export interface Profile {
  id: string;

  name: string;
  initials: string;
  email: string;
  phone: string;

  location: string;

  college: string;
  program: string;
  year: string;

  skills: string[];

  verified: boolean;

  stats: ProfileStats;
}
