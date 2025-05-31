import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  imports: [],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginPageComponent {

  router = inject(Router);

  userLogin() {
    this.router.navigate([ 'app', 'order-service' ]);
  }
  
  driverLogin() {
    this.router.navigate([ 'app', 'search-trips' ]);
  }
}
