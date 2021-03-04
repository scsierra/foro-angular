import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { User } from '../../models/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [UserService]
})
export class LoginComponent implements OnInit {

  public page_title: string;
  public user: User;
  public status: string;
  public identity;
  public token;

  constructor(
    private _userService: UserService,
    private _router: Router,
    private _route: ActivatedRoute
  ) {
    this.page_title = 'Inicia Sesión';
    this.user = new User('', '', '', '', '', '', 'ROLE_USER');
  }

  ngOnInit(): void {
    this.logout();
  }

  onSubmit(form) {
    this._userService.signUp(this.user).subscribe(
      response => {
        if (response.user && response.user._id) {
          this.identity = response.user;
          //Cargar token
          this._userService.signUp(this.user, true).subscribe(
            response => {
              if (response.token) {
                this.token = response.token;
                //Guarda los datos en la url
                localStorage.setItem('identity', JSON.stringify(this.identity));
                localStorage.setItem('token', this.token);
                this.status = 'success';
                this._router.navigate(['/home']);
              } else {
                this.status = 'error';
              }
            },
            error => {
              this.status = 'error';
              console.log(error);
            }
          );
        } else {
          this.status = 'error';
        }
      },
      error => {
        this.status = 'error';
        console.log(error);
      }
    );
  }

  logout() {
    this._route.params.subscribe(params => {
      let logout = +params['id'];
      if (logout == 1) {
        localStorage.removeItem('identity');
        localStorage.removeItem('token');

        this.identity = null;
        this.token = null;

        this._router.navigate(['login']);
      }
    });
  }

}
