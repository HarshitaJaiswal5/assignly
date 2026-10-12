export interface GigApplicationReceivedPayload {
  gigId: string;
  applicationId: string;
  applicantId: string;
  applicantName: string;
  postedByUserId: string;
  negotiatedPrice: number;
}

export interface GigApplicationRejectedPayload {
  gigId: string;
  applicationId: string;
  applicantId: string;
  postedByUserId: string;
  gigTitle: string;
  reason?: string;
}