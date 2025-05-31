import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-register-user-page',
  imports: [RouterLink],
  templateUrl: './register-user-page.component.html',
  styleUrl: './register-user-page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegisterUserPageComponent {

  router = inject(Router);

  register() {
    this.router.navigate([ 'app', 'order-service' ]);
  }
}
