import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';




const API_URL = 'http://localhost:8084/api/common';

@Injectable({
  providedIn: 'root'
})


export class CommonService {

  constructor(private http: HttpClient) { }

  getKeyByValue(object:any, value: String) {
    return Object.keys(object).find(key => object[key] === value);
}

  getValueByKey(object:any, key: any) {
    return object[key];
    
  }

  getAllOccur( param : {table:string, occ: string} ): Observable<any> {
       
      
    return this.http.get<any>(`${API_URL}/occur/${param.table}?occ=${param.occ}`);
  }

}
