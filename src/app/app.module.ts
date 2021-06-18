import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MenubarModule } from 'primeng/menubar';
import {DataViewModule} from 'primeng/dataview';
import { HttpClientModule } from '@angular/common/http';
import { JsonDataService } from './jsondataservice';
import {KnobModule} from 'primeng/knob';
import {FormsModule} from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import {InplaceModule} from 'primeng/inplace';
import {OverlayPanelModule} from 'primeng/overlaypanel';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {TableModule} from 'primeng/table';
import {BadgeModule} from 'primeng/badge';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    MenubarModule,
    DataViewModule,
    KnobModule,
    ButtonModule,
    InplaceModule,
    OverlayPanelModule,
    BrowserAnimationsModule,
    TableModule,
    BadgeModule
  ],
  providers: [JsonDataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
