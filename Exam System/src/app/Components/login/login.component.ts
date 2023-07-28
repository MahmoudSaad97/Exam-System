import { AuthenticationService } from './../../Services/authentication.service';
import { UserService } from './../../Services/user.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  users:any;
  successMessage: string | null='';
  errorMessage: string | null='';
  istext:boolean=false;
  type:string="password";
  icon:string ='bi-eye-slash';
  constructor(private userService:UserService,
    private router:Router,private activatedRoute:ActivatedRoute,
    private authentication:AuthenticationService){}
  ngOnInit(): void {
    if(this.authentication.getUserData()){
    this.router.navigate(['/home']);
  }
    this.userService.getAllUsers().subscribe({
      next:(response)=>{
      this.users = response;
    }
  })
  }
loginform=new FormGroup({
  userName: new FormControl(""),
  password:new FormControl("")
});

get getuserName(){
  return this.loginform.controls['userName'];
}

get getPassword(){
  return this.loginform.controls['password'];
}

checkAuthentication(){
  let loginData = this.loginform.value;
  let result:boolean=false;
  let users = this.users;
  if(Array.isArray(users)){
    for(let i =0; i < users.length;i++){
      if(users[i].userName === loginData.userName && users[i].password === loginData.password){
        result=true;
        this.authentication.setUserData(users[i]);
        break;
      }
    }
if (result) {
  Swal.fire({
    title:'success',
    html:'<p class="text-success">You Logged Successfully</p>',
    icon:'success',
    timer:1500
  }).then((res)=>{if(res.isConfirmed || res.dismiss === Swal.DismissReason.timer) this.router.navigate(['/home'])});
    } 
  else 
  {
  Swal.fire({
    title:'Cant Login',
    html:'<p class="text-danger">Your Password or UserName is InCorrect</p>',
    icon:'error',
    timer:500
  });
  }
  }
}
showPassword(){
  this.istext =!this.istext;
  this.istext ? this.type ='text':this.type='password';
  this.istext ? this.icon ='bi-eye':this.icon='bi-eye-slash';

}
}
