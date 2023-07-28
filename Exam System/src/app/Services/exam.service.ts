import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ExamService {
examsUrl:string ='http://localhost:3005/exams';
  constructor(private http:HttpClient) { }
  getAllexam(){
    return this.http.get(this.examsUrl);
  }
  getexamByID(id:any){
    return this.http.get(`${this.examsUrl}/${id}`)
  }
  removeExam(id:any){
    return this.http.delete(`${this.examsUrl}/${id}`)
  }
  Addexam(exam:any){
    return this.http.post(this.examsUrl,exam);
  }
  editexam(id:any,exam:any){
    return this.http.put(`${this.examsUrl}/${id}`,exam);
  }
}
