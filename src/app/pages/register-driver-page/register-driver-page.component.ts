import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-driver-page',
  imports: [],
  templateUrl: './register-driver-page.component.html',
  styleUrl: './register-driver-page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegisterDriverPageComponent {

  router = inject(Router);

  register() {
    this.router.navigate([ 'app', 'search-trips' ]);
  }

}
