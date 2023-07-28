import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class UserService {
usersUrl:string="http://localhost:3005/users";
  constructor(private http:HttpClient) { }
  getAllUsers(){
    return this.http.get(this.usersUrl);
  }
  getUserByID(id:any){
    return this.http.get(`${this.usersUrl}/${id}`)
  }
  removeUser(id:any){
    return this.http.delete(`${this.usersUrl}/${id}`)
  }
  addUser(user:any){
    return this.http.post(this.usersUrl,user);
  }
  
  editUser(id:any,user:any){
    return this.http.put(`${this.usersUrl}/${id}`,user);
  }
}
