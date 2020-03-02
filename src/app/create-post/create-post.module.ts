import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreatePostRoutingModule } from './create-post-routing.module';
import { NewPostComponent } from './new-post/new-post.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [NewPostComponent],
  imports: [
    CommonModule,
    CreatePostRoutingModule,
    ReactiveFormsModule 
  ]
})
export class CreatePostModule { }
