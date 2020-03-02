import { TestBed } from '@angular/core/testing';
import { UserService } from './user.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { jsonPlaceholderUrl } from '../enviroment-variables';
import { User } from '../interfaces/userInterface';

describe('UserService', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let userService: UserService;
  const postsUrl = jsonPlaceholderUrl;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    httpClient = TestBed.get(HttpClient);
    httpTestingController = TestBed.get(HttpTestingController);
    userService = new UserService(httpClient);
  });

  describe('getUsers', () => {
    it('returns the correct users from the http.get request', () => {
      const userData: User[] = [
        {
          id: 1,
          name: 'user 1',
        },
        {
          id: 2,
          name: 'user 2',
        },
      ];

      userService.getUsers.subscribe(users => expect(users).toEqual(userData));

      httpTestingController.expectOne({
        url: `${postsUrl}/users`,
        method: 'Get'
      }).flush(userData);

      httpTestingController.verify();
    });

    it('Should catch 404 error', () => {
      userService.getUsers.subscribe(
        data => fail('Should have failed with 404 error'),
        (error: HttpErrorResponse) => {
          expect(error.status).toEqual(404);
          expect(error.error).toContain('404 error');
        }
      );
      httpTestingController.expectOne({
        url: `${postsUrl}/users`,
        method: 'Get'
      }).flush('404 error', { status: 404, statusText: 'Not Found' });
    });
  });
});
