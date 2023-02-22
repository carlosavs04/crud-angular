import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


   apiRole = environment.apiUrl +'/user/role'
   apiToken = environment.apiUrl +'/user'

  constructor(private http: HttpClient) {

   }

   verifyToken(token:string){
    return this.http.get(this.apiToken,{headers:{'Authorization':token}})
   }

   verifyRole(){
    return this.http.get(this.apiRole).subscribe()
   }

}
