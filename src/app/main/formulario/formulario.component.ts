import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import constantes, {mensajes} from "../../constantes";
import { tap, map, switchMap } from 'rxjs/operators'; 
import { MatSnackBar } from '@angular/material';
import { of } from 'rxjs';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.scss']
})
export class FormularioComponent implements OnInit {
  data;
  endpoints =  constantes;
  notificaciones = mensajes
  @Input() estado;
  @Output() cambio = new EventEmitter();
  numericPatter = /^-?(0|[1-9]\d*)?$/
  formulario:FormGroup;
  dataApi
  preguntasDinamicas = {};

  constructor(private api:ApiService, private _snackBar: MatSnackBar) {


   }

  ngOnInit() {
    this.formulario = new FormGroup({
      'nombres': new FormControl('',[Validators.required]),
      'correo': new FormControl('',   [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")
      ]),
      'telefono': new FormControl(null,   [
        Validators.required,Validators.pattern(this.numericPatter)
      ]),
    })
    this.dataApi = this.api.getFromApi(this.endpoints.QUESTIONS)
    .pipe(
      map((e: any[]) => e.sort(({orden:a},{orden: b}) => a -b)),
      map((e: any[]) => e.map(e => ({...e, name: `p_${e.id}`}))),
      tap(e => {
        e.forEach(a => {
          this.formulario.addControl(a.name, new FormControl('', Validators.required))
        })
      })
     )
  }
  
  guardar() {
    if (this.formulario.valid) {
      let {value} = this.formulario
      let {nombres, correo, telefono} = value
      let tosave = {nombres, correo, telefono, answers: this.organizarRespuesta(value)}
      console.log(tosave)
      this.api.postToApi(this.endpoints.CLIENTS,tosave)
      .subscribe((e:any) => {
        this._snackBar.open(this.notificaciones.SUCCESS, 'cerrar', {duration: 2000, verticalPosition: 'top'})
        this.cambio.emit(false)
      }, err => console.error)
    }      
  }

  cancelar() {
    this.cambio.emit(false)    
  }

  organizarRespuesta(e){
    let aux = []
    Object.keys(e).forEach(key => {
      if (!['nombres', 'telefono', 'correo'].includes(key)) {
        aux.push({respuesta: e[key], preguntaId: key.substr(2)})
      }
    })
    return aux
  }
  

}


   

   






   

