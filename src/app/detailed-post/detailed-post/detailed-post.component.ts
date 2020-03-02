import { Comments } from './../../interfaces/commentsInterface';
import { CommentService } from './../../httpServices/comment.service';
import { PostService } from './../../httpServices/post.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Posts } from 'src/app/interfaces/postInterface';

@Component({
  selector: 'app-detailed-post',
  templateUrl: './detailed-post.component.html',
  styleUrls: ['./detailed-post.component.scss']
})
export class DetailedPostComponent implements OnInit, OnDestroy {

  subscriptions: Subscription[] = [];
  postId: number;
  post: Posts;
  commentsData: Comments[];
  loadingPost = true;
  loadingComments = true;

  constructor(
    private readonly postService: PostService,
    private readonly commentService: CommentService,
    private readonly activatedRoute: ActivatedRoute,
  ) {
    this.postId = activatedRoute.snapshot.params.id;
  }

  ngOnInit() {
    this.getCommentsForPost();
    this.getPost();
  }

  getCommentsForPost(): void {
    this.subscriptions.push(this.commentService.getComments(this.postId).subscribe(comments => {
      this.commentsData = comments;
      this.loadingComments = false;
    }));
  }

  getPost(): void {
    this.subscriptions.push(this.postService.getPost(this.postId).subscribe(post => {
      this.post = post;
      this.loadingPost = false;
    }));
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }
}
