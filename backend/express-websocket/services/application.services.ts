import { applicationRepository } from '@repositories/application.repository.js';
import type { CreateApplicationInput } from '@repo/zod-validation/types';
import type { ApplicationNotificationService } from '@wss/services/notification.services.js';

let notificationService: ApplicationNotificationService | undefined;

export const applicationService = {
  setNotificationService(service: ApplicationNotificationService): void {
    notificationService = service;
  },

  createApplication: async ({
    gigId,
    userId,
    negotiatedPrice,
  }: CreateApplicationInput) => {
    const application = await applicationRepository.createApplication({
      gigId,
      userId,
      negotiatedPrice,
    });

    console.log('Notification service exists:', Boolean(notificationService));

    try {
      notificationService?.notifyGigOwner({
        gigId: application.gigId,
        applicationId: application.id,
        applicantId: application.applicantId,
        applicantName: application.applicantName,
        postedByUserId: application.postedByUserId,
        negotiatedPrice: application.negotiatedPrice,
      });
       console.log('Notification emit attempted');
    } catch (error) {
      console.error('Failed to send application notification:', error);
    }

    return application;
  },
};
