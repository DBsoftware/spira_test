import {CollectionViewer, DataSource} from "@angular/cdk/collections";
import { Observable, BehaviorSubject } from "rxjs";
import { ApiService } from './api.service';
import { tap, map } from 'rxjs/operators';

export class ClientDataSource implements DataSource<any> {

    private clientSubject = new BehaviorSubject<any[]>([]);

    constructor(private api: ApiService) {}

    connect(collectionViewer: CollectionViewer): Observable<any[]> {
      return this.clientSubject.asObservable()
    }

    disconnect(collectionViewer: CollectionViewer): void {
      this.clientSubject.complete()
    }
  
    loadClients(filter: string = '', pageIndex: number = 0) {
      // this.api.getList(filter, pageIndex)
      // .pipe(
      //   map(e => e['response']['resultado']))
      // .subscribe((e: any) => this.clientSubject.next(e))
    }  
}