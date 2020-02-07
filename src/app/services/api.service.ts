import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import constantes from "../constantes";
import { tap, map } from 'rxjs/operators'; 

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  getFromApi(endpoint, aux_id = ''){
    return this.http.get(`${constantes.URL}${endpoint}${aux_id}`)
  }

  postToApi(endpoint, client){
    let data = client
    console.log(client)
    return this.http.post(`${constantes.URL}${endpoint}`, data)
  }

  updateOnApi(endpoint, id){
    return this.http.patch(`${constantes.URL}${endpoint}/${id}`, {activa: false})
  }

}


