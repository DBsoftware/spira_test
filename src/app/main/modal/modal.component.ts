import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import dat from './data';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {
  formulario
  dataApi
  data = dat;
  labels = ['Uno', 'Dos', 'Tres'];
  preguntas;
  PreguntaSeleccionada;
  constructor(
    public dialogRef: MatDialogRef<ModalComponent>,
    @Inject(MAT_DIALOG_DATA) public dataExterna: any) {}

  ngOnInit() {
    this.formulario = new FormGroup({})
    this.formulario.addControl('pregunta', new FormControl(null, Validators.required))

    this.dataApi = of({datos: this.data})
    .pipe(
      map(e => e['datos']),
      map((e: any[]) => e.sort(({orden:a},{orden: b}) => a -b)),
      tap(e => this.preguntas = e),
      map((e: any[]) => e.map((a,i)=>
       ({...a, label: `pregunta ${this.labels[i]}` }))),
     )

  }

  foods: {value:string, viewValue: string}[] = [
    {value: 'steak-0', viewValue: 'Steak'},
    {value: 'pizza-1', viewValue: 'Pizza'},
    {value: 'tacos-2', viewValue: 'Tacos'}
  ];


  onNoClick(): void {
    this.dialogRef.close();
  }

  guardar(){
    console.log('gurdando')
  }

  seleccionPregunta(e){
    this.PreguntaSeleccionada = this.preguntas[e.value - 1]
    this.formulario.get('pregunta').setValue(this.PreguntaSeleccionada.pregunta)
    console.log(this.PreguntaSeleccionada)

  }

}
