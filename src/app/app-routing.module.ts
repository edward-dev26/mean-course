import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PostCreateComponent } from './components/posts/post-create/post-create.component';
import { PostListComponent } from './components/posts/posts-list/posts-list.component';
import { NotAuthGuard } from './guards/not-auth.guard';

const routes: Routes = [
  { path: '', component: PostListComponent },
  {
    path: 'auth',
    loadChildren: () =>
      import('./components/auth/auth.module').then(
        ({ AuthModule }) => AuthModule
      ),
  },
  {
    path: 'create',
    component: PostCreateComponent,
    canActivate: [NotAuthGuard],
  },
  {
    path: 'update/:postId',
    component: PostCreateComponent,
    canActivate: [NotAuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [NotAuthGuard],
})
export class AppRoutingModule {}
