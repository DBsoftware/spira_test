import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { of } from 'rxjs';
import { map, tap, switchMap } from 'rxjs/operators';
import dat from './data';
import { ApiService } from 'src/app/services/api.service';
import constantes, {mensajes} from "../../constantes";


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
  endpoints = constantes
  notificaciones = mensajes
  constructor(private api:ApiService,
    private _snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<ModalComponent>,
    @Inject(MAT_DIALOG_DATA) public dataExterna: any) {}

  ngOnInit() {
    this.formulario = new FormGroup({})
    this.formulario.addControl('pregunta', new FormControl(null, Validators.required))

    this.dataApi = this.api.getFromApi(this.endpoints.QUESTIONS)
    .pipe(
      tap(e => this.preguntas = e),
      map((e: any[]) => e.sort(({orden:a},{orden: b}) => a -b)),
      map((e: any[]) => e.map((a,i)=>
       ({...a, label: `pregunta ${this.labels[i]}` }))),
     )

  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  guardar(){
    let {value} = this.formulario
    console.log('gurdando', this.formulario.value)
    if (this.formulario.valid) {
      let tosave = {...value, orden: this.PreguntaSeleccionada.orden, activa: true}
      this.api.updateOnApi(this.endpoints.QUESTIONS,this.PreguntaSeleccionada.id)
      .pipe(switchMap(e => this.api.postToApi(this.endpoints.QUESTIONS,tosave)))
      .subscribe(e => this._snackBar.open(this.notificaciones.SUCCESS, 'cerrar', {duration: 2000, verticalPosition: 'top'})
      )
    }
  }

  seleccionPregunta(e){
    this.PreguntaSeleccionada = this.preguntas[e.value - 1]
    this.formulario.get('pregunta').setValue(this.PreguntaSeleccionada.pregunta)
    console.log(this.PreguntaSeleccionada)

  }

}
