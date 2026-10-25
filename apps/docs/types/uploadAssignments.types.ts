export interface CreateAssignmentPayload {
  title: string;
  description: string;
  descriptionPDF?: string | null;
  referencePDF?: string | null;
  instructions?: string | null;
  subject: string[];
  amount: number;
  deliveryDate: string;
  deliveryAddress: string;
  deliveryLatitude: number;
  deliveryLongitude: number;
  additionalStationary?: string[];
  additionalStationaryAmount?: number;
}

export interface CreatedAssignment {
  id: string;
  title: string;
  description: string;
  status: string;
  createdAt: string;
}

export interface CreateAssignmentResponse {
    success: boolean;
    message: string;
    data: CreatedAssignment[];
  }