import type { Server } from 'socket.io';

import { WebSocketEvent } from '@wss/events/events.types.js';

import {
  gigApplicationReceivedSchema,
  gigApplicationRejectedSchema,
} from '@repo/zod-validation/types';

export class ApplicationNotificationService {
  constructor(
    private readonly io: Server,
  ) {}

  public notifyGigOwner(
    payload: unknown,
  ): void {
    const data =
      gigApplicationReceivedSchema.parse(payload);

    const room = this.getUserRoom(
      data.postedByUserId,
    );

    this.io
      .to(room)
      .emit(
        WebSocketEvent.GIG_APPLICATION_RECEIVED,
        data,
      );

    console.log(
      `Application notification sent to ${room}`,
    );
  }

  public notifyApplicant(
    payload: unknown,
  ): void {
    const data =
      gigApplicationRejectedSchema.parse(payload);

    const room = this.getUserRoom(
      data.applicantId,
    );

    this.io
      .to(room)
      .emit(
        WebSocketEvent.GIG_APPLICATION_REJECTED,
        data,
      );

    console.log(
      `Rejection notification sent to ${room}`,
    );
  }

  private getUserRoom(userId: string): string {
    return `user:${userId}`;
  }
}