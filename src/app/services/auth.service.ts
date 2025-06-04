import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Observable, tap } from 'rxjs';
import { PlacesService } from './places.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  http = inject(HttpClient);
  placesService = inject(PlacesService);
  user = signal<any>(null);

  login(email: string, password: string): Observable<any> { 
    const url = `${environment.baseUrl}/auth/login`;
    return this.http.post(url, { email, password })
      .pipe(
        tap((data) => this.setAuthStatus(data))
      );
  }

  logout() {
    this.deleteAuthStatus();
  }

  registerUser(data: {[key: string]: any}) {
    const url = `${environment.baseUrl}/auth/register`;
    return this.http.post(url,  data)
      .pipe(
        tap((data) => this.setAuthStatus(data))
      );
  }

  registerDriver(data: {[key: string]: any}) {
    const url = `${environment.baseUrl}/auth/register/driver`;
    return this.http.post(url,  data)
      .pipe(
        tap((data) => this.setAuthStatus(data))
      );
  }

  
  public get currentUser() : any {
    const user = localStorage.getItem('tf_user');

    if (this.user()) {
      return this.user();
    }else if(user) {
      this.user.set(JSON.parse(user));
      return this.user();
    }
    return null;
  }
  
  private setAuthStatus(user: any) {
    this.user.set(user);
    localStorage.setItem('tf_user', JSON.stringify(user));
  }

  private deleteAuthStatus() {
    this.user.set(null);
    localStorage.removeItem('tf_user');
  }

}
