export namespace MyAssignments {
  // -----------------------------
  // Common
  // -----------------------------

  export type Status =
    | 'pending'
    | 'accepted'
    | 'submitted'
    | 'completed'
    | 'failed';

  export type AssignmentTab = 'requested' | 'posted';

  export interface Payment {
    amount: number;
    label: string;
  }

  export interface Due {
    date: string;
    time: string;
  }

  // -----------------------------
  // Assignment requested BY user
  // -----------------------------

  export interface RequestedAssignment {
    id: number;
    title: string;
    category: string;
    description: string;

    payment: Payment;

    due: Due;

    location: string;

    status: Status;

    assignedTo?: {
      id: number;
      name: string;
    };
  }

  // -----------------------------
  // Applicant
  // -----------------------------

  export interface Applicant {
    id: number;
    name: string;
    rating: number;
    completedGigs: number;
    verified: boolean;
  }

  // -----------------------------
  // Assignment posted BY user
  // -----------------------------

  export interface PostedAssignment {
    id: number;
    title: string;
    category: string;
    description: string;

    payment: Payment;

    due: Due;

    location: string;

    status: Status;

    applicants: Applicant[];

    selectedApplicantId?: number;
  }

  // -----------------------------
  // Page Props
  // -----------------------------

  export interface PageProps {
    requestedAssignments: RequestedAssignment[];
    postedAssignments: PostedAssignment[];
  }

  // -----------------------------
  // Tabs
  // -----------------------------

  export interface TabsProps {
    activeTab: AssignmentTab;
    onTabChange: (tab: AssignmentTab) => void;
  }

  // -----------------------------
  // Requested Assignment Card
  // -----------------------------

  export interface RequestedCardProps {
    assignment: RequestedAssignment;
    onViewDetails?: (assignment: RequestedAssignment) => void;
  }

  // -----------------------------
  // Posted Assignment Card
  // -----------------------------

  export interface PostedCardProps {
    assignment: PostedAssignment;

    onReviewApplicants?: (assignment: PostedAssignment) => void;

    onViewDetails?: (assignment: PostedAssignment) => void;
  }

  // -----------------------------
  // Applicant List
  // -----------------------------

  export interface ApplicantListProps {
    applicants: Applicant[];

    selectedApplicantId?: number;

    onAcceptApplicant?: (applicant: Applicant) => void;
  }

  // -----------------------------
  // Applicant Card
  // -----------------------------

  export interface ApplicantCardProps {
    applicant: Applicant;

    selected?: boolean;

    disabled?: boolean;

    onAccept?: (applicant: Applicant) => void;
  }
}
