import { Observable, Frame } from '@nativescript/core';
import { AuthService } from '../../services/auth-service';

export class LoginViewModel extends Observable {
  private authService: AuthService;
  
  constructor() {
    super();
    this.authService = new AuthService();
    
    this.registration = '';
    this.password = '';
    this.errorMessage = '';
  }

  async onLogin() {
    try {
      if (!this.registration || !this.password) {
        this.errorMessage = 'Por favor, preencha todos os campos';
        return;
      }

      const user = await this.authService.login(this.registration, this.password);
      
      if (user) {
        // Store user in global model
        global.userModel.currentUser = user;
        
        // Navigate to appropriate page based on role
        const page = user.role === 'admin' ? 'views/admin/admin-page' : 'views/instructor/instructor-page';
        Frame.topmost().navigate({
          moduleName: page,
          clearHistory: true
        });
      } else {
        this.errorMessage = 'Credenciais inválidas';
      }
    } catch (error) {
      this.errorMessage = 'Erro ao fazer login';
      console.error(error);
    }
  }

  onNavigateToRegister() {
    Frame.topmost().navigate('views/auth/register-page');
  }
}