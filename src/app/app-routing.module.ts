import { NgModule } from '@angular/core';
import { canActivate, redirectLoggedInTo, redirectUnauthorizedTo } from '@angular/fire/auth-guard';
import { RouterModule, Routes } from '@angular/router';

import { DishesPageComponent } from './components/dishes-page/dishes-page.component';
import { EatingsPageComponent } from './components/eatings-page/eatings-page.component';
import { LoginComponent } from './components/login/login.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
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
    path: 'eatings',
    component: EatingsPageComponent,
    ...canActivate(redirectUnauthorizedToLogin),
  },
  {
    path: 'ingredients',
    component: IngredientsPageComponent,
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
