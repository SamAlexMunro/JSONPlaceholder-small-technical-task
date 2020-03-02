import { UserService } from './../../httpServices/user.service';
import { User } from './../../interfaces/userInterface';
import { Posts } from './../../interfaces/postInterface';
import { PostService } from './../../httpServices/post.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit, OnDestroy {

  subscriptions: Subscription[] = [];
  postSubscription: Subscription;
  postData: Posts[];
  userData: User[];
  users: User[];
  loading = true;
  dataChanged = false;

  constructor(
    private readonly postService: PostService,
    private readonly userService: UserService,
    private readonly router: Router
  ) { }

  ngOnInit() {
    this.getUsers();
    this.getPosts();
  }

  getPosts(): void {
    this.postSubscription = this.postService.getPosts.subscribe(posts => {
      this.postData = posts;
      this.loading = false;
    });
  }

  getUsers(): void {
    this.subscriptions.push(this.userService.getUsers.subscribe(users => {
      this.users = users;
    }));
  }

  getUserName(userId: number): User {
    if (this.users) {
      return this.users.find(user => user.id === userId);
    }
  }

  filterResults(userId: number | string): void {
    if (userId !== 'all') {
      this.subscriptions.push(this.postService.getPostsByUser(userId).subscribe((posts) => {
        this.postData = posts;
        this.dataChanged = true;
        this.postSubscription.unsubscribe();
      }));
    } else if (this.dataChanged && userId === 'all') {
      this.dataChanged = false;
      this.getPosts();
    }
  }

  navigateToDetailedPost(id: number): void {
    this.router.navigate(['post', id]);
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
    this.postSubscription.unsubscribe();
  }
}
