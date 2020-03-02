import { Posts } from './../../interfaces/postInterface';
import { CommentService } from './../../httpServices/comment.service';
import { PostService } from './../../httpServices/post.service';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailedPostComponent } from './detailed-post.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Comments } from 'src/app/interfaces/commentsInterface';
import { BehaviorSubject } from 'rxjs';

describe('DetailedPostComponent', () => {
  let component: DetailedPostComponent;
  let fixture: ComponentFixture<DetailedPostComponent>;
  const testCommentData = [{
    postId: 1,
    id: 1,
    name: 'testName',
    email: 'testEmail@email.com',
    body: 'testBody'
  }];
  const testPostData = {
    userId: 1,
    id: 1,
    title: 'testTitle',
    body: 'testBody'
  };
  const testCommentDataObs = new BehaviorSubject<Comments[]>(testCommentData);
  const testPostDataObs = new BehaviorSubject<Posts>(testPostData);
  const mockCommentService = {
    getComments: () => {
      return testCommentDataObs.asObservable();
    }
  };

  const mockPostService = {
    getPost: () => {
      return testPostDataObs.asObservable();
    }
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DetailedPostComponent],
      imports: [RouterTestingModule, HttpClientTestingModule],
      providers: [
        {
          provide: PostService, useValue: mockPostService
        },
        {
          provide: CommentService, useValue: mockCommentService
        }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailedPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('ngOnInit', () => {
    it('Should add two subscriptions to the subscriptions array', () => {
      fixture.detectChanges();
      expect(component.subscriptions.length).toBe(2);
    });
    it('Should get comment and post data', () => {
      fixture.detectChanges();
      expect(component.commentsData).toBe(testCommentData);
      expect(component.post).toBe(testPostData);
    });
  });

  describe('ngOnDestroy', () => {
    it('Should unsubscribe from the all subscriptions', () => {
      const subSpy = spyOn(component.subscriptions[0], 'unsubscribe');
      const subSpy2 = spyOn(component.subscriptions[1], 'unsubscribe');
      fixture.destroy();
      expect(subSpy).toHaveBeenCalledTimes(1);
      expect(subSpy2).toHaveBeenCalledTimes(1);
    });
  });

});
