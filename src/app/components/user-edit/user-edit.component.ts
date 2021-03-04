import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { User } from '../../models/user';
import { global } from '../../services/global';


@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css'],
  providers: [UserService]
})
export class UserEditComponent implements OnInit {

  public page_title: string;
  public user: User;
  public identity;
  public token;
  public status;
  public afuConfig;

  constructor(
    private _userService: UserService,
    private _router: Router,
    private route: ActivatedRoute
  ) {
    this.page_title = 'Datos de usuario';
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.user = this.identity;
    this.loadAfuConfig();
  }

  ngOnInit(): void { }

  onSubmit(form) {
    this._userService.update(this.user).subscribe(
      response => {
        console.log(response);
        if (response.userUpdate) {
          if (response.userUpdate.name) {
            this.user.name = response.userUpdate.name;
          }
          if (response.userUpdate.surname) {
            this.user.surname = response.userUpdate.surname;
          }
          if (response.userUpdate.email) {
            this.user.email = response.userUpdate.email
          }
          this.status = 'success'
          this.identity = this.user;
          localStorage.setItem('identity', JSON.stringify(this.identity));
        } else {
          this.status = 'error'
        }
      },
      error => {
        this.status = 'error';
        console.log(error);
      }
    );
  }

  loadAfuConfig() {
    this.afuConfig = {
      multiple: false,
      formatsAllowed: ".jpg,.png,.gif,.jpeg",
      maxSize: "50",
      uploadAPI: {
        url: global.url + 'upload-avatar',
        method: "POST",
        headers: {
          "Authorization": this.token
        },
        responseType: 'json',
      },
      theme: "attachPin",
      hideProgressBar: false,
      hideResetBtn: true,
      hideSelectBtn: false,
      fileNameIndex: true,
      attachPinText: 'Sube tu avatar de usuario'
    }
  }

  avatarUpload(image) {
    let data = image.body.user.image;

    this.user.image = data;
    this.identity.image = data;
  }

}
