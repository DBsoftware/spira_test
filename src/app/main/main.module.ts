import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormularioComponent } from './formulario/formulario.component';
import { MainComponent } from './main.component';
import { MaterialComponentsModule } from '../material-components/material-components.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';



@NgModule({
  declarations: [FormularioComponent, MainComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialComponentsModule,
    FlexLayoutModule
  ],
  exports: [MainComponent]
})
export class MainModule { }
