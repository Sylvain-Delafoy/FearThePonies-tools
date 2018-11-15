import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatInputModule,
  MatRadioModule,
  MatCheckboxModule,
  MatSidenavModule
} from '@angular/material';
import { CypherComponent } from './cypher/cypher.component';
import { AlphabetComponent } from './alphabet/alphabet.component';
import { RouterModule, Routes } from '@angular/router';

const appRoutes: Routes = [
  { path: '', redirectTo: '/alphabet', pathMatch: 'full' },
  { path: 'alphabet', component: AlphabetComponent },
  {
    path: 'encoder',
    component: CypherComponent
  },
  { path: '**', component: CypherComponent }
];

@NgModule({
  declarations: [AppComponent, CypherComponent, AlphabetComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatRadioModule,
    MatCheckboxModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes),
    MatSidenavModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
