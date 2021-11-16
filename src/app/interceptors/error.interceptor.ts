import {
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ErrorComponent } from '../components/error/error.component';
import { LoaderService } from '../services/loader.service';

const DEFAULT_ERROR_MESSAGE = 'An unknown error ocurred!';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(
    private snackBar: MatSnackBar,
    private loaderService: LoaderService
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return next.handle(req).pipe(
      catchError((error) => {
        this.loaderService.setLoading(false);
        this.snackBar.openFromComponent(ErrorComponent, {
          duration: 6000,
          verticalPosition: 'top',
          panelClass: 'alert-container',
          data: {
            message: error.error.message || DEFAULT_ERROR_MESSAGE,
          },
        });

        return throwError(error);
      })
    );
  }
}
