import { Component, ElementRef, ViewChild } from '@angular/core';

import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../_services/user.service';
import { UserAuthService } from '../_services/user-auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {


  @ViewChild('toast')
  toast!: ElementRef;
  @ViewChild('progress') progress!: ElementRef;
  @ViewChild('closeIcon') closeIcon!: ElementRef ;

  timer1: any;
  timer2: any;



  constructor(
    private userService: UserService,
    private userAuthService: UserAuthService,
    private router: Router
  ) {


  }

  login(loginForm: NgForm) {
    this.userService.login(loginForm.value).subscribe((response: any) => {

      console.log(response);


      this.userAuthService.setRoles(response.user.role);
      this.userAuthService.setToken(response.jwtToken);
      this.userAuthService.setUser(response.user);



      const role = response.user.role[0].roleName;

      if (role === 'Admin') {
        this.router.navigate(['/']);
      } else {



        this.router.navigate(['/']);
      }

    }
    );
  }


  registerUser() {
    this.router.navigate(['/register']);
  }





  onButtonClick() {
    this.toast.nativeElement.classList.add('active');
    this.progress.nativeElement.classList.add('active');

    this.timer1 = setTimeout(() => {
      this.toast.nativeElement.classList.remove('active');
    }, 5000);

    this.timer2 = setTimeout(() => {
      this.progress.nativeElement.classList.remove('active');
    }, 5300);
  }

  onCloseIconClick() {
    this.toast.nativeElement.classList.remove('active');

    setTimeout(() => {
      this.progress.nativeElement.classList.remove('active');
    }, 300);

    clearTimeout(this.timer1);
    clearTimeout(this.timer2);
  }

}
