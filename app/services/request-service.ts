import { MaterialRequest } from '../models/request';

export class RequestService {
  private requests: MaterialRequest[] = [];

  async submitRequest(request: Omit<MaterialRequest, 'id' | 'status' | 'requestDate'>): Promise<MaterialRequest> {
    const newRequest: MaterialRequest = {
      ...request,
      id: Date.now().toString(),
      status: 'pending',
      requestDate: new Date()
    };
    
    this.requests.push(newRequest);
    return newRequest;
  }

  async getRequestsByInstructor(instructorId: string): Promise<MaterialRequest[]> {
    return this.requests.filter(request => request.instructor === instructorId);
  }

  async getAllRequests(): Promise<MaterialRequest[]> {
    return this.requests;
  }

  async updateRequestStatus(requestId: string, status: 'approved' | 'rejected'): Promise<boolean> {
    const request = this.requests.find(r => r.id === requestId);
    if (request) {
      request.status = status;
      return true;
    }
    return false;
  }
}