import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './core/home/home.component';
import { MypicsComponent } from './core/mypics/mypics.component';
import { AuthGuard } from './auth/auth.guard';
import { DummyComponent } from './core/dummy/dummy.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'mypics/:id', component: MypicsComponent },
  { path: 'dummy', component: DummyComponent},
  { path: '**', redirectTo: '/'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
