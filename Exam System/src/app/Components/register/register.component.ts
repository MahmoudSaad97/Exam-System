import { UserService } from './../../Services/user.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators,Validator,AbstractControl, ValidatorFn } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { checkUnique, passwordMatchValidator } from 'src/app/validationFunc/validation';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})


export class RegisterComponent implements OnInit {
  loading:boolean=true;
  constructor(private userService:UserService,private router:Router,private activatedRouter:ActivatedRoute){

  }
  ngOnInit(): void {
    this.userService.getAllUsers().subscribe({next:(response)=>{
      this.users=response;
      this.createform();
      this.loading=false;
    }});
  }
  users:any='';
  userform:any;
  istext:boolean=false;
  type:string="password";
  icon:string ='bi-eye-slash';
createform() {
  this.userform = new FormGroup({
    fname: new FormControl("", [Validators.required, Validators.pattern('[a-zA-Z]{3,8}')]),
    lname: new FormControl("", [Validators.required, Validators.pattern('[a-zA-Z]{3,8}')]),
    userName: new FormControl("", [Validators.required, Validators.minLength(6), checkUnique(this.users, 'userName')]),
    email: new FormControl("", [Validators.required, Validators.email, checkUnique(this.users, 'email')]),
    password: new FormControl("", [Validators.required, Validators.minLength(8), Validators.pattern('^(?=(.*[a-z]){4,})(?=(.*[A-Z]){1,})(?=(.*[0-9]){2,})(?=(.*[!@#$%^&*()\\-__+.]){1,}).{8,}$')]),
    Confirmpassword: new FormControl("", [Validators.required, Validators.minLength(8),passwordMatchValidator]),
    role: new FormControl("user"),
  },passwordMatchValidator);
}
get getfname(){
  return this.userform.controls["fname"];
}
get getlname(){
  return this.userform.controls["lname"];
}
get getuserName(){
  return this.userform.controls["userName"];
}
get getEmail(){
  return this.userform.controls["email"];
}
get getPassword(){
  return this.userform.controls["password"];
}
get getConfirmpassword(){
  return this.userform.controls["Confirmpassword"];
}

formsubmit(e:any){
  e.preventDefault();
  if(this.userform.status == "VALID"){
    delete this.userform.value.Confirmpassword;
    this.userService.addUser(this.userform.value).subscribe();
    this.router.navigate(['/login']);
  }
}
confirmCancel(e:any){
  if(!confirm("Are You Sure!!\nYou Will Delete Data On all Fields")){
    e.preventDefault();
  }
}
showPassword(){
  this.istext =!this.istext;
  this.istext ? this.type ='text':this.type='password';
  this.istext ? this.icon ='bi-eye':this.icon='bi-eye-slash';

}
}
