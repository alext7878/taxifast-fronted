import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register-user-page',
  imports: [
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './register-user-page.component.html',
  styleUrl: './register-user-page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegisterUserPageComponent {

  router = inject(Router);
  authService = inject(AuthService);
  private formBuilder = inject(FormBuilder);

  registerFormUser = this.formBuilder.group({
    full_name: ['', Validators.required],
    phone_number: ['', Validators.required],
    email: ['', Validators.required], 
    password_hash: ['', Validators.required], 
    confirm_password: ['', Validators.required],
  })

  register() {
    this.registerFormUser.markAllAsTouched();
    if(this.registerFormUser.invalid) throw 'Formulario no valido';

    const user = this.registerFormUser.value;
    if(user.password_hash !== user.confirm_password) {
      alert('Las contraseñas no son iguales');
      return;
    }

    delete user.confirm_password;
    this.authService.registerUser(user).subscribe({
      next: (() => this.router.navigate([ 'app', 'order-service' ])),
      error: (error => console.log(error))
    });
  }
}
