import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AppValidators } from 'src/app/helpers/validators';

@Component({
  selector: 'app-profile-form',
  templateUrl: './profile-form.component.html',
  styleUrls: ['../../../styles/form.css'],
})
export class ProfileFormComponent implements OnInit {
  form: FormGroup = this.fb.group({
    avatar: [
      null,
      {
        asyncValidators: AppValidators.mimeType,
      },
    ],
    fullName: [
      null,
      {
        validators: [Validators.required, Validators.maxLength(15)],
      },
    ],
    dateOfBirth: [null],
    country: [null],
    city: [],
  });

  constructor(private fb: FormBuilder) {}

  ngOnInit() {}

  onSubmit() {
    console.log(this.form.value);
  }
}
