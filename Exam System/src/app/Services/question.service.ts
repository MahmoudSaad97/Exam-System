import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor() { }

  addQuestion(exam:any,question:any){
    exam.Questions.push(question);
  }
  removeQuestion(exam:any,questionindex:any){
    exam.Questions.splice(questionindex,1);
  }
}
