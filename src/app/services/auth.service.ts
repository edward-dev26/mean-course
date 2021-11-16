import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { IJwtToken, INewUserData, ISignInData, IUser } from 'src/interfaces';
import { IAuthResponse, IUserResponse } from 'src/interfaces/responses';
import { localStorageKeys } from '../constants/localStorageKeys';
import { transformUserResponse } from '../helpers/transformers';

const API_URL = `${environment.backendUrl}/api/users/`;

@Injectable({ providedIn: 'root' })
export class AuthService {
  private token: string = '';
  private user: IUser | null = null;
  private isAuthSubject = new Subject<boolean>();
  private _isAuth = false;

  constructor(public http: HttpClient) {}

  addUser(user: INewUserData) {
    return this.http
      .post<IAuthResponse>(API_URL, user)
      .pipe(map(this.mapTokenResponse), tap(this.handleToken.bind(this)));
  }

  signIn(data: ISignInData) {
    return this.http
      .post<IAuthResponse>(`${API_URL}login`, data)
      .pipe(map(this.mapTokenResponse), tap(this.handleToken.bind(this)));
  }

  authenticate() {
    const jwtToken = this.getSavedToken();

    if (jwtToken?.token && jwtToken?.expirationDate) {
      const isTokenValid = this.validateToken(jwtToken.expirationDate);

      if (isTokenValid) {
        this.setToken(jwtToken.token);
        this.http
          .get<IUserResponse>(`${API_URL}me`)
          .pipe(map(transformUserResponse))
          .subscribe((user) => {
            this.user = user;
          });
      }
    }
  }

  logout() {
    return this.http.delete(`${API_URL}logout`).pipe(
      tap(() => {
        this.token = '';
        this.user = null;
        this.isAuthSubject.next(false);
        this._isAuth = false;
        this.clearSavedToken();
      })
    );
  }

  getToken() {
    return this.token;
  }

  getAuthObservable() {
    return this.isAuthSubject.asObservable();
  }

  get isAuth() {
    return this._isAuth;
  }

  get me() {
    return this.user;
  }

  private mapTokenResponse({ jwtToken, user }: IAuthResponse) {
    return {
      jwtToken,
      user: transformUserResponse(user),
    };
  }

  private handleToken({
    jwtToken,
    user,
  }: {
    jwtToken: IJwtToken;
    user: IUser;
  }) {
    if (jwtToken?.token) {
      this.setToken(jwtToken.token);
      this.saveToken(jwtToken.token, +jwtToken.expiresIn);
      this.user = user;
    }
  }

  private setToken(token: string) {
    this.token = token;
    this.isAuthSubject.next(true);
    this._isAuth = true;
  }

  private saveToken(token: string, expiresIn: number) {
    const expirationDate = new Date(Date.now() + expiresIn * 1000);

    localStorage.setItem(localStorageKeys.token, token);
    localStorage.setItem(
      localStorageKeys.expirationDate,
      expirationDate.toISOString()
    );
  }

  private getSavedToken() {
    const token = localStorage.getItem(localStorageKeys.token);
    const expirationDate = localStorage.getItem(
      localStorageKeys.expirationDate
    );

    if (!token || !expirationDate) {
      return null;
    }

    return {
      token: localStorage.getItem(localStorageKeys.token),
      expirationDate: new Date(expirationDate),
    };
  }

  private clearSavedToken() {
    localStorage.removeItem(localStorageKeys.token);
    localStorage.removeItem(localStorageKeys.expirationDate);
  }

  private validateToken(expirationDate: Date) {
    return Date.now() < expirationDate.getTime();
  }
}
