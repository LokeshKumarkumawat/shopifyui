import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {

  constructor() { }

  public setRoles(roles:[]){
    localStorage.setItem("roles", JSON.stringify(roles));
  }

  public setUser(user:[]){
    localStorage.setItem("user", JSON.stringify(user));
  }

  public getRoles():any[]{
    const rolesString = localStorage.getItem("roles");
    return JSON.parse(rolesString ?? "[]");
  }

  public getUser():any[]{
    const userString = localStorage.getItem("user");
    return JSON.parse(userString ?? "[]");
  }

  public setToken(jwtToken:string){
    localStorage.setItem("jwtToken",jwtToken);
  }

  public getToken(): string | null {
    return localStorage.getItem("jwtToken");
  }

  public clear(){
    localStorage.clear();
  }

  public isLoggedIn(){
    return this.getRoles() && this.getToken();
  }

  public isAdmin(){
    const roles:any[] = this.getRoles();
    return roles[0].roleName === 'Admin';
  }
  public isUser(){
    const roles:any[] = this.getRoles();
    return roles[0].roleName === 'User';
  }



}
