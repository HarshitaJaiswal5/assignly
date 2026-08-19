export interface UploadAssignmentFormData {
  title: string;
  category: string;
  description: string;
  amount: number;
  dueDate: string;
  dueTime: string;
  location: string;
  instructions: string;
  attachment?: File;
}

export interface UploadAssignmentFormProps {
  onSubmit?: (data: UploadAssignmentFormData) => void;
  isSubmitting?: boolean;
}
