import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DetailedPostRoutingModule } from './detailed-post-routing.module';
import { DetailedPostComponent } from './detailed-post/detailed-post.component';


@NgModule({
  declarations: [DetailedPostComponent],
  imports: [
    CommonModule,
    DetailedPostRoutingModule
  ]
})
export class DetailedPostModule { }
