import { Component, OnInit, Input } from '@angular/core';
import { of, from } from 'rxjs';
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
      {label: 'email', respuesta: e['email']},
      {label: 'telefono', respuesta: e['telefono']},
      ...e['preguntasDinamicas']]
  }

  ngOnInit() {
    this.dataClientes = of({datos: this.data})
    .pipe(
      tap(console.log),
      map(e => e['datos']),
      map(e => e.map(elet => ({label: elet.nombres,data: this.otherData(elet)})))
    )
  }

}
