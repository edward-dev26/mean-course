import { Observable } from 'rxjs';

export const toBase64 = (file: File): Observable<string> => {
  return new Observable((subscriber) => {
    const reader = new FileReader();

    reader.onload = () => {
      subscriber.next(reader.result as string);
    };

    reader.readAsDataURL(file);
  });
};
