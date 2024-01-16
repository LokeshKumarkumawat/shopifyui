import { Component, OnInit } from '@angular/core';
import { UserAuthService } from '../_services/user-auth.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})


export class UserComponent implements OnInit{
  useritem: any;

  constructor(private userAuthService: UserAuthService){}


  ngOnInit(): void {

     this.useritem = this.userAuthService.getUser();

    console.log("firstt",this.useritem.userFirstName );

  }






}
