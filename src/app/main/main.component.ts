import { Component, OnInit } from '@angular/core';
import { ExcelService } from '../services/excel-service.service';
import data from './data-emulation'
import { MatDialog } from '@angular/material';
import { ModalComponent } from './modal/modal.component';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  flag: boolean;
  data = data
  constructor(private excelService:ExcelService,  public dialog: MatDialog) {
    this.flag = false;
   }

  ngOnInit() {
  }

  exportAsXLSX(){
    this.excelService.exportAsExcelFile(this.data, 'sample');
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
