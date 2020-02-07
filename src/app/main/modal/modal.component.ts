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
  constructor(
    public dialogRef: MatDialogRef<ModalComponent>,
    @Inject(MAT_DIALOG_DATA) public dataExterna: any) {}

  ngOnInit() {
    this.formulario = new FormGroup({})

    this.dataApi = of({datos: this.data})
    .pipe(
      map(e => e['datos']),
      map((e: any[]) => e.sort(({orden:a},{orden: b}) => a -b)),
      map((e: any[]) => e.map((a,i)=>
       ({...a, label: `pregunta ${this.labels[i]}`, name: `pregunta_${i+1}` }))),
      tap(e => {
        e.forEach((a,i) => {
          this.formulario.addControl(a.name, new FormControl(a.pregunta, Validators.required))
        })
      })
     )

  }
  onNoClick(): void {
    this.dialogRef.close();
  }

  guardar(){
    console.log('gurdando')
  }

}
