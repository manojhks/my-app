import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PostDto } from './todo/todo.dto';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiUrl = 'http://localhost:3000/api/todo/';

  constructor(private http: HttpClient) {}
  getData(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  postData(todo: PostDto): Observable<PostDto> {
    return this.http.post<PostDto>(this.apiUrl, todo);
  }

  updateData(id:number, todo: PostDto): Observable<any> {
    return this.http.put(`${this.apiUrl}${id}`, todo);
  }

  deleteData(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}${id}`);
  }
}
