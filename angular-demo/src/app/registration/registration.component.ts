import { Component } from '@angular/core';
import { UserdataService } from '../services/userdata.service';
@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
})
export class RegistrationComponent {

  users: any;
  constructor(private userData: UserdataService) {
    // console.log('userData', userData);
    userData.users().subscribe((data) => {
      // console.log('data', data);
      this.users = data;
    });
  }

  getUserFormData(data: any) {
    // console.log("dd",data);
    this.userData.saveUsers(data).subscribe((result) => {
      console.log('re', result);
    });
  }
}
