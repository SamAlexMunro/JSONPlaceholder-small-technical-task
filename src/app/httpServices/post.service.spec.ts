import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { PostService } from './post.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Posts } from '../interfaces/postInterface';
import { jsonPlaceholderUrl } from '../enviroment-variables';

describe('PostService', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let postService: PostService;
  const postsUrl = jsonPlaceholderUrl;
  const postData: Posts[] = [
    {
      userId: 1,
      id: 1,
      title: 'Test Title 1',
      body: 'Test body 1'
    },
    {
      userId: 2,
      id: 2,
      title: 'Test Title 2',
      body: 'Test body 2'
    }
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    httpClient = TestBed.get(HttpClient);
    httpTestingController = TestBed.get(HttpTestingController);
    postService = new PostService(httpClient);
  });

  describe('getPosts', () => {
    it('returns the correct posts from the http.get request', () => {
      postService.getPosts.subscribe(posts => expect(posts).toEqual(postData));

      httpTestingController.expectOne({
        url: `${postsUrl}/posts`,
        method: 'Get'
      }).flush(postData);

      httpTestingController.verify();
    });

    it('Should catch 404 error', () => {
      postService.getPosts.subscribe(
        data => fail('Should have failed with 404 error'),
        (error: HttpErrorResponse) => {
          expect(error.status).toEqual(404);
          expect(error.error).toContain('404 error');
        }
      );
      httpTestingController.expectOne({
        url: `${postsUrl}/posts`,
        method: 'Get'
      }).flush('404 error', { status: 404, statusText: 'Not Found' });
    });
  });

  describe('getPost', () => {
    it('returns the correct posts from the http.get request', () => {
      postService.getPost(1).subscribe(posts => expect(posts).toEqual(postData[0]));

      httpTestingController.expectOne({
        url: `${postsUrl}/posts/1`,
        method: 'Get'
      }).flush(postData[0]);

      httpTestingController.verify();
    });

    it('Should catch 404 error', () => {
      postService.getPost(1).subscribe(
        data => fail('Should have failed with 404 error'),
        (error: HttpErrorResponse) => {
          expect(error.status).toEqual(404);
          expect(error.error).toContain('404 error');
        }
      );

      httpTestingController.expectOne({
        url: `${postsUrl}/posts/1`,
        method: 'Get'
      }).flush('404 error', { status: 404, statusText: 'Not Found' });
    });

  });

  describe('getPostsByUser', () => {
    it('returns the correct posts from the http.get request, with the correct query parameter in the url', () => {
      postService.getPostsByUser(1).subscribe(posts => expect(posts).toEqual(postData));

      httpTestingController.expectOne({
        url: `${postsUrl}/posts?userId=1`,
        method: 'Get'
      }).flush(postData);

      httpTestingController.verify();
    });

    it('Should catch 404 error', () => {
      postService.getPostsByUser(1).subscribe(
        data => fail('Should have failed with 404 error'),
        (error: HttpErrorResponse) => {
          expect(error.status).toEqual(404);
          expect(error.error).toContain('404 error');
        }
      );
      httpTestingController.expectOne({
        url: `${postsUrl}/posts?userId=1`,
        method: 'Get'
      }).flush('404 error', { status: 404, statusText: 'Not Found' });
    });
  });

  describe('getPostsByUser', () => {
    it('returns the correct posts from the http.get request, with the correct query parameter in the url', () => {
      postService.newPost({ userId: 1, id: 1, title: 'test', body: 'test' })
        .subscribe(posts => expect(posts).toEqual({ userId: 1, id: 1, title: 'test', body: 'test' }));

      httpTestingController.expectOne({
        url: `${jsonPlaceholderUrl}/posts`,
        method: 'Post'
      }).flush({ userId: 1, id: 1, title: 'test', body: 'test' });

      httpTestingController.verify();
    });

    it('Should catch 404 error', () => {
      postService.newPost(null).subscribe(
        data => fail('Should have failed with 404 error'),
        (error: HttpErrorResponse) => {
          expect(error.status).toEqual(404);
          expect(error.error).toContain('404 error');
        }
      );
      httpTestingController.expectOne({
        url: `${jsonPlaceholderUrl}/posts`,
        method: 'Post'
      }).flush('404 error', { status: 404, statusText: 'Not Found' });
    });
  });
});
