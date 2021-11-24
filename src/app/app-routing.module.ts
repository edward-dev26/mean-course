import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NotFoundComponent } from './components/not-found/not-found.component';
import { PostCreateComponent } from './components/posts/post-create/post-create.component';
import { PostListComponent } from './components/posts/posts-list/posts-list.component';
import { ProfileFormComponent } from './components/profile/profile-form/profile-form.component';
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
  {
    path: 'profile/update',
    component: ProfileFormComponent,
    canActivate: [NotAuthGuard],
  },
  {
    path: '**',
    pathMatch: 'full',
    component: NotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [NotAuthGuard],
})
export class AppRoutingModule {}
