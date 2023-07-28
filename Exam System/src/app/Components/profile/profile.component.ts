import { AuthenticationService } from 'src/app/Services/authentication.service';
import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
user:any= '';
  loading:boolean=true;
  constructor(private userService:UserService,private router:Router,private activatedRouter:ActivatedRoute,private authentication:AuthenticationService){

  }
  ngOnInit(): void {
      this.user= this.authentication.getUserData();
      if(this.user){
        this.loading=false;
      }
  }
}
