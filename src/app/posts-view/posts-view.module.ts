import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostsViewRoutingModule } from './posts-view-routing.module';
import { PostsComponent } from './posts/posts.component';
import { DetailedPostModule } from '../detailed-post/detailed-post.module';


@NgModule({
  declarations: [PostsComponent],
  imports: [
    CommonModule,
    PostsViewRoutingModule,
    DetailedPostModule
  ]
})
export class PostsViewModule { }
