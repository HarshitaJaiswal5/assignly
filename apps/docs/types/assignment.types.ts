export namespace Assignment {
  
  export type AssignmentStatus =
    | 'OPEN'
    | 'ASSIGNED'
    | 'COMPLETED'
    | 'INPROGRESS'
    | 'SUBMITTED'
    | 'CANCELLED';

  export interface TrackAssignment {
    id: string;
    title: string;
    description: string;
    category?: string;
    requester: {
      name: string;
      verified: boolean;
    };
    payment: {
      amount: number;
    };
    delivery: {
      date: string;
      time: string;
    };
    location: {
      name: string;
      distance?: string;
    };
    status: AssignmentStatus;
    subject: string[];
    postedAt: string;
  }

  export interface TrackAssignmentCardProps {
    Assignment: TrackAssignment;
    onViewDetails?: (Assignment: TrackAssignment) => void;
  }

  export interface Response {
    success: boolean;
    message: string;
    data: TrackAssignment[];
  }
}
