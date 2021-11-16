import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { MatModule } from '../../mat.module';
import { FieldsModule } from '../fields/fields.module';
import { PostCreateComponent } from './post-create/post-create.component';
import { PostListComponent } from './posts-list/posts-list.component';

@NgModule({
  declarations: [PostCreateComponent, PostListComponent],
  imports: [
    CommonModule,
    FieldsModule,
    RouterModule,
    MatModule,
    ReactiveFormsModule,
  ],
  exports: [PostCreateComponent, PostListComponent],
})
export class PostsModule {}
