import { jsonPlaceholderUrl } from './../enviroment-variables';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { Comments } from '../interfaces/commentsInterface';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(
    private readonly httpClient: HttpClient
  ) { }

  getComments(postId: number): Observable<Comments[]> {
    return this.httpClient.get<Comments[]>(`${jsonPlaceholderUrl}/comments?postId=${postId}`)
      .pipe(catchError((err: HttpErrorResponse) => {
        return throwError(err);
      }));
  }
}
