import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./posts-view/posts-view.module').then(m => m.PostsViewModule)
  },
  {
    path: 'post/:id',
    loadChildren: () => import('./detailed-post/detailed-post.module').then(m => m.DetailedPostModule)
  },
  {
    path: 'newPost',
    loadChildren: () => import('./create-post/create-post.module').then(m => m.CreatePostModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
