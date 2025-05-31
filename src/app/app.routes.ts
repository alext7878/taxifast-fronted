import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./pages/home-page/home-page.component').then(c => c.HomePageComponent)
    },
    {
        path: 'login',
        loadComponent: () => import('./pages/login-page/login-page.component').then(c => c.LoginPageComponent)
    },
    {
        path: 'register',
        children: [
            {
                path: 'user',
                loadComponent: () => import('./pages/register-user-page/register-user-page.component').then(c => c.RegisterUserPageComponent)
            },
            {
                path: 'driver',
                loadComponent: () => import('./pages/register-driver-page/register-driver-page.component').then(c => c.RegisterDriverPageComponent)
            }
        ]
    },
    {
        path: 'app',
        children: [
            {
                path: 'order-service',
                loadComponent: () => import('./pages/order-service-page/order-service-page.component').then(c => c.OrderServicePageComponent)
            },
                        {
                path: 'search-trips',
                loadComponent: () => import('./pages/search-trips-page/search-trips-page.component').then(c => c.SearchTripsPageComponent)
            }
        ]
    },
    {
        path: '**',
        redirectTo: 'home',
        pathMatch: 'full',
    }
];
