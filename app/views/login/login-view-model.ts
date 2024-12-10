import { Observable, Frame } from '@nativescript/core';
import { AuthService } from '../../services/auth-service';

export class LoginViewModel extends Observable {
  private authService: AuthService;
  public isLogin: boolean = true;
  public roles: string[] = ['Instrutor', 'Administrador'];
  
  constructor() {
    super();
    this.authService = new AuthService();
    
    // Login properties
    this.registration = '';
    this.password = '';
    
    // Registration properties
    this.newUser = {
      name: '',
      registration: '',
      password: '',
      confirmPassword: ''
    };
    this.selectedRoleIndex = 0;
    this.errorMessage = '';
  }

  toggleView() {
    this.isLogin = !this.isLogin;
    this.errorMessage = '';
    this.notifyPropertyChange('isLogin', this.isLogin);
  }

  async onLogin() {
    try {
      if (!this.registration || !this.password) {
        this.errorMessage = 'Por favor, preencha todos os campos';
        return;
      }

      const user = await this.authService.login(this.registration, this.password);
      
      if (user) {
        const page = user.role === 'admin' ? 'views/admin/admin-page' : 'views/instructor/instructor-page';
        Frame.topmost().navigate({
          moduleName: page,
          context: { user },
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

  async onRegister() {
    try {
      if (!this.newUser.name || !this.newUser.registration || 
          !this.newUser.password || !this.newUser.confirmPassword) {
        this.errorMessage = 'Por favor, preencha todos os campos';
        return;
      }

      if (this.newUser.password !== this.newUser.confirmPassword) {
        this.errorMessage = 'As senhas não coincidem';
        return;
      }

      const role = this.selectedRoleIndex === 0 ? 'instructor' : 'admin';
      const registered = await this.authService.register({
        name: this.newUser.name,
        registration: this.newUser.registration,
        password: this.newUser.password,
        role: role
      });

      if (registered) {
        this.errorMessage = '';
        this.toggleView(); // Return to login view
        // Show success message
        alert({
          title: "Sucesso",
          message: "Conta criada com sucesso! Faça login para continuar.",
          okButtonText: "OK"
        });
      }
    } catch (error) {
      this.errorMessage = 'Erro ao criar conta';
      console.error(error);
    }
  }
}