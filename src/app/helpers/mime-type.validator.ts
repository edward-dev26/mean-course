import { AbstractControl } from '@angular/forms';
import { Observable, of } from 'rxjs';

const getFileHeader = (arr: Uint8Array) => {
  let header = '';

  for (let i = 0; i < arr.length; i++) {
    header += arr[i].toString(16);
  }

  return header;
};

const validateMimeType = (buffer: any) => {
  const arr = new Uint8Array(buffer).subarray(0, 4);
  const header = getFileHeader(arr);
  let isValid = false;

  switch (header) {
    case '89504e47':
      isValid = true;
      break;
    case 'ffd8ffe0':
    case 'ffd8ffe1':
    case 'ffd8ffe2':
    case 'ffd8ffe3':
    case 'ffd8ffe8':
      isValid = true;
      break;
    default:
      isValid = false;
      break;
  }

  return isValid;
};

export const mimeTypeValidator = (
  control: AbstractControl
): Observable<{ [key: string]: any } | null> => {
  if (!(control.value instanceof File)) return of(null);

  return new Observable((subscriber) => {
    const fileReader = new FileReader();

    fileReader.addEventListener('loadend', () => {
      const isValid = validateMimeType(fileReader.result);
      const result = !isValid ? { invalidMimeType: true } : null;

      subscriber.next(result);
      subscriber.complete();
    });

    fileReader.readAsArrayBuffer(control.value);
  });
};
