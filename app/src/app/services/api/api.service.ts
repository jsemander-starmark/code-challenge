import { Injectable } from '@angular/core';
import { map, catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as jwt_decode from 'jwt-decode';
import { environment } from 'src/environments/environment';
import { JWTOKEN } from 'src/app/config/config';

@Injectable({
  providedIn: 'root'
})

export class ApiService {
  
  constructor(private readonly httpClient: HttpClient) {}
  /*
  * Using for both sign-in & sign-up
  */
  doAuthenticate(endPoint: string , payload: any){
    const url = environment.SERVER_URL + endPoint;
    return this.httpClient.post(`${url}` , payload ).pipe(map((response : any) => {
      if(response && response.token) {
        localStorage.setItem(JWTOKEN, response.token);
        return response;
      }
      else  
        return response || '';
    }));
  }

  /*
  * Getting User's Info,
  * Generic method for get requests
  */
  getData(endPoint: string){
    const url = environment.SERVER_URL + endPoint;
    return this.httpClient.get(`${url}` , { headers : this.getHeaders() });
  }


  /*
  * Decoding JWT
  */
  decodeJWT(){
    try { return jwt_decode(localStorage.getItem(JWTOKEN))}
    catch (error) { return null;}
  }

  /*
  * Headers for Api calls
  */
  getHeaders(): HttpHeaders {
    let headers : HttpHeaders = new HttpHeaders();
    if(localStorage.getItem(JWTOKEN))
    headers = headers.append('Authorization', 'Bearer ' + localStorage.getItem(JWTOKEN));
    headers = headers.append('Access-Control-Allow-Origin', '*');
    headers = headers.append('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, DELETE');
    headers = headers.append("Content-Type" ,  "application/json");
    headers = headers.append("Access-Control-Allow-Credentials" , "true");
    headers = headers.append('Access-Control-Allow-Headers', 'Origin, Content-Type, Accept, Access-Control-Allow-Origin');
    return headers;
  }   
  
}

