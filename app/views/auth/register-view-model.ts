import { Observable, Frame } from '@nativescript/core';
import { AuthService } from '../../services/auth-service';

export class RegisterViewModel extends Observable {
  private authService: AuthService;
  
  constructor() {
    super();
    this.authService = new AuthService();
    
    this.name = '';
    this.registration = '';
    this.password = '';
    this.confirmPassword = '';
    this.roles = ['Instrutor', 'Administrador'];
    this.selectedRoleIndex = 0;
    this.errorMessage = '';
  }

  async onRegister() {
    try {
      if (!this.name || !this.registration || !this.password || !this.confirmPassword) {
        this.errorMessage = 'Por favor, preencha todos os campos';
        return;
      }

      if (this.password !== this.confirmPassword) {
        this.errorMessage = 'As senhas não coincidem';
        return;
      }

      const role = this.selectedRoleIndex === 0 ? 'instructor' : 'admin';
      const registered = await this.authService.register({
        name: this.name,
        registration: this.registration,
        password: this.password,
        role: role
      });

      if (registered) {
        alert({
          title: "Sucesso",
          message: "Conta criada com sucesso! Faça login para continuar.",
          okButtonText: "OK"
        }).then(() => {
          Frame.topmost().goBack();
        });
      }
    } catch (error) {
      this.errorMessage = error.message || 'Erro ao criar conta';
      console.error(error);
    }
  }
}