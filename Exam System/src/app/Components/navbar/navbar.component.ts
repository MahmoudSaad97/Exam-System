import { checkUnique } from 'src/app/validationFunc/validation';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from './../../Services/authentication.service';
import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{
constructor(private authentication:AuthenticationService,
  private router:Router,
  private activatedRoute:ActivatedRoute ){}
  ngOnInit(): void {
    this.checklogin();
    this.authentication.userDataChanged.subscribe((data)=>{
      this.checklogin();
    })
  }
  loginstate:boolean=false;
  userdata:any='';
  checklogin(){
  this.userdata = this.authentication.getUserData();
    if(this.userdata)
    this.loginstate = true;
    else
    this.loginstate =false;
  }

  logout(){
    this.authentication.clearUserData();
  }
}
