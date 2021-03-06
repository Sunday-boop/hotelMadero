import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './shared/auth.guard';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'Registro',
    loadChildren: () => import('./registro/registro.module').then( m => m.RegistroPageModule)
  },
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then( m => m.AdminPageModule),
     canActivate:[AuthGuard]
  },
  {
    path: 'verify-email',
    loadChildren: () => import('./verify-email/verify-email.module').then( m => m.VerifyEmailPageModule)
  },
  {
    path: 'forgot-password',
    loadChildren: () => import('./forgot-password/forgot-password.module').then( m => m.ForgotPasswordPageModule)
  },
  {
    path: 'bedrooms',
    loadChildren: () => import('./bedrooms/bedrooms.module').then( m => m.BedroomsPageModule),
    canActivate:[AuthGuard]
  },
  {
    path: 'notes',
    loadChildren: () => import('./notes/notes.module').then( m => m.NotesPageModule),
    canActivate:[AuthGuard]
  },
  {
    path: 'users',
    loadChildren: () => import('./users/users.module').then( m => m.UsersPageModule),
     canActivate:[AuthGuard]
  },
  {
    path: 'add-users',
    loadChildren: () => import('./add-users/add-users.module').then( m => m.AddUsersPageModule),
    canActivate:[AuthGuard]
  },
  {
    path: 'add-bedrooms',
    loadChildren: () => import('./add-bedrooms/add-bedrooms.module').then( m => m.AddBedroomsPageModule)
  },
  {
    path: 'bedrooms/:id',
    loadChildren: () => import('./edit-bedrooms/edit-bedrooms.module').then( m => m.EditBedroomsPageModule)
  },
  {
    path: 'hab-dis/:fechaInicio/:fechaFin',
    loadChildren: () => import('./hab-dis/hab-dis.module').then( m => m.HabDisPageModule),
    canActivate:[AuthGuard]
  },
  {
    path: 'add-reservation/:fechaInicio/:fechaFin/:habitacion/:monto',
    loadChildren: () => import('./add-reservation/add-reservation.module').then( m => m.AddReservationPageModule),
    canActivate:[AuthGuard]
  },
  {
    path: 'busqueda',
    loadChildren: () => import('./busqueda/busqueda.module').then( m => m.BusquedaPageModule),
    canActivate:[AuthGuard]
  },
  {
    path: 'my-reservations',
    loadChildren: () => import('./my-reservations/my-reservations.module').then( m => m.MyReservationsPageModule),
    canActivate:[AuthGuard]
  },
  {
    path: 'price-bedrooms',
    loadChildren: () => import('./price-bedrooms/price-bedrooms.module').then( m => m.PriceBedroomsPageModule)
  },
  {
    path: 'add-price',
    loadChildren: () => import('./add-price/add-price.module').then( m => m.AddPricePageModule)
  },
  {
    path: 'price-bedrooms/:id',
    loadChildren: () => import('./edit-price/edit-price.module').then( m => m.EditPricePageModule)
  },
  {
    path: 'busqueda-admin',
    loadChildren: () => import('./busqueda-admin/busqueda-admin.module').then( m => m.BusquedaAdminPageModule)
  },
  {
    path: 'hab-dis-admin/:fechaInicio/:fechaFin',
    loadChildren: () => import('./hab-dis-admin/hab-dis-admin.module').then( m => m.HabDisAdminPageModule)
  },
  {
    path: 'add-reservation-admin/:fechaInicio/:fechaFin/:habitacion/:monto',
    loadChildren: () => import('./add-reservation-admin/add-reservation-admin.module').then( m => m.AddReservationAdminPageModule)
  },
  {
    path: 'reservation/:id',
    loadChildren: () => import('./edit-reservation/edit-reservation.module').then( m => m.EditReservationPageModule)
  },
  {
    path: 'notes/:id',
    loadChildren: () => import('./edit-notes/edit-notes.module').then( m => m.EditNotesPageModule)
  },
  {
    path: 'hab-dispusu/:fechaInicio/:fechaFin',
    loadChildren: () => import('./hab-dispusu/hab-dispusu.module').then( m => m.HabDispusuPageModule)

  },










];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
