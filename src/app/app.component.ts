import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';

import { LoaderService } from './services/loader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  isLoading: boolean = false;

  constructor(
    public loaderService: LoaderService,
    private authService: AuthService,
    private cdref: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.authService.authenticate();
    this.loaderService.subscribe((isLoading) => {
      this.isLoading = isLoading;
      this.cdref.detectChanges();
    });
  }
}
