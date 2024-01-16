import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserAuthService } from './user-auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  // https://api.shpizy.shop

  PATH_OF_API = "https://shopyfy-production.up.railway.app";
  requestHeader = new HttpHeaders(
    {"No-Auth": "True"}
  )

  constructor(
    private http: HttpClient,
    private userAuthService : UserAuthService,
    ) { }



  public login(loginData: any){
    return this.http.post(this.PATH_OF_API + "/authenticate", loginData , {headers:this.requestHeader})
  }



  public register(registerData:any){
    return this.http.post(this.PATH_OF_API + "/registerNewUser", registerData )
  }


  public forUser() {
    return this.http.get(this.PATH_OF_API + '/forUser', {
      responseType: 'text',
    });
  }


  public forAdmin() {
    return this.http.get(this.PATH_OF_API + '/forAdmin', {
      responseType: 'text',
    });
  }


  public roleMatch(allowedRoles:string[]): boolean {
    let isMatch = false;
    const userRoles: any = this.userAuthService.getRoles();

    if(userRoles != null && userRoles) {
      for(let i = 0; i < userRoles.length; i++) {
        for(let j = 0; j < allowedRoles.length; j++) {


          if(userRoles[i].roleName === allowedRoles[j]){

            isMatch = true;
            break;
          }
        }
      }
    }
    return isMatch;
  }


}
