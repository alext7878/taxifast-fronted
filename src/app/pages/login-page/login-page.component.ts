import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login-page',
  imports: [ReactiveFormsModule],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginPageComponent {

  router = inject(Router);
  authService = inject(AuthService);

  private formBuilder = inject(FormBuilder);

  loginFormUser = this.formBuilder.group({
    email: ['', Validators.required], 
    password: ['', Validators.required], 
  })

  loginFormDriver = this.formBuilder.group({
    email: ['', Validators.required], 
    password: ['', Validators.required], 
  })

  userLogin() {
    this.loginFormUser.markAllAsTouched();

    if(this.loginFormUser.invalid) throw 'Formulario no valido';
 
    const { email, password } = this.loginFormUser.value;

    this.authService.login(email!, password!)
      .subscribe({
        next: (() => this.router.navigate([ 'app', 'order-service' ])),
        error: (error => console.log(error))
    });
  }
  
  driverLogin() {
    this.loginFormDriver.markAllAsTouched();

    if(this.loginFormDriver.invalid) throw 'Formulario no valido';
 
    const { email, password } = this.loginFormDriver.value;

    this.authService.login(email!, password!)
      .subscribe({
        next: (() => this.router.navigate([ 'app', 'search-trips' ])),
        error: (error => console.log(error))
    });
  }
}
