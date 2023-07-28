import { UserService } from './../../Services/user.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ɵafterNextNavigation } from '@angular/router';
import { AuthenticationService } from 'src/app/Services/authentication.service';
import { ExamService } from 'src/app/Services/exam.service';

@Component({
  selector: 'app-edit-exams',
  templateUrl: './edit-exams.component.html',
  styleUrls: ['./edit-exams.component.css']
})
export class EditExamsComponent implements OnInit {
  constructor(private examService:ExamService,
  private router:Router,
  private activatedRoute:ActivatedRoute,
  private authentication:AuthenticationService,
  private UserService:UserService
){}
exams:any='';
loading:boolean=true;
examName='';
user:any='';
  ngOnInit(): void {
  this.examService.getAllexam().subscribe(
    {next:(res)=>{
      this.exams = res;
      this.loading =false;
    }
  });
  this.user = this.authentication.getUserData()
  if(!this.user || this.user.role != 'admin'){
    this.router.navigate(['/home']);
  }
  }
  addExam(){
    let exam={
      examName:this.examName,
      Questions:[]
    }
    this.examService.Addexam(exam).subscribe(
      (addedexam:any)=>{
        this.exams.push(addedexam);
      }
    );
  }
  DeleteExam(id:any){
    this.examService.removeExam(id).subscribe({
      next:()=>{
        this.exams = this.exams.filter((exam:any)=>exam.id !=id)
      }
    });
  }
}
