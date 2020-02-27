import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

import { AppComponent } from './app.component';
import { InputAdressComponent } from './input-adress/input-adress.component';

@NgModule({
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    FlexLayoutModule
  ],
  declarations: [AppComponent, InputAdressComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
