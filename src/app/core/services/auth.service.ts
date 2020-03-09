import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isAuth = false;
  private URI = '/api/v1/';

  constructor(private http: HttpClient) {
  }

  signIn() {
    return new Promise(
      (resolve, reject) => {
        setTimeout(
          () => {
            this.isAuth = true;
            resolve(true);
          }, 2000
        );
      }
    );
  }

  signOut() {
    this.isAuth = false;
  }

  getAccessRight(idLDAP, passLDAP) {
    const url = 'authentification?idLDAP=' + idLDAP;
    console.log(url);
    return this.http.get<any>(this.URI + url).pipe(
      map((el) => {
        this.isAuth = el.accessRight;
        return el;
      }));
  }
}
