import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/enviroment.local";

@Injectable({
  providedIn: "root",
})
export class UserdataService {    
  private apiUrl = `${environment.url}`;

  geturl = `${this.apiUrl}users?role=user`;
  constructor(private http: HttpClient) {}

  getUserById(userId: string) {
    const url = `${this.apiUrl}users/${userId}`;
    return this.http.get(url);
  }
  

  patchUser(userId: string, updatedData: any) {
    const url = `${this.apiUrl}users/${userId}`;
    return this.http.patch(url, updatedData);
  }

  users() {
    return this.http.get(this.geturl);
  }

  posturl = `${this.apiUrl}createUser`;
  saveUsers(data: any) {
    // console.log("d",data);
    return this.http.post(this.posturl, data);
  }

  getLoginurl = `${this.apiUrl}login`;
  loginusers() {
    return this.http.get(this.getLoginurl);
  }

  postLoginurl = `${this.apiUrl}login`;
  saveLogin(data: any) {
    return this.http.post(this.postLoginurl, data);
  }
} 


