import { Component, OnInit, Input } from '@angular/core';
import { of } from 'rxjs';
import { tap, map } from 'rxjs/operators';
@Component({
  selector: 'app-expandables',
  templateUrl: './expandables.component.html',
  styleUrls: ['./expandables.component.scss']
})
export class ExpandablesComponent implements OnInit {
  @Input() data
  dataClientes
  constructor() { 
  }

  otherData(e){
    return [
      {pregunta: 'email', respuesta: e['correo']},
      {pregunta: 'telefono', respuesta: e['telefono']},
      ...e['preguntasDinamicas']]
  }

  ngOnInit() {
    console.log(this.data)
    this.dataClientes = this.data.map(elet => ({label: elet.nombres,data: this.otherData(elet)}))
  }

}
