import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from "./layout.component";
import { HeaderComponent } from "./header/header.component";
import { MaterialComponentsModule } from '../material-components/material-components.module';
import { FooterComponent } from './footer/footer.component';
import { FlexLayoutModule } from '@angular/flex-layout';



@NgModule({
  declarations: [
    HeaderComponent,
    LayoutComponent,
    FooterComponent,
  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    MaterialComponentsModule
  ],
  exports: [LayoutComponent]
})
export class LayoutModule { }
