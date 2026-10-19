import type { GigFilters } from '@/types/gigFilters.types';
import type { Assignment } from '@/types/assignment.types';
import { gigApiService } from '@/app/api/assignment/assignment.api';
import { MyAssignments } from '@/types/myAssignments.types';

export class GigService {
  public async getGigs(
    filters: GigFilters
  ): Promise<Assignment.TrackAssignment[]> {
    return gigApiService.getGigs(filters);
  }

  public async getGigDetails(
    gigId: string
  ): Promise<Assignment.AssignmentDetails> {
    return gigApiService.getGigDetails(gigId);
  }

  public async getPostedAssignments(): Promise<MyAssignments.PostedAssignment[]> {
    return gigApiService.getPostedAssignments();
  }

  public async getRequestedAssignments(): Promise<MyAssignments.RequestedAssignment[]> {
    return gigApiService.getRequestedAssignments();
  }
}

export const gigService = new GigService();
