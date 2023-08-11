import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class UserdataService {

  // constructor() {}

      geturl = 'http://localhost:5000/users?role=user';
      constructor(private http: HttpClient) {}
      users() {
        return this.http.get(this.geturl);
      }

      posturl = 'http://localhost:5000/createUser';
      saveUsers(data: any) {
        // console.log("d",data);
        return this.http.post(this.posturl,data);
      }

      getLoginurl = 'http://localhost:5000/login';
      loginusers() {
        return this.http.get(this.getLoginurl);
      }

      postLoginurl ='http://localhost:5000/login';
      saveLogin(data:any){
        return this.http.post(this.postLoginurl,data);
}
}

//
// getRegisteredUsers() {
//   return this.http.get('http://localhost:5000/users?role=user');
// }
