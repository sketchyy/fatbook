import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireAuthGuardModule } from '@angular/fire/auth-guard';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MomentDateModule } from '@angular/material-moment-adapter';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DATE_FORMATS, MatDateFormats } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatExpansionModule } from '@angular/material/expansion';
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
import { EatingDialogComponent } from './eating-log/components/eating-dialog/eating-dialog.component';
import { EatingLogEntryComponent } from './eating-log/components/eating-log-entry/eating-log-entry.component';
import { EatingLogPageComponent } from './eating-log/components/eating-log-page/eating-log-page.component';
import { IngredientDialogComponent } from './ingredients/components/ingredient-dialog/ingredient-dialog.component';
import { IngredientsPageComponent } from './ingredients/components/ingredients-page/ingredients-page.component';
import { DataTableComponent } from './shared/components/data-table/data-table.component';
import { DishSimpleDialogComponent } from './dishes/components/dish-simple-dialog/dish-simple-dialog.component';

export const MY_FORMATS: MatDateFormats = {
  parse: {
    dateInput: ['l', 'LL'],
  },
  display: {
    dateInput: 'DD MMM YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

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
    DataTableComponent,
    EatingDialogComponent,
    DishSimpleDialogComponent,
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
    MatExpansionModule,
    MatDatepickerModule,
    MomentDateModule,
    MatGridListModule,
    AngularFireAuthModule,
    AngularFireAuthGuardModule,
    DynamicDialogModule,
    ButtonModule,
    InputTextModule,
    AutoCompleteModule,
    PanelModule,
  ],
  providers: [{ provide: MAT_DATE_FORMATS, useValue: MY_FORMATS }],
  bootstrap: [AppComponent],
})
export class AppModule {}
