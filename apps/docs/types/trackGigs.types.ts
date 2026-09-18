export type GigStatus = 'pending' | 'submitted' | 'completed' | 'failed';

export interface TrackGig {
  id: number;

  title: string;
  category: string;
  description: string;

  requester: {
    name: string;
    verified: boolean;
  };

  payment: {
    amount: number;
    label: string;
  };

  due: {
    date: string;
    time: string;
  };

  location: {
    name: string;
    distance?: string;
  };

  status: GigStatus;

  submittedAt?: string;
  completedAt?: string;
  failedAt?: string;
  failureReason?: string;
}

export interface TrackGigCardProps {
  gig: TrackGig;
  onViewDetails?: (gig: TrackGig) => void;
}
