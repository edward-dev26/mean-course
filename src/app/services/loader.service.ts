import { Injectable, OnDestroy } from '@angular/core';
import { Subject, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoaderService implements OnDestroy {
  private isLoading = new Subject<boolean>();
  private subscriptions: Array<Subscription> = [];

  subscribe(observer: (value: boolean) => void) {
    const sup = this.isLoading.subscribe(observer);

    this.subscriptions.push(sup);
  }

  setLoading(isLoading: boolean) {
    this.isLoading.next(isLoading);
  }

  get isLoading$() {
    return this.isLoading.asObservable();
  }

  ngOnDestroy() {
    this.subscriptions.forEach((sup) => {
      sup.unsubscribe();
    });
  }
}
