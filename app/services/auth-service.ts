import { User } from '../models/user';

interface RegisterData {
  name: string;
  registration: string;
  password: string;
  role: 'admin' | 'instructor';
}

export class AuthService {
  private users: User[] = [
    {
      id: '1',
      name: 'Admin User',
      registration: 'admin123',
      role: 'admin'
    },
    {
      id: '2',
      name: 'Instructor User',
      registration: 'inst123',
      role: 'instructor'
    }
  ];

  private passwords: { [key: string]: string } = {
    'admin123': 'admin',
    'inst123': 'instructor'
  };

  async login(registration: string, password: string): Promise<User | null> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const storedPassword = this.passwords[registration];
    if (storedPassword && storedPassword === password) {
      return this.users.find(u => u.registration === registration) || null;
    }
    return null;
  }

  async register(data: RegisterData): Promise<boolean> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Check if registration already exists
    if (this.users.some(u => u.registration === data.registration)) {
      throw new Error('Matrícula já cadastrada');
    }

    // Create new user
    const newUser: User = {
      id: (this.users.length + 1).toString(),
      name: data.name,
      registration: data.registration,
      role: data.role
    };

    // Store user and password
    this.users.push(newUser);
    this.passwords[data.registration] = data.password;

    return true;
  }
}