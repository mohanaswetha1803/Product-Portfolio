import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { observableToBeFn } from 'rxjs/internal/testing/TestScheduler';
@Injectable({
  providedIn: 'root'
})
export class DbService {
  
  constructor(private http:HttpClient) { }
 private baseUrl='http://localhost:3001';
  public findUsername(username:string){
    return this.http.get(`http://localhost:3001/login_credentials/findUsername/'${username}'`);
  }
  public validateUsernamePassword(username: string, password: string): Observable<any> {
    const url = `${this.baseUrl}/login_credentials/validateUsernamePassword`;
    const params = { username, password };
    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this.http.get(url, { params, headers });
  }

  //find by username in db
  // public getUsername(username:string):Observable<any>{
  //   return this.http.get("http://localhost:9090/findUser/"+username);
  // }
  public getUsers(){
    return this.http.get("http://localhost:3001/login_credentials");
  }
  
}
