import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { global } from '../../services/global';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
  providers: [UserService]
})
export class UsersComponent implements OnInit {

  public page_title: string;
  public users: User[];
  public url;
  public status;

  constructor(
    private _userService: UserService
  ) {
    this.page_title = 'Compañeros';
    this.url = global.url;
  }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers() {
    this._userService.getUsers().subscribe(
      response => {
        if (response.users) {
          this.users = response.users;
        }
      },
      error => {
        this.status = 'error';
        console.log(error);
      }
    );
  }

}
