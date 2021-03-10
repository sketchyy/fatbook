import { NgModule } from '@angular/core';
import { canActivate, redirectLoggedInTo, redirectUnauthorizedTo } from '@angular/fire/auth-guard';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './core/components/login/login.component';
import { NotFoundComponent } from './core/components/not-found/not-found.component';
import { DishesPageComponent } from './dishes/components/dishes-page/dishes-page.component';
import { EatingLogPageComponent } from './eating-log/components/eating-log-page/eating-log-page.component';
import { IngredientsPageComponent } from './ingredients/components/ingredients-page/ingredients-page.component';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);
const redirectLoggedInToEatings = () => redirectLoggedInTo(['dishes']);

const routes: Routes = [
  {
    path: 'dishes',
    component: DishesPageComponent,
    ...canActivate(redirectUnauthorizedToLogin),
  },
  {
    path: 'log',
    component: EatingLogPageComponent,
    ...canActivate(redirectUnauthorizedToLogin),
  },
  {
    path: 'login',
    component: LoginComponent,
    ...canActivate(redirectLoggedInToEatings),
  },
  {
    path: '',
    redirectTo: 'eatings',
    pathMatch: 'full',
  },
  { path: '**', component: NotFoundComponent }, // Wildcard route for a 404 page
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
