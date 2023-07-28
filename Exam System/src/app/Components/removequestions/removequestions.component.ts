import { AuthenticationService } from 'src/app/Services/authentication.service';
import { QuestionService } from './../../Services/question.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ExamService } from './../../Services/exam.service';
import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-removequestions',
  templateUrl: './removequestions.component.html',
  styleUrls: ['./removequestions.component.css']
})
export class RemovequestionsComponent {
  exam:any='';
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
        this.exam = res;
        this.loading=false;
      }});
    }
      this.user = this.authentication.getUserData()
  if(!this.user || this.user.role != 'admin'){
    this.router.navigate(['/home']);
  }
  }

      removeQuestionFromExam(index:any){
      this.QuestionService.removeQuestion(this.exam,index);
      console.log(this.exam.Questions);
      this.ExamService.editexam(this.exam.id,this.exam).subscribe(
        {
          next:()=>{
            // this.Router.navigate(['/editexam'])
          }
        }
      );
    }
}
