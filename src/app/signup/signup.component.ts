import { NgForm } from '@angular/forms';
import { Component } from '@angular/core';
import { UserService } from '../_services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {

  constructor(private userService:UserService , private router :Router){}

  register(registerForm:NgForm){
    console.log(registerForm.value);

    this.userService.register(registerForm.value).subscribe(
      (response) =>{
        console.log(response);
        this.router.navigate(['/login'])
      }
    )


  }


}
