import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/services/auth.service';
import { LoaderService } from 'src/app/services/loader.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['../../../styles/form.css'],
})
export class SignInComponent {
  form = this.fb.group({
    email: [
      null,
      {
        validators: [Validators.required, Validators.email],
      },
    ],
    password: [null, [Validators.required]],
  });

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private loaderService: LoaderService
  ) {}

  onSubmit() {
    if (this.form.valid) {
      this.loaderService.setLoading(true);
      this.authService.signIn(this.form.value).subscribe(
        () => {
          this.loaderService.setLoading(false);
          this.router.navigate(['/']);
        },
        () => {
          this.form.get('email')?.setErrors({ invalid: true });
          this.form.get('password')?.setErrors({ invalid: true });
        }
      );
    }
  }
}
