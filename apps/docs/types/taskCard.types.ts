export type AttachmentType = 'pdf' | 'image';

export type Attachment = {
  name: string;
  meta?: string;
  type: 'pdf' | 'image';
};

export type Assignment = {
  id: number;

  category: string;
  title: string;
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

  handoff: {
    location: string;
    distance: string;
  };

  task: {
    title: string;
    description: string;
  };

  attachments: Attachment[];
};

export type AssignmentCardProps = {
  assignment: Assignment;
  onViewDetails?: (assignment: Assignment) => void;
};
