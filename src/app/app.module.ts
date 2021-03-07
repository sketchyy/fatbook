import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireAuthGuardModule } from '@angular/fire/auth-guard';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFirestoreModule } from '@angular/fire/firestore';
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
import { AutoCompleteModule } from 'primeng/autocomplete';
import { ButtonModule } from 'primeng/button';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { InputTextModule } from 'primeng/inputtext';
import { PanelModule } from 'primeng/panel';
import { environment } from 'src/environments/environment';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './core/components/login/login.component';
import { NavbarComponent } from './core/components/navbar/navbar.component';
import { NotFoundComponent } from './core/components/not-found/not-found.component';
import { AddDishComponent } from './dishes/components/add-dish/add-dish.component';
import { DishesPageComponent } from './dishes/components/dishes-page/dishes-page.component';
import { EatingLogEntryDialogComponent } from './eating-log/components/eating-log-entry-dialog/eating-log-entry-dialog.component';
import { EatingLogEntryComponent } from './eating-log/components/eating-log-entry/eating-log-entry.component';
import { EatingLogPageComponent } from './eating-log/components/eating-log-page/eating-log-page.component';
import { IngredientDialogComponent } from './ingredients/components/ingredient-dialog/ingredient-dialog.component';
import { IngredientsPageComponent } from './ingredients/components/ingredients-page/ingredients-page.component';
import { DataTableComponent } from './shared/components/data-table/data-table.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    DishesPageComponent,
    NotFoundComponent,
    AddDishComponent,
    LoginComponent,
    IngredientsPageComponent,
    IngredientDialogComponent,
    EatingLogEntryComponent,
    EatingLogPageComponent,
    EatingLogEntryDialogComponent,
    DataTableComponent,
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
    AutoCompleteModule,
    PanelModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
