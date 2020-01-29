import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import constantes from "../../constantes";
import { tap, map } from 'rxjs/operators'; 

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.scss']
})
export class FormularioComponent implements OnInit {
  endpoints =  constantes;
  @Input() estado;
  @Output() cambio = new EventEmitter();
  numericPatter = /^-?(0|[1-9]\d*)?$/
  formulario:FormGroup;
  paises
  tipo_id
  states;
  cities;
  constructor(private api:ApiService) { }

  ngOnInit() {
    this.paises = this.api.getFromApi(this.endpoints.PAISES)
    this.tipo_id = this.api.getFromApi(this.endpoints.TIPO_IDENTIFICACION)
                    .pipe(map(res => Object.keys(res).map((key) => ({value : key, name: res[key]}))))
    this.formulario = new FormGroup({
      'correo': new FormControl('',   [
        Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")
      ]),
      'nombres': new FormControl('',   [
        Validators.required, Validators.pattern(/^[A-Za-z]+$/)
      ]),
      'apellidos': new FormControl('',   [
        Validators.required, Validators.pattern(/^[A-Za-z]+$/)
      ]),
      'tipoid': new FormControl('',   [
        Validators.required, 
      ]),
      'identificacion': new FormControl(null,   [
        Validators.required,Validators.pattern(this.numericPatter)
      ]),
      'ciu_nace': new FormControl(null,   [
        Validators.required,Validators.pattern(this.numericPatter)
      ]),
      'pais_nace': new FormControl(null,   [
        Validators.required,Validators.pattern(this.numericPatter)
      ]),
      'depto_nace': new FormControl(null,   [
        Validators.required,Validators.pattern(this.numericPatter)
      ]),
      'telefono': new FormControl(null,   [
        Validators.required,Validators.pattern(this.numericPatter)
      ]),
    })
    this.formulario.get('depto_nace').disable()
    this.formulario.get('ciu_nace').disable()
  }
  
  guardar() {
    console.log(this.formulario.value)
    if (this.formulario.valid) {
      this.api.postToApi(this.formulario.value)
      .subscribe(e => {
        console.log(e)
        this.cambio.emit(false)
      }, err => console.error)
    }
        
  }
  cancelar() {
    this.cambio.emit(false)    
  }
  
  activarDept(event){
    this.states = this.api.getFromApi(this.endpoints.DEPT, event.value)
    this.formulario.get('depto_nace').enable()
  }
  activarCiudades(event){
    this.cities = this.api.getFromApi(this.endpoints.CIUDADES, event.value)
    this.formulario.get('ciu_nace').enable()
  }

}


   

   






   

