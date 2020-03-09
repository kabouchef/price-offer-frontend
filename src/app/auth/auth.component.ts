import {Component, Input, OnInit} from '@angular/core';
import { AuthService } from '../core/services/auth.service';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  authStatus = false;
  public userProfil;
  @Input() public idLDAP;
  @Input() public passLDAP;
  public defaultPassword = 'ler123';
  public firstName = '';
  public lastName = '';

  constructor(private authService: AuthService,
              private router: Router,
              private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.authStatus = this.authService.isAuth;
  }

  onSignIn() {
    this.authService.getAccessRight(this.idLDAP, this.passLDAP).subscribe(
    el => {
      this.userProfil = el;
      if (this.passLDAP === this.defaultPassword) {
        this.authStatus = this.userProfil.accessRight;
      }
      this.firstName = this.userProfil.firstName;
      this.lastName = this.userProfil.lastName;
      this.router.navigate(['simulation-extractor']);
      this.openSnackBar('Bienvenue',
        this.firstName + ' ' + this.lastName);
      console.log('Sign in successful!');
    });

  }

  onSignOut() {
    this.authService.signOut();
    this.authStatus = this.authService.isAuth;
  }

  openSnackBar(firstName: string, lastName: string) {
    this.snackBar.open(firstName, lastName, {
      duration: 2000,
    });
  }

}
