import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';




const API_URL = 'http://localhost:8084/common';

@Injectable({
  providedIn: 'root'
})


export class CommonService {

  constructor(private http: HttpClient) { }

  getAllDatas(table:string): Observable<any>{
    return this.http.get<[]>(`${API_URL}/datas/${table}`)
   }
}
