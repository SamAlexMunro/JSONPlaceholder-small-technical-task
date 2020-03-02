import { PostService } from './../../httpServices/post.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewPostComponent } from './new-post.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { Posts } from 'src/app/interfaces/postInterface';

describe('NewPostComponent', () => {
  let component: NewPostComponent;
  let fixture: ComponentFixture<NewPostComponent>;
  const testPostObs = new BehaviorSubject<Posts>(null);
  const mockPostService = {
    newPost: () => {
      return testPostObs.asObservable();
    }
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NewPostComponent],
      imports: [ReactiveFormsModule, HttpClientTestingModule],
      providers: [
        {
          provide: PostService, useValue: mockPostService
        }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('onSubmit', () => {
    it('Should set showSuccesMessage to true', () => {
      component.body.setValue('Test Message');
      component.title.setValue('Test Title');
      component.onSubmit(component.newPostForm.value);
      expect(component.showSuccessMessage).toBeTruthy();
    });
  });
});
