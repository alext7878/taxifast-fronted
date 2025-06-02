import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

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
  private formBuilder = inject(FormBuilder);

  registerFormUser = this.formBuilder.group({
    full_name: ['', Validators.required],
    phone_number: ['', Validators.required],
    email: ['', Validators.required], 
    password: ['', Validators.required], 
    confirm_password: ['', Validators.required],
  })

  register() {
    console.log(this.registerFormUser.value);
    this.router.navigate([ 'app', 'order-service' ]);
  }
}
