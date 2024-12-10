export interface MaterialRequest {
  id: string;
  instructor: string;
  materialName: string;
  quantity: number;
  justification: string;
  status: 'pending' | 'approved' | 'rejected';
  requestDate: Date;
  neededDate: Date;
}

export class RequestModel {
  static getStatusClass(status: string): string {
    switch (status) {
      case 'approved':
        return 'text-green-600';
      case 'rejected':
        return 'text-red-600';
      default:
        return 'text-yellow-600';
    }
  }
}