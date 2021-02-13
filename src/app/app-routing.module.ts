import { NotFoundComponent } from './components/not-found/not-found.component';
import { EatingsPageComponent } from './components/eatings-page/eatings-page.component';
import { DishesPageComponent } from './components/dishes-page/dishes-page.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'dishes',
    component: DishesPageComponent
  },
  {
    path: 'eatings',
    component: EatingsPageComponent
  },
  {
    path: '',
    redirectTo: 'eatings',
    pathMatch: 'full'
  },
  { path: '**', component: NotFoundComponent },  // Wildcard route for a 404 page

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
