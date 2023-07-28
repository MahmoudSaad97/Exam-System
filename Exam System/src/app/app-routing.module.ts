import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './Components/register/register.component';
import { LoginComponent } from './Components/login/login.component';
import { HomeComponent } from './Components/home/home.component';
import { ExamComponent } from './Components/exam/exam.component';
import { EditExamsComponent } from './Components/edit-exams/edit-exams.component';
import { AddQuestionComponent } from './Components/add-question/add-question.component';
import { RemovequestionsComponent } from './Components/removequestions/removequestions.component';
import { ProfileComponent } from './Components/profile/profile.component';

const routes: Routes = [
  {path:'',component:HomeComponent},
  {path:'home',component:HomeComponent},
  {path:'register',component:RegisterComponent},
  {path:'login',component:LoginComponent},
  {path:'exam',component:ExamComponent},
  {path:'editexam',component:EditExamsComponent},
  {path:'addQuestion/:id',component:AddQuestionComponent},
  {path:'removeQuestion/:id',component:RemovequestionsComponent},
  {path:'profile',component:ProfileComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
