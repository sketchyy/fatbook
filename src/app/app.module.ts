import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { EatingsPageComponent } from './components/eatings-page/eatings-page.component';
import { DishesPageComponent } from './components/dishes-page/dishes-page.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTableModule } from '@angular/material/table';
import {  MatSortModule } from '@angular/material/sort';
import {  MatDialogModule } from '@angular/material/dialog';
import {  MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { DishesTableComponent } from './components/dishes-table/dishes-table.component';
import { AddDishComponent } from './components/add-dish/add-dish.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EatingsTableComponent } from './components/eatings-table/eatings-table.component';
import { AddEatingComponent } from './components/add-eating/add-eating.component';

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
    AddEatingComponent
  ],
  imports: [
    BrowserModule,
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
    MatAutocompleteModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
