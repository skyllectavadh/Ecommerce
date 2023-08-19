import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { UserdataService } from '../services/userdata.service';
@Component({
  selector: 'app-editpage',
  templateUrl: './editpage.component.html',
  styleUrls: ['./editpage.component.css'],
})
export class EditpageComponent implements OnInit {
  name: string = '';
  email: string = '';
  status: string = '';

  constructor(private route: ActivatedRoute, private http: HttpClient,private userdataService: UserdataService) {}

  ngOnInit() {
    this.route.data.subscribe((data) => {
      const user = data?.['state']?.user;

      if (user) {
        this.name = user.name;
        this.email = user.email;
        this.status = user.status;
      }
    });
  }
  
  
  onSubmit() {
    const userId = this.route.snapshot.paramMap.get('id');
    if (userId !== null) {
      const updatedUserData = {
        name: this.name,
        email: this.email,
        status: this.status,
      };
  
      this.userdataService.patchUser(userId, updatedUserData).subscribe(
        (response) => {
          console.log('Data updated successfully', response);
        },
        (error) => {
          console.error('Error updating data', error);
        }
      );
    } else {
      console.error('Invalid user ID');
    }
  }
  
}

// onSubmit() {
  //   const userId = this.route.snapshot.paramMap.get('id');
  //   const updatedUserData = {
  //     name: this.name,
  //     email: this.email,
  //     status: this.status,
  //   };

  //   this.http
  //     .patch(`http://localhost:5000/users/${userId}`, updatedUserData)
  //     .subscribe(
  //       (response) => {
  //         console.log('Data updated successfully', response);

  //       },
  //       (error) => {
  //         console.error('Error updating data', error);

  //       }
  //     );
  // }