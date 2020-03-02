import { jsonPlaceholderUrl } from './../enviroment-variables';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../interfaces/userInterface';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private readonly httpClient: HttpClient
  ) { }

  get getUsers(): Observable<User[]> {
    return this.httpClient.get<User[]>(`${jsonPlaceholderUrl}/users`).pipe(catchError((err: HttpErrorResponse) => {
      return throwError(err);
    }));
  }

}
