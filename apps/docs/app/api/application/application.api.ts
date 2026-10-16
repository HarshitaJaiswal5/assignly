import { apiClient } from '@/lib/api/ApiClient';
import type { Application } from '@/types/application.types';

export class ApplicationApiService {
  public async apply(
    data: Application.ApplyAssignmentRequest,
  ): Promise<Application.ApplyResponse> {
    return apiClient.post<Application.ApplyResponse>(
      `/application/${data.gigId}/apply`,
      {
        negotiatedPrice: data.negotiatedPrice,
      },
    );
  }
}

export const applicationApiService = new ApplicationApiService();