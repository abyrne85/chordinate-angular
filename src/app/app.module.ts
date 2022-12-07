import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { GuitarComponent } from './guitar/guitar.component';
import { TunerComponent } from './tuner/tuner.component';
import { StringComponent } from './string/string.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { ControlsComponent } from './controls/controls.component';

@NgModule({
  declarations: [
    AppComponent,
    GuitarComponent,
    TunerComponent,
    StringComponent,
    ControlsComponent,
  ],
  imports: [
    BrowserModule,
    NoopAnimationsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
