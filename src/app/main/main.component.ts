import { Component, OnInit } from '@angular/core';
import { ExcelService } from '../services/excel-service.service';
import { MatDialog } from '@angular/material';
import { ModalComponent } from './modal/modal.component';
import { ApiService } from '../services/api.service';
import constantes, {mensajes} from "../constantes";
import { tap, map } from 'rxjs/operators';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  flag: boolean;
  data
  endpoints = constantes
  constructor(private api: ApiService, private excelService:ExcelService,  public dialog: MatDialog) {
    this.flag = false;
   }

  ngOnInit() {
    this.api.getFromApi(this.endpoints.CLIENTS)
    .pipe(
      map((e:any) => e.map((registro) => ({...registro, preguntasDinamicas: this.ajustarDatos(registro.answers)})))
    ).subscribe(e => {
      this.data = e

    })
  }

  ajustarDatos(aux){
    return aux.map(e => ({respuesta: e.respuesta, pregunta: e.pregunta['pregunta'] }))
  }

  exportAsXLSX(){
    this.excelService.exportAsExcelFile(this.adjustToExport(), 'sample');
  }

  adjustToExport(){
    return this.data.map((e => {
      let obj = {}
      let {nombres, telefono, correo} = e
      e.preguntasDinamicas.forEach((e, i) => {
        obj = {...obj, ['pregunta'+(i+1)]: `${e.pregunta} - ${e.respuesta}`}
      })
      return {nombres, correo, telefono,...obj}

    }))
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(ModalComponent, {
      width: '75%'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

}
