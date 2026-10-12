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

export interface ServerToClientEvents {
  'gig:application-received': (
    payload: GigApplicationReceivedPayload,
  ) => void;

  'gig:application-rejected': (
    payload: GigApplicationRejectedPayload,
  ) => void;
}

export interface ClientToServerEvents {}