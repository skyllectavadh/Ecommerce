import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { UserdataService } from "../services/userdata.service";
import { Router } from '@angular/router';

@Component({
  selector: "app-editpage",
  templateUrl: "./editpage.component.html",
  styleUrls: ["./editpage.component.css"],
})
export class EditpageComponent implements OnInit {
  name: string = "";
  email: string = "";
  status: string = "";
  userId: any;
  userDataById: any;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private userdataService: UserdataService,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.data.subscribe((data) => {
      const user = data?.["state"]?.user;

      if (user) {
        this.name = user.name;
        this.email = user.email;
        this.status = user.status;
      }
    });
    this.editUserData();
  }

  editUserData() {
    this.route.params.subscribe((params) => {
      this.userId = params["id"];
      console.log("usususuususuus", this.userId);
    });
    this.userdataService.getUserById(this.userId).subscribe((data: any) => {
      this.userDataById = data;
      console.log("jfggggggggggggg", this.userDataById);
    });
  }

  // getRegisteredUsersData() {
  //   this.userDataService.users().subscribe((data: any) => {
  //     this.registeredUsers = data.data; // Assign the array to registeredUsers
  //     // console.log("data", this.registeredUsers);
  //   });
  // }

  onSubmit() {
    // this.userId = this.route.snapshot.paramMap.get('id');
    this.route.params.subscribe((params) => {
      this.userId = params["id"];
      console.log("usususuususuus", this.userId);
    });
    if (this.userId !== null) {
      const updatedUserData = {
        name: this.name,
        email: this.email,
        status: this.status,
      };

      this.userdataService.patchUser(this.userId, updatedUserData).subscribe(
        (response) => {
          console.log("Data updated successfully", response);
          this.router.navigate(['/admin'])},
        (error) => {
          console.error("Error updating data", error);
        }
      );
    } else {
      console.error("Invalid user ID");
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
