import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  private loaderSubject = new BehaviorSubject(0);

  /**
   * Increment value for each call http
   * The loader is display when value > 0
   */
  public showLoader() {
    const increment = this.loaderSubject.getValue() + 1;
    this.loaderSubject.next(increment);
  }

  /**
   * Decrement value when end of call http
   * The loader is hide when value === 0
   */
  public hideLoader() {
    const decrement = this.loaderSubject.getValue() - 1;
    this.loaderSubject.next(decrement);
  }

  public getLoader() {
    return this.loaderSubject.asObservable();
  }
}
