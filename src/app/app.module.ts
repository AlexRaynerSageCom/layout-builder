import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule} from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BuilderFormComponent, GridViewComponent } from './components';

import { ButtonModule as CarbonButtonModule } from '@sage/ng-carbon/button';
import { DropdownModule as CarbonDropdownModule } from '@sage/ng-carbon/dropdown';
import { InputTextModule as CarbonInputTextModule } from '@sage/ng-carbon/input-text';
import { CheckboxModule as CarbonCheckboxModule } from '@sage/ng-carbon/checkbox';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    CarbonButtonModule,
    CarbonDropdownModule,
    CarbonInputTextModule,
    CarbonCheckboxModule
  ],
  declarations: [
    AppComponent,
    BuilderFormComponent,
    GridViewComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
