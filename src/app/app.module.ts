import {Component, NgModule} from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { InputAdressComponent } from './adress-form/input-adress/input-adress.component';
import {LivraisonsComponent} from './livraisons/livraisons.component';
import {APP_BASE_HREF} from '@angular/common';
import {LivraisonService} from './service/livraison.service';
import {HttpClientModule} from '@angular/common/http';
import { AdressFormComponent } from './adress-form/adress-form.component';



const appRoutes: Routes = [
  { path: 'livraisons', component: LivraisonsComponent },
  { path: 'adressform', component: AdressFormComponent },
  
];
@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    ),
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    FlexLayoutModule,
    HttpClientModule
  ],
  declarations: [AppComponent, InputAdressComponent, LivraisonsComponent, AdressFormComponent],
  bootstrap: [AppComponent],
  providers: [{provide: APP_BASE_HREF, useValue: '/'},LivraisonService]
})
export class AppModule { }
