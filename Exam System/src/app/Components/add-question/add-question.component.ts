import { AuthenticationService } from 'src/app/Services/authentication.service';
import { QuestionService } from './../../Services/question.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ExamService } from './../../Services/exam.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { checkUnique } from 'src/app/validationFunc/validation';

@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.css']
})
export class AddQuestionComponent implements OnInit {
  exam:any='';
  questionform:any='';
  user:any='';
  loading:boolean=true;
constructor(private ExamService:ExamService,
  private router:Router,
  private ActivatedRoute:ActivatedRoute,
  private QuestionService:QuestionService,
  private authentication:AuthenticationService) {}
  ngOnInit(): void {
    let examid:any =this.ActivatedRoute.snapshot.paramMap.get("id");
    if(examid != 0){
      this.ExamService.getexamByID(examid).subscribe({next:(res)=>{
        this.exam = res
        this.loading = false;
        this.createform();
      }});
    }
  this.user = this.authentication.getUserData()
  if(!this.user || this.user.role != 'admin'){
    this.router.navigate(['/home']);
  }
  }
  createform(){
    this.questionform = new FormGroup({
    question:new FormControl("",Validators.required),
    a:new FormControl("",Validators.required),
    b:new FormControl("",Validators.required),
    c:new FormControl("",Validators.required),
    d:new FormControl("",Validators.required),
    correct:new FormControl("",[Validators.required,Validators.pattern("^[a-dA-D]$")])
    })
    }
    get getQuestion(){
      return this.questionform.controls["question"]
    }
    get getAchoice(){
      return this.questionform.controls["a"]
    }
    get getBchoice(){
      return this.questionform.controls["b"]
    }
    get getCchoice(){
      return this.questionform.controls["c"]
    }
    get getDchoice(){
      return this.questionform.controls["d"]
    }
    get getCorrectChoice(){
      return this.questionform.controls["correct"]
    }
    AddQuestionToExam(){
      this.QuestionService.addQuestion(this.exam,this.questionform.value);
      this.ExamService.editexam(this.exam.id,this.exam).subscribe(
        {
          next:()=>{
            this.router.navigate([`/removeQuestion/${this.exam.id}`])
          }
        }
      );
    }
}

