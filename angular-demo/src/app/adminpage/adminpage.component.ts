import { Component,ViewChild } from '@angular/core';
import { UserdataService } from '../services/userdata.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-adminpage',
  templateUrl: './adminpage.component.html',
  styleUrls: ['./adminpage.component.css']
})
export class AdminpageComponent {
  registeredUsers: any[]; // Variable to store registered users' data

  constructor(private userDataService: UserdataService, private router: Router) {
    this.registeredUsers = [];
  }

  ngOnInit() {
    this.getRegisteredUsersData();
  }

  getRegisteredUsersData() {
    this.userDataService.users().subscribe((data: any) => {
      this.registeredUsers = data.data; // Assign the array to registeredUsers
      // console.log("data", this.registeredUsers);
    });
  }
  

  deleteUser(user: any) {
    const index = this.registeredUsers.indexOf(user);
    if (index !== -1) {
      this.registeredUsers.splice(index, 1);
    }
  }

  redirectToEdit(user: any) {
    this.router.navigate(['/edit', user._id], { state: { user } });
  }

  redirectToOrder(){
    this.router.navigate(['/order'])
  }


}

//   deleteUser(user: any) {
//   const index = this.registeredUsers.indexOf(user);
//   if (index !== -1) {
//     // Update status in the frontend
//     this.registeredUsers[index].status = 'delete';

//     // Save updated status to the database
//     this.userDataService.updateUserStatus(user._id, 'delete').subscribe(
//       (response) => {
//         console.log('Status updated successfully', response);
//       },
//       (error) => {
//         console.error('Failed to update status', error);
//       }
//     );
//   }
// }

  // deleteUser(user: any) {
  //   const index = this.registeredUsers.indexOf(user);
  //   if (index !== -1) {
  //     this.registeredUsers[index].status = 'delete';
  //   }
  // }
// getRegisteredUsersData() {
//   this.userDataService.getRegisteredUsers().subscribe((data: any) => {
//     this.registeredUsers = data;
//   });
// }


// import { UserdataService } from '../path-to-your-userdata-service/userdata.service'; // Replace 'path-to-your-userdata-service' with the actual path to your userdata.service.ts

// export class AdminComponent {
//   registeredUsers: any[]; // Variable to store registered users' data

//   constructor(private userDataService: UserdataService) {
//     this.registeredUsers = [];
//   }

//   ngOnInit() {
//     this.getRegisteredUsersData();
//   }

//   getRegisteredUsersData() {
//     this.userDataService.getRegisteredUsers().subscribe((data: any) => {
//       this.registeredUsers = data;
//     });
//   }
// }
