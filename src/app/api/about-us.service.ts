import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AboutUsService {
  private apiUrl = 'http://localhost:3000/team';
  constructor(private http: HttpClient) {  }
  getTeamMembers(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
}
