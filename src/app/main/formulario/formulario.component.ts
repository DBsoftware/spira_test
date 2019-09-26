import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.scss']
})
export class FormularioComponent implements OnInit {
  @Input() estado;
  @Output() cambio = new EventEmitter();
  formulario:FormGroup;
  constructor() { }

  ngOnInit() {
    this.formulario = new FormGroup({
      'correo': new FormControl('',   [
        Validators.required,
      ]),
      'nombre': new FormControl('',   [
        Validators.required,
      ]),
    })
  }

  modificarEstado() {
    this.cambio.emit(false)    
  }

}
