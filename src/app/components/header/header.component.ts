import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { LoaderService } from 'src/app/services/loader.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  isAuth = false;
  private sup?: Subscription;

  constructor(
    public authService: AuthService,
    public loaderService: LoaderService,
    public router: Router
  ) {}

  ngOnInit() {
    this.isAuth = this.authService.isAuth;
    this.sup = this.authService.getAuthObservable().subscribe((isAuth) => {
      this.isAuth = isAuth;
    });
  }

  ngOnDestroy() {
    this.sup?.unsubscribe();
  }

  onLogout() {
    this.loaderService.setLoading(true);
    this.authService.logout().subscribe(() => {
      this.loaderService.setLoading(false);
      this.router.navigate(['/']);
    });
  }
}
