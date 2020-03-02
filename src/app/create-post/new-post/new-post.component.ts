import { PostService } from './../../httpServices/post.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Posts } from 'src/app/interfaces/postInterface';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.scss']
})
export class NewPostComponent implements OnInit {

  newPostForm: FormGroup;
  showSuccessMessage: boolean;

  constructor(
    private readonly form: FormBuilder,
    private readonly postService: PostService
  ) {
    this.newPostForm = this.form.group({
      title: new FormControl('', [Validators.required]),
      body: new FormControl('', [Validators.required]),
      id: 1
    });
  }

  ngOnInit() {
  }

  onSubmit(newPost: Posts): void {
    this.showSuccessMessage = false;
    this.postService.newPost(newPost).subscribe((res) => {
      this.showSuccessMessage = true;
      this.newPostForm.reset();
      console.log(`Succesfully posted}`, res);
    });
  }

  get title() { return this.newPostForm.get('title'); }

  get body() { return this.newPostForm.get('body'); }
}
