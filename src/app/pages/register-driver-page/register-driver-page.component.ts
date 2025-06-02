import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register-driver-page',
  imports: [ReactiveFormsModule],
  templateUrl: './register-driver-page.component.html',
  styleUrl: './register-driver-page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegisterDriverPageComponent {

  router = inject(Router);
  private formBuilder = inject(FormBuilder);

  registerFormDriver = this.formBuilder.group({
    full_name: ['', Validators.required], 
    phone_number: ['', Validators.required], 
    email: ['', Validators.required], 
    password_hash: ['', Validators.required], 
    confirm_password: ['', Validators.required],
    plate_number: ['', Validators.required], 
    license_number: ['', Validators.required], 
    vehicle_model: ['', Validators.required], 
    vehicle_color: ['', Validators.required],
    
  })

  register() {
    console.log(this.registerFormDriver.value);
    this.router.navigate([ 'app', 'search-trips' ]);
  }

}
