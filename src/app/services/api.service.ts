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
    .pipe(
      map(res => !endpoint.includes(constantes.LISTAR) ? res['response']['datos']: res['response']['resultado']),
      tap(console.log)
      )
  }

  postToApi(client){
    let data = this.getFormData(client)
    console.log(data.get('nombres'))
    return this.http.post(`${constantes.URL}${constantes.REGISTRO}`, data)
  }

  getFormData(object) {
    return Object.keys(object).reduce((formData, key) => {
      formData.append(key, object[key]);
      return formData;
    }, new FormData());
  } 

  getList(busca = '', pagina = 0){
    return this.http.post(`${constantes.URL}${constantes.LISTAR}`, this.getFormData({busca, pagina}))
  }
}


