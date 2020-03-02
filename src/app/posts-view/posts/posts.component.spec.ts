import { UserService } from './../../httpServices/user.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { PostService } from './../../httpServices/post.service';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { PostsComponent } from './posts.component';
import { BehaviorSubject } from 'rxjs';
import { User } from 'src/app/interfaces/userInterface';
import { Posts } from 'src/app/interfaces/postInterface';

describe('PostsComponent', () => {
  let component: PostsComponent;
  let fixture: ComponentFixture<PostsComponent>;
  const testPostData = [
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
  const testUserData = [
    {
      id: 1,
      name: 'user1'
    },
    {
      id: 2,
      name: 'user2'
    }
  ];
  const testPostDataObs = new BehaviorSubject<Posts[]>(testPostData);
  const testUserDataObs = new BehaviorSubject<User[]>(testUserData);
  const mockPostService = {
    getPosts: testPostDataObs.asObservable(),
    getPostsByUser: () => {
      return testPostDataObs.asObservable();
    }
  };
  const mockUserService = {
    getUsers: testUserDataObs.asObservable()
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PostsComponent],
      imports: [RouterTestingModule, HttpClientTestingModule],
      providers: [
        {
          provide: PostService, useValue: mockPostService
        },
        {
          provide: UserService, useValue: mockUserService
        }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('ngOnInit', () => {
    it('Should return the relevant posts & users', () => {
      fixture.detectChanges();
      expect(component.postData).toBe(testPostData);
      expect(component.users).toBe(testUserData);
    });
    it('Should add one subscriptions to the subscriptions array', () => {
      fixture.detectChanges();
      expect(component.subscriptions.length).toBe(1);
    });
  });

  describe('ngOnDestroy', () => {
    it('Should unsubscribe from the all subscriptions', () => {
      const subSpy = spyOn(component.subscriptions[0], 'unsubscribe');
      const subSpy2 = spyOn(component.postSubscription, 'unsubscribe');
      fixture.destroy();
      expect(subSpy).toHaveBeenCalledTimes(1);
      expect(subSpy2).toHaveBeenCalledTimes(1);
    });
  });

  describe('getUserName', () => {
    it('Should find the matching user based on the id input', () => {
      component.getUserName(1);
      expect(component.getUserName(1)).toBe(testUserData[0]);
    });
  });

  describe('filterResults', () => {
    it(`Should unsubscribe from the getAllPosts subscription when the value isn't 'all'`, () => {
      const subSpy = spyOn(component.postSubscription, 'unsubscribe');
      component.filterResults(1);
      expect(subSpy).toHaveBeenCalledTimes(1);
    });
    it(`Should set the dataChanged boolean to true when the value isn't 'all`, () => {
      component.filterResults(1);
      expect(component.dataChanged).toBeTruthy();
    });
    it(`Should set the dataChanged boolean to false when the value is 'all'`, () => {
      component.filterResults('all');
      expect(component.dataChanged).toBeFalsy();
    });
    it(`Should invoke the getPosts method when the value is 'all'`, () => {
      const spy = spyOn(component, 'getPosts');
      component.filterResults(1);
      component.filterResults('all');
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });
});
