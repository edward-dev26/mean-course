import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { LoaderService } from 'src/app/services/loader.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['../../../styles/form.css'],
})
export class SignUpComponent {
  form = this.fb.group({
    fullName: [
      null,
      {
        validators: [Validators.required, Validators.maxLength(15)],
      },
    ],
    email: [
      null,
      {
        validators: [Validators.required, Validators.email],
      },
    ],
    password: [null, Validators.required],
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
      this.authService.addUser(this.form.value).subscribe(
        () => {
          this.loaderService.setLoading(false);
          this.router.navigate(['/']);
        },
        ({ error }) => {
          Object.keys(error.fields).forEach((key) => {
            this.form.get(key)?.setErrors({ invalid: true });
          });
        }
      );
    }
  }
}
