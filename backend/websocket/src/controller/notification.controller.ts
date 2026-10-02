import type { Request, Response } from 'express';

import { env } from '../config/env.js';
import { ApplicationNotificationService } from '../services/ApplicationNotificationService.js';

export class NotificationController {
  constructor(
    private readonly notificationService: ApplicationNotificationService,
  ) {}

  public applicationReceived = (
    req: Request,
    res: Response,
  ): void => {
    this.validateInternalRequest(req);

    this.notificationService.notifyGigOwner(req.body);

    res.status(200).json({
      success: true,
      message: 'Notification sent',
    });
  };

  public applicationRejected = (
    req: Request,
    res: Response,
  ): void => {
    this.validateInternalRequest(req);

    this.notificationService.notifyApplicant(req.body);

    res.status(200).json({
      success: true,
      message: 'Notification sent',
    });
  };

  private validateInternalRequest(
    req: Request,
  ): void {
    const secret = req.headers['x-internal-secret'];

    if (secret !== env.WS_INTERNAL_SECRET) {
      throw new Error('Unauthorized internal request');
    }
  }
}