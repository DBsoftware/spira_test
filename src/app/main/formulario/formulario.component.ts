import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import constantes from "../../constantes";
import { tap, map } from 'rxjs/operators'; 
import { MatSnackBar } from '@angular/material';
import dat from './data';
import { of } from 'rxjs';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.scss']
})
export class FormularioComponent implements OnInit {
  data = dat;
  endpoints =  constantes;
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

    this.dataApi = of({datos: this.data})
    .pipe(
      map(e => e['datos']),
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
      // this.api.postToApi(this.formulario.value)
      // .subscribe((e:any) => {
      //   if ('response' in e && 'message' in e['response'] ) {
      //     e['response']['message'].forEach(e => this._snackBar.open(e, 'cerrar', {duration: 2000, verticalPosition: 'top'}))
      //   }
      //   if ('response' in e && 'status' in e['response'] && e['response']['status'] != 0) {
      //     this.cambio.emit(false)
      //   }
      // }, err => console.error)
      let {value} = this.formulario
      let {nombres, correo, telefono} = value
      let tosave = {nombres, correo, telefono, repuestas: this.organizarRespuesta(value)}
      console.log(tosave)
    }      
  }

  cancelar() {
    this.cambio.emit(false)    
  }

  organizarRespuesta(e){
    delete e['nombres']
    delete e['correo']
    delete e['telefono']
    return Object.keys(e).map(key => ({respuesta: e[key], id_pregunta: key.substr(2)}))
  }
  

}


   

   






   

