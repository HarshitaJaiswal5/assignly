import type { Server } from 'socket.io';

import { WebSocketEvent } from '@src/events/events.types.js';

import {
  gigApplicationReceivedSchema,
  gigApplicationRejectedSchema,
} from '@repo/zod-validation/types';

export class ApplicationNotificationService {
  constructor(
    private readonly io: Server,
  ) {}

  public notifyGigOwner(payload: unknown): void {
    const data =
      gigApplicationReceivedSchema.parse(payload);

    this.io
      .to(`user:${data.postedByUserId}`)
      .emit(
        WebSocketEvent.GIG_APPLICATION_RECEIVED,
        data,
      );
  }

  public notifyApplicant(payload: unknown): void {
    const data =
      gigApplicationRejectedSchema.parse(payload);

    this.io
      .to(`user:${data.applicantId}`)
      .emit(
        WebSocketEvent.GIG_APPLICATION_REJECTED,
        data,
      );
  }
}