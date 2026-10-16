import { applicationApiService } from '@/app/api/application/application.api';
import type { Application } from '@/types/application.types';

export class ApplicationService {
  public async apply(
    data: Application.ApplyAssignmentRequest,
  ): Promise<Application.ApplyResponse> {
    return applicationApiService.apply(data);
  }
}

export const applicationService = new ApplicationService();