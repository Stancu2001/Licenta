import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { EdithomeComponent } from './pages/home/edithome/edithome.component';
import { PageHandlerComponent } from './pages/page-handler/page-handler.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { NewsComponent } from './pages/news/news.component';
import { FileComponent } from './pages/file/file.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'edithome/:id', component: EdithomeComponent },
  { path: 'page/news', component: NewsComponent , pathMatch:"full"},
  {path: 'page/file',component:FileComponent, pathMatch:"full"},
  { path: 'page/:name', component: PageHandlerComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
