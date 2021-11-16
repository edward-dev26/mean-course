import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { AppValidators } from 'src/app/helpers/validators';
import { LoaderService } from 'src/app/services/loader.service';
import { PostsService } from 'src/app/services/posts.service';

enum FormMode {
  Create = 'create',
  Update = 'update',
}

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css'],
})
export class PostCreateComponent implements OnInit {
  private mode: FormMode = FormMode.Create;
  public isLoading: boolean = false;
  public form!: FormGroup;
  public postId?: string;

  constructor(
    public postsService: PostsService,
    public loaderService: LoaderService,
    public route: ActivatedRoute,
    public router: Router
  ) {}

  ngOnInit() {
    this.initiateForm();
    this.loaderService.subscribe((isLoading) => {
      this.isLoading = isLoading;
    });
    this.getInitialValues();
  }

  initiateForm() {
    this.form = new FormGroup({
      title: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(3)],
      }),
      content: new FormControl(null, {
        validators: [Validators.required, Validators.maxLength(500)],
      }),
      image: new FormControl(null, {
        validators: Validators.required,
        asyncValidators: AppValidators.mimeType,
      }),
    });
  }

  getInitialValues() {
    this.route.params.subscribe((params) => {
      if (params.postId) {
        this.loaderService.setLoading(true);
        this.mode = FormMode.Update;
        this.postId = params.postId;

        this.postsService
          .getPost(params.postId)
          .subscribe(({ title, content, imageUrl }) => {
            this.form?.setValue({ title, content, image: imageUrl });
            this.loaderService.setLoading(false);
          });
      }
    });
  }

  savePost(postData: FormData) {
    if (this.mode === FormMode.Update && this.postId) {
      return this.postsService.updatePost(this.postId, postData);
    }

    return this.postsService.addPost(postData);
  }

  onSubmit() {
    if (!this.form?.invalid) {
      const { title, content, image } = this.form?.value || {};
      const postData = new FormData();

      postData.append('title', title);
      postData.append('content', content);
      postData.append('image', image);

      this.loaderService.setLoading(true);
      this.savePost(postData).subscribe(() => {
        this.loaderService.setLoading(false);
        this.router.navigate(['/']);
      });
    }
  }
}
