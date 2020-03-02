import { Posts } from './../interfaces/postInterface';
import { jsonPlaceholderUrl } from './../enviroment-variables';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(
    private readonly httpClient: HttpClient
  ) { }

  get getPosts(): Observable<Posts[]> {
    return this.httpClient.get<Posts[]>(`${jsonPlaceholderUrl}/posts`).pipe(catchError((err: HttpErrorResponse) => {
      return throwError(err);
    }));
  }

  getPost(postId: number): Observable<Posts> {
    return this.httpClient.get<Posts>(`${jsonPlaceholderUrl}/posts/${postId}`).pipe(catchError((err: HttpErrorResponse) => {
      return throwError(err);
    }));
  }

  getPostsByUser(userId): Observable<Posts[]> {
    return this.httpClient.get<Posts[]>(`${jsonPlaceholderUrl}/posts?userId=${userId}`).pipe(catchError((err: HttpErrorResponse) => {
      return throwError(err);
    }));
  }

  newPost(newPost: Posts) {
    return this.httpClient.post<Posts>(`${jsonPlaceholderUrl}/posts`, newPost).pipe(catchError((err: HttpErrorResponse) => {
      return throwError(err);
    }));
  }
}
