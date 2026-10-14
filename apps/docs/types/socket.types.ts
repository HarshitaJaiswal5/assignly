export interface GigApplicationReceivedPayload {
  gigId: string;
  applicationId: string;
  postedByUserId: string;
  applicantId: string;
  applicantName: string;
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
  GIG_APPLICATION_RECEIVED: (
    payload: GigApplicationReceivedPayload,
  ) => void;

  GIG_APPLICATION_REJECTED: (
    payload: GigApplicationRejectedPayload,
  ) => void;
}

export interface ClientToServerEvents {
  // Add only client-to-server events the frontend actually emits.
}