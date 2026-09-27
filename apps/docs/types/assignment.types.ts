export namespace Assignment {
  
  export type AssignmentStatus =
    | 'OPEN'
    | 'ASSIGNED'
    | 'COMPLETED'
    | 'IN_PROGRESS'
    | 'SUBMITTED'
    | 'CANCELLED';

  export interface TrackAssignment {
    id: string;
    title: string;
    description: string;
    category?: string;
    user: {
      name: string;
      emailVerified: boolean;
    };
    amount: number;
    distance?: number;
    deliveryDate: string;
    deliveryAddress: string;
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
