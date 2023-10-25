import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GenericService {
  private apiUrl = 'http://localhost:8080';

  constructor(private httpClient: HttpClient) { }

  createCategory(data: any) {
    return this.httpClient.post(`${this.apiUrl}/api/categories/save`, data);
  }
  getAllCategory() {
    return this.httpClient.get(`${this.apiUrl}/api/categories/all`);
  }
  deleteCategorybyId(id:number){
    return this.httpClient.delete(`${this.apiUrl}/api/categories/${id}`)
  }
  editCategorybyId(id:number,data:any){
    return this.httpClient.put(`${this.apiUrl}/api/categories/${id}`,data);
  }
  
  getSubCategoryByName(name: string) {
    return this.httpClient.get<string>(`${this.apiUrl}/api/categories/subcategory/${name}`);
  }

  createSubcategory(id:number,data: any) {
    return this.httpClient.post(`${this.apiUrl}/api/categories/${id}/subcategories`, data);
  }
  editSubcategoryContentById(id:number,data:any){
    return this.httpClient.put(`${this.apiUrl}/api/categories/subcategories/${id}`,data);
  }
  deleteSubcategory(id:number){
    return this.httpClient.delete(`${this.apiUrl}/api/categories/subcategories/${id}`);
  }
  getHome(){
    return this.httpClient.get(`${this.apiUrl}/api/homes`);
  }
  createHome(data:any){
    return this.httpClient.post(`${this.apiUrl}/api/homes`,data);
  }
  getNews(){
    return this.httpClient.get(`${this.apiUrl}/api/news`);
  }
  createNews(data: any){
    return this.httpClient.post(`${this.apiUrl}/api/news`, data);
  }
  deleteNews(id:number){
    return this.httpClient.delete(`${this.apiUrl}/api/news/${id}`);
  }
}
