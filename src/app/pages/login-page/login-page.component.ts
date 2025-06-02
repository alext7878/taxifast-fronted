import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  imports: [ReactiveFormsModule],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginPageComponent {

  router = inject(Router);
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
    console.log(this.loginFormUser.value);
    this.router.navigate([ 'app', 'order-service' ]);
  }
  
  driverLogin() {
    console.log(this.loginFormDriver.value);
    this.router.navigate([ 'app', 'search-trips' ]);
  }
}
