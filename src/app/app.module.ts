import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ObservablesComponent } from './observables/observables.component';
import { OperatorsComponent } from './operators/operators.component';
import { SessionComponent } from './session/session.component';

@NgModule({
  declarations: [			
    AppComponent,
      ObservablesComponent,
      OperatorsComponent,
      SessionComponent
   ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
