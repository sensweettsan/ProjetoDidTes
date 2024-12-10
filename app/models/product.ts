export interface Product {
  id: string;
  name: string;
  quantity: number;
  unit: 'package' | 'unit' | 'box';
  location: string;
  monthlyEntries: number;
  monthlyExits: number;
  balance: number;
}