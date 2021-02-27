import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireAuthGuardModule } from '@angular/fire/auth-guard';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ButtonModule } from 'primeng/button';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { InputTextModule } from 'primeng/inputtext';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { environment } from 'src/environments/environment';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './core/components/login/login.component';
import { NavbarComponent } from './core/components/navbar/navbar.component';
import { NotFoundComponent } from './core/components/not-found/not-found.component';
import { AddDishComponent } from './dishes/components/add-dish/add-dish.component';
import { DishesPageComponent } from './dishes/components/dishes-page/dishes-page.component';
import { DishesTableComponent } from './dishes/components/dishes-table/dishes-table.component';
import { AddEatingComponent } from './eatings/components/add-eating/add-eating.component';
import { EatingsPageComponent } from './eatings/components/eatings-page/eatings-page.component';
import { EatingsTableComponent } from './eatings/components/eatings-table/eatings-table.component';
import { IngredientDialogComponent } from './ingredients/components/ingredient-dialog/ingredient-dialog.component';
import { IngredientsPageComponent } from './ingredients/components/ingredients-page/ingredients-page.component';
import { IngredientsTableComponent } from './ingredients/components/ingredients-table/ingredients-table.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    EatingsPageComponent,
    DishesPageComponent,
    NotFoundComponent,
    DishesTableComponent,
    AddDishComponent,
    EatingsTableComponent,
    AddEatingComponent,
    LoginComponent,
    IngredientsPageComponent,
    IngredientsTableComponent,
    IngredientDialogComponent,
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireDatabaseModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatTabsModule,
    MatTableModule,
    MatSortModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    MatGridListModule,
    AngularFireAuthModule,
    AngularFireAuthGuardModule,
    DynamicDialogModule,
    ButtonModule,
    InputTextModule,
    AutoCompleteModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
