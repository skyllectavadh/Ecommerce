import { Component } from '@angular/core';
import { UserdataService } from '../services/userdata.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginusers: any;
  isError:any;
  constructor(private userLoginData: UserdataService, private router: Router) {}

  getLoginFormData(data: any) {
    this.userLoginData.saveLogin(data).subscribe(
      (result: any) => {
        console.log('Logged in successfully', result);

        // Save the token in localStorage
        const token = result.token;
        localStorage.setItem('token', token);
        
        // Extract the role from the response
        const role = result.role;
        if (role === 'admin') {
          this.router.navigate(['/admin']); // Navigate to admin
        } else if (role === 'user') {
          this.router.navigate(['']); // Navigate to dashboard
        } else {
          // console.log('Invalid role:', role);
        }
      },
      (error: any) => {
        this.isError = true;
        console.log('Login failed:', error);
        // Handle any login failure scenarios, such as displaying an error message
      }
    );
  }

  redirectToRegistration(){
    this.router.navigate(['/registration'])
}
}



// import { Component } from '@angular/core';
// import { UserdataService } from '../services/userdata.service';
// import { Router } from '@angular/router';

// @Component({
//   selector: 'app-login',
//   templateUrl: './login.component.html',
//   styleUrls: ['./login.component.css'],
// })
// export class LoginComponent {
//   loginusers: any;
//   constructor(private userLoginData: UserdataService, private router: Router) {
//     console.log('userLoginData', userLoginData);
//     userLoginData.loginusers().subscribe((data) => {
//       // console.log('data', data);
//       this.loginusers = data;
//     });
//   }
//   getLoginFormData(data: any) {
//     // this.userLoginData.saveLogin(data).subscribe((result) => {
//     //   console.log('Logged in successfully', result);
//     //   // console.log(result.role);

//     //   this.router.navigate(['/admin']);
//     // });
//     this.userLoginData.saveLogin(data).subscribe((result: any) => {
//       console.log('Logged in successfully', result);

//       // Extract the role from the response
//       const role = result.role;
//       if (role === 'admin') {
//         this.router.navigate(['/admin']); // Navigate to  admin
//       } else if (role === 'user') {
//         this.router.navigate(['']); // Navigate to  dashboard
//       } else {
//         console.log('Invalid role:', role);
//       }
//     });
//   }
// }

// import { Component } from '@angular/core';
// import { UserdataService } from '../services/userdata.service';
// import { Router } from '@angular/router';

// @Component({
//   selector: 'app-login',
//   templateUrl: './login.component.html',
//   styleUrls: ['./login.component.css'],
// })
// export class LoginComponent {
//   loginusers: any;

//   constructor(private userLoginData: UserdataService, private router: Router) {}

//   getLoginFormData(data: any) {
//     this.userLoginData.saveLogin(data).subscribe(
//       (result: any) => {
//         console.log('Logged in successfully', result);

//         // Save the token in localStorage
//         const token = result.token;
//         localStorage.setItem('token', token);

//         // Extract the role from the response
//         const role = result.role;
//         if (role === 'admin') {
//           this.router.navigate(['/admin']); // Navigate to admin
//         } else if (role === 'user') {
//           this.router.navigate(['']); // Navigate to dashboard
//         } else {
//           console.log('Invalid role:', role);
//         }
//       },
//       (error: any) => {
//         console.error('Login failed:', error);
//         // Handle any login failure scenarios, such as displaying an error message
//       }
//     );
//   }
// }
