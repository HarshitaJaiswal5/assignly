export namespace Application {
  export interface ApplyRequest {
    negotiatedPrice: number;
  }

  export interface Application {
    id: string;
    gigId: string;
    userId: string;
    negotiatedPrice: number;
    status: string;
    createdAt: string;
  }

  export interface ApplyResponse {
    success: boolean;
    message: string;
    data: null
  }

  export interface ApplyAssignmentRequest extends ApplyRequest {
    gigId: string;
  }
}
