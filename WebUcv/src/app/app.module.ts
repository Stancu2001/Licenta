import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from './layout/navbar/navbar.component';
import { NavbarMinimalComponent } from './layout/navbar-minimal/navbar-minimal.component';
import { HomeComponent } from './pages/home/home.component';
import { DropdownComponent } from './layout/navbar-minimal/dropdown/dropdown.component';
import { BaseEditorComponent } from './shared/editor/base-editor/base-editor.component';
import { QuillModule } from 'ngx-quill';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ToastrModule} from 'ngx-toastr';
import { EdithomeComponent } from './pages/home/edithome/edithome.component';
import {MatDialogModule} from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddCategoryModalComponent } from './layout/navbar-minimal/add-category-modal/add-category-modal.component';
import { EditCategoryModalComponent } from './layout/navbar-minimal/edit-category-modal/edit-category-modal.component';
import { AddSubcategoryModalComponent } from './layout/navbar-minimal/add-subcategory-modal/add-subcategory-modal.component';
import { PageHandlerComponent } from './pages/page-handler/page-handler.component';
import { EditSubcategoryModalComponent } from './layout/navbar-minimal/edit-subcategory-modal/edit-subcategory-modal.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { TokenInterceptorInterceptor } from './token-interceptor.interceptor';
import { NewsComponent } from './pages/news/news.component';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatIconModule} from '@angular/material/icon';
import { FileComponent } from './pages/file/file.component';
import {NgxPaginationModule} from 'ngx-pagination';
import { AddNewsModalComponent } from './pages/news/add-news-modal/add-news-modal.component';
import { EditNewsModalComponent } from './pages/news/edit-news-modal/edit-news-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    NavbarMinimalComponent,
    HomeComponent,
    DropdownComponent,
    BaseEditorComponent,
    EdithomeComponent,
    AddCategoryModalComponent,
    EditCategoryModalComponent,
    AddSubcategoryModalComponent,
    PageHandlerComponent,
    EditSubcategoryModalComponent,
    LoginComponent,
    NewsComponent,
    FileComponent,
    AddNewsModalComponent,
    EditNewsModalComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    NgxPaginationModule,
    BrowserAnimationsModule,
    QuillModule.forRoot(),
    HttpClientModule,
    ToastrModule.forRoot({
      closeButton: true,
      timeOut: 5000,
       positionClass: 'toast-bottom-right',
      preventDuplicates: true,
      newestOnTop: true,
      enableHtml: true,
      progressBar: true,
      progressAnimation: 'increasing',
    }),
    MatDialogModule,
    MatExpansionModule,MatIconModule
  ],
  providers: [{provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptorInterceptor,
    multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
