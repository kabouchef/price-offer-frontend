import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';
import {LoaderService} from '../services/loader/loader.service';


@Injectable({
  providedIn: 'root'
})

export class LoaderInterceptor implements HttpInterceptor {

  private urlExcept = [''];
  private extensionExcept = ['svg', 'png', 'jpg', 'jpeg'];

  constructor(private loaderService: LoaderService) {
  }

  /**
   * Interceptor when show request HTTP : show loader before a call,
   * And when a call is finish, hide loader.
   * @param req requete
   * @param next next
   * @return Observable<HttpEvent>
   */
  public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    this.showLoader(req.url);
    return next.handle(req).pipe(tap(
      (event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          this.hideLoader(req.url);
        }
      }
    ));
  }

  /**
   * Check if url and extension is valid for show loader
   * @param url get url
   */
  private showLoader(url: string): void {
    if (this.loaderIsAuthorize) {
      this.loaderService.showLoader();
    }
  }

  /**
   * Check if url and extension is valid for hide loader
   * @param url get url
   */
  private hideLoader(url): void {
    if (this.loaderIsAuthorize) {
      this.loaderService.hideLoader();
    }
  }

  private loaderIsAuthorize(url): boolean {
    return (
      !this.urlExcept.includes(url) &&
      !this.extensionExcept.includes(url.slice(-3))
    );
  }
}
