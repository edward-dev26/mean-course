import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { MatModule } from 'src/app/mat.module';
import { FieldsModule } from '../fields/fields.module';
import { ProfileFormComponent } from './profile-form/profile-form.component';

@NgModule({
  declarations: [ProfileFormComponent],
  imports: [
    CommonModule,
    FieldsModule,
    RouterModule,
    MatModule,
    ReactiveFormsModule,
  ],
  exports: [ProfileFormComponent],
})
export class ProfileModule {}
