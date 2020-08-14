// Angular
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Modules
import { AppRoutingModule } from './app-routing.module';

// ngrx
import { StoreModule } from '@ngrx/store';
import { appReducers } from './store/app.reducer';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

// Services
import { FormsService } from './services';

// Components
import { AppComponent } from './app.component';
import {
  AxisFormComponent,
  EditAxisDialogComponent,
  GridFormComponent,
  GridViewComponent,
  SidebarComponent
} from './components';

// NG-Carbon
import { ButtonModule as CarbonButtonModule } from '@sage/ng-carbon/button';
import { DropdownModule as CarbonDropdownModule } from '@sage/ng-carbon/dropdown';
import { InputTextModule as CarbonInputTextModule } from '@sage/ng-carbon/input-text';
import { CheckboxModule as CarbonCheckboxModule } from '@sage/ng-carbon/checkbox';
import { IconModule as CarbonIconModule } from '@sage/ng-carbon/icon';
import { TabsModule as CarbonTabsModule } from '@sage/ng-carbon/tabs';
import { DialogModule as CarbonDialogModule } from '@sage/ng-carbon/dialog';

@NgModule({
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    StoreModule.forRoot(appReducers),
    StoreDevtoolsModule.instrument({maxAge: 20}),
    CarbonButtonModule,
    CarbonDropdownModule,
    CarbonInputTextModule,
    CarbonCheckboxModule,
    CarbonIconModule,
    CarbonTabsModule,
    CarbonDialogModule
  ],
  declarations: [
    AppComponent,
    AxisFormComponent,
    EditAxisDialogComponent,
    GridFormComponent,
    GridViewComponent,
    SidebarComponent
  ],
  providers: [
    FormsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
