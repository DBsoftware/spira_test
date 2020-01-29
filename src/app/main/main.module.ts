import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormularioComponent } from './formulario/formulario.component';
import { MainComponent } from './main.component';
import { MaterialComponentsModule } from '../material-components/material-components.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DataTableComponent } from './data-table/data-table.component';
import { ModalComponent } from './modal/modal.component';



@NgModule({
  declarations: [FormularioComponent, MainComponent, DataTableComponent, ModalComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialComponentsModule,
    FlexLayoutModule
  ],
  entryComponents:[ModalComponent],
  exports: [MainComponent]
})
export class MainModule { }
