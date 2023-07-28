import { Observable } from 'rxjs';
import { UserService } from './user.service';
import { EventEmitter, Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private userLoggedData: any;
  userDataChanged: EventEmitter<any> = new EventEmitter();

  constructor(private UserService:UserService) {
    const storedData = localStorage.getItem('userLoggedData');
    if (storedData) {
      this.userLoggedData = JSON.parse(storedData);
      // this.UserService.getUserByID(this.userLoggedData);
    }
  }

  // setUserData(data: any) {
  //   this.userLoggedData = data.id;
  //   localStorage.setItem('userLoggedData', JSON.stringify(this.userLoggedData));
  //   this.userDataChanged.emit(data);
  // }
  setUserData(data: any) {
    delete data.password;
    delete data.userName;
    this.userLoggedData = data;
    localStorage.setItem('userLoggedData', JSON.stringify(this.userLoggedData));
    this.userDataChanged.emit(data);
  }

  getUserData():Observable<any> {
    return this.userLoggedData;
  }

  clearUserData() {
    this.userLoggedData = null;
    localStorage.removeItem('userLoggedData');
    this.userDataChanged.emit(null);
  }
}
