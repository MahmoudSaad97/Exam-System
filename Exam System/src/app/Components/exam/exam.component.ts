import { AuthenticationService } from './../../Services/authentication.service';
import { UserService } from './../../Services/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ExamService } from './../../Services/exam.service';
import { Component, OnInit ,NgModule} from '@angular/core';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-exam',
  templateUrl: './exam.component.html',
  styleUrls: ['./exam.component.css']
})
export class ExamComponent implements OnInit {
  constructor(private examService:ExamService,private router:Router,private activatedRoute:ActivatedRoute,private authentication:AuthenticationService,private UserService:UserService){}
  selectedAnswer:string='';
  selectedExam:any;
  examCompleted:boolean=false;
  loading:boolean=true;
  showExam:boolean=false;
  exams:any=[];
  Questions:any=[];
  currentQuestion:number=0;
  score:number =0;
  user:any='';
  remainingTime:{minutes:number,seconds:number} ={
    minutes:0,
    seconds:0
  };
  timer:any =0;
ngOnInit(): void {
  this.examService.getAllexam().subscribe({next:(response)=>{
  this.exams=response;
  this.loading=false;
  }});
  this.user=this.authentication.getUserData()
    if(!this.user){
      this.router.navigate(['/login'])
    }
}

onOptionSelected(selectedOption: string) {
  this.selectedExam.Questions[this.currentQuestion].selectedOption = selectedOption;
}

submitAnswer() {
  clearInterval(this.timer); 
  const currentQuestion = this.selectedExam.Questions[this.currentQuestion];
  const correctAnswer: string = currentQuestion.correct;

  if (this.selectedAnswer === correctAnswer.toLowerCase()) {
    this.score++;
  }
if(this.currentQuestion < this.selectedExam.Questions.length - 1 ){
  this.currentQuestion++;
  if (this.currentQuestion < this.selectedExam.Questions.length) {
    const timeDelay = 12000;
    this.startTimer(timeDelay);
  }
}else{
  let percent = Math.floor((this.score / this.selectedExam.Questions.length) * 100);
  if(percent > 70){
    Swal.fire("Congratulation",`<h3 class="text-success">You Have Passed The Exam</h3><p class="text-center>Your Sore Is: ${this.score}</p>`,'success')
    .then(
      (res)=>{if(res.isConfirmed || res.dismiss === Swal.DismissReason.timer) this.router.navigate(['/home'])}
    )
  }else if(percent > 60 && percent < 70){
    Swal.fire("Too Close",`<h3 class='text-warning'>You Were Too Close To Pass The Exam Try Again</h3><p class='text-center'>Your Sore Is: ${this.score}</p>`,'warning')
    .then(
      (res)=>{if(res.isConfirmed || res.dismiss === Swal.DismissReason.timer) this.router.navigate(['/home'])}
    )
  }else{
    Swal.fire("Sorry",`<h3 class='text-danger'>Study More And Try Again</h3> <p class='text-center'>Your Sore Is: ${this.score}</p>`,'error')
    .then(
      (res)=>{if(res.isConfirmed || res.dismiss === Swal.DismissReason.timer) this.router.navigate(['/home'])}
    )
  }
  this.setExamForUser(this.selectedExam.examName,`${percent}%`);
}
}

startTimer(duration: number) {
  let timerDuration = duration;
  this.remainingTime.minutes = Math.floor(timerDuration / 60000);
  this.remainingTime.seconds = Math.floor((timerDuration % 60000) / 1000);

  if (this.timer) {
    clearInterval(this.timer); 
  }

  this.timer = setInterval(() => {
    timerDuration -= 1000;
    this.remainingTime.minutes = Math.floor(timerDuration / 60000);
    this.remainingTime.seconds = Math.floor((timerDuration % 60000) / 1000);

    if (timerDuration <= 0) {
      clearInterval(this.timer);
      this.submitAnswer();
    }
  }, 1000);
}


  DisplayExam(){
    let examexist = (this.user.exams?.some((e:any)=> e.exam === this.selectedExam.examName));
    if(this.user.exams && examexist){
      Swal.fire("Error",`<h3 class'text-danger'>You Have Alredy Taked ${this.selectedExam.examName} Before</h3>`,'error')
    }else{
      this.showExam = true;
      this.randomQuestions()
        if (this.currentQuestion < this.selectedExam.Questions.length) {
        const timeDelay = 10000;
        this.startTimer(timeDelay);
      }
    }
}
setExamForUser(exam:string,grade:string){
  let examdata:{exam:String,grade:string,date:any}={
    exam:exam,
    grade:grade,
    date:new Date().toLocaleDateString()
  }
  if(this.user.role ==='user'){
    if(this.user.exams){
      this.user.exams.push(examdata);
    }
  }
  this.authentication.setUserData(this.user);
  this.UserService.editUser(this.user.id,this.user).subscribe();
}

selectExam(exam: any) {
  this.selectedExam = exam;
  this.DisplayExam();
}
randomQuestions(){
  let randomize =this.selectedExam.Questions.sort(()=> Math.random() - 0.5);
  if(this.selectedExam.Questions.length > 15){
    this.Questions = randomize.slice(0,15);
  }else{
    this.Questions = randomize;
  }
}
}

