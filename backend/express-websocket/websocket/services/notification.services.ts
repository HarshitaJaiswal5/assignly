import type { Server } from 'socket.io';

import { WebSocketEvent } from '@wss/events/events.types.js';

import {
  gigApplicationReceivedSchema,
  gigApplicationRejectedSchema,
} from '@repo/zod-validation/types';
import { GigApplicationReceivedPayload } from '../../shared-types/application.js';

export class ApplicationNotificationService {
  constructor(private readonly io: Server) {}

  public notifyGigOwner(payload: GigApplicationReceivedPayload) {
    const data = gigApplicationReceivedSchema.parse({
      ...payload,
      negotiatedPrice: Number(payload.negotiatedPrice),
    });

    this.io
      .to(`user:${data.postedByUserId}`)
      .emit('GIG_APPLICATION_RECEIVED', data);
  }
  public notifyApplicant(payload: unknown): void {
    const data = gigApplicationRejectedSchema.parse(payload);

    this.io
      .to(this.getUserRoom(data.applicantId))
      .emit(WebSocketEvent.GIG_APPLICATION_REJECTED, data);
  }

  private getUserRoom(userId: string): string {
    return `user:${userId}`;
  }
}
