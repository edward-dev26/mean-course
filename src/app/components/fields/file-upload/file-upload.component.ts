import { Component, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { toBase64 } from 'src/app/utils/toBase64';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: FileUploadComponent,
    },
  ],
})
export class FileUploadComponent implements ControlValueAccessor {
  public preview: string | null = null;
  private touched = false;
  public disabled = false;

  @Input() isInvalidMimeType?: boolean;

  onChange(file: File) {}

  onTouched() {}

  registerOnChange(fn: (file: File) => void) {
    this.onChange = fn;
  }
  registerOnTouched(fn: () => void) {
    this.onTouched = fn;
  }

  writeValue(value: File) {
    this.getPreview(value);
  }

  setDisabledState(disabled: boolean) {
    this.disabled = disabled;
  }

  onFileChange(e: Event) {
    if (!this.disabled) {
      const file = (e.target as HTMLInputElement).files![0];

      this.getPreview(file);
      this.onChange(file);
    }
  }

  markAsTouched() {
    if (!this.touched) {
      this.onTouched();
      this.touched = true;
    }
  }

  getPreview(file: File | string) {
    if (file && file instanceof File) {
      toBase64(file).subscribe((preview) => {
        this.preview = preview;
      });
    } else {
      this.preview = file;
    }
  }
}
