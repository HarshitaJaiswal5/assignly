import type { LucideIcon } from 'lucide-react';

export type Task = {
  title: string;
  description: string;
  price: string;
  due: string;
  location: string;
  distance: string;
  requester: string;
  icon: LucideIcon;
  iconType: 'orange' | 'yellow' | 'green' | 'purple' | 'blue';
  urgent?: boolean;
};

export type TaskCardProps = {
  task: Task;
  onViewDetails?: (_task: Task) => void;
};
