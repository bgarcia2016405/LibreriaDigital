import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LibreroComponent } from './components/librero/librero.component';

const routes: Routes = [
  { path: 'registro', component: HomeComponent},
  {path: 'librera', component: LibreroComponent},
  { path: '**', component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
