import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { GuitarComponent } from './guitar/guitar.component';
import { TunerComponent } from './tuner/tuner.component';
import { StringComponent } from './string/string.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    GuitarComponent,
    TunerComponent,
    StringComponent
  ],
  imports: [
    BrowserModule,
    NoopAnimationsModule,
    MatSelectModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
