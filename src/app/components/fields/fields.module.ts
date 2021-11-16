import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MatModule } from '../../mat.module';
import { FileUploadComponent } from './file-upload/file-upload.component';

@NgModule({
  declarations: [FileUploadComponent],
  imports: [CommonModule, MatModule],
  exports: [FileUploadComponent],
})
export class FieldsModule {}
