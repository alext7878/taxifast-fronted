import { Routes } from '@angular/router';
import { driverGuard, privateGuard, userGuard } from './guards/private.guard';
import { publicGuard } from './guards/public.guard';

export const routes: Routes = [
    {
        path: '',
        canActivate: [publicGuard],
        loadComponent: () => import('./pages/home-page/home-page.component').then(c => c.HomePageComponent)
    },
    {
        path: 'login',
        canActivate: [publicGuard],
        loadComponent: () => import('./pages/login-page/login-page.component').then(c => c.LoginPageComponent)
    },
    {
        path: 'register',
        canActivate: [publicGuard],
        children: [
            {
                path: 'user',
                canActivate: [publicGuard],
                loadComponent: () => import('./pages/register-user-page/register-user-page.component').then(c => c.RegisterUserPageComponent)
            },
            {
                path: 'driver',
                canActivate: [publicGuard],
                loadComponent: () => import('./pages/register-driver-page/register-driver-page.component').then(c => c.RegisterDriverPageComponent)
            }
        ]
    },
    {
        path: 'app',
        canActivate: [privateGuard],
        children: [
            {
                path: 'order-service',
                canActivate: [userGuard],
                loadComponent: () => import('./pages/order-service-page/order-service-page.component').then(c => c.OrderServicePageComponent)
            },
            {
                path: 'search-trips',
                canActivate: [driverGuard],
                loadComponent: () => import('./pages/search-trips-page/search-trips-page.component').then(c => c.SearchTripsPageComponent)
            },
            {
                path: 'map',
                canActivate: [],
                loadComponent: () => import('./pages/map-page/map-page.component').then(c => c.MapPageComponent)
            },
        ]
    },
    {
        path: '**',
        redirectTo: 'home',
        pathMatch: 'full',
    }
];
