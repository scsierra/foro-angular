import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Topic } from 'src/app/models/topic';
import { User } from 'src/app/models/user';
import { TopicService } from 'src/app/services/topic.service';
import { UserService } from 'src/app/services/user.service';
import { global } from '../../services/global';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  providers: [UserService, TopicService]
})
export class ProfileComponent implements OnInit {

  public page_title: string;
  public user: User;
  public topics: Topic[];
  public url;
  public status;

  constructor(
    private _userService: UserService,
    private _topicService: TopicService,
    private _router: Router,
    private _route: ActivatedRoute
  ) {
    this.url = global.url;
  }

  ngOnInit(): void {
    this._route.params.subscribe(params => {
      var id = params['id'];

      if (id || id != null || id != undefined) {
        this.getUser(id);
        this.getTopics(id);
      }
    });
  }

  getUser(id) {
    this._userService.getUser(id).subscribe(
      response => {
        if (response.user) {
          this.status = 'success'
          this.user = response.user;
        } else {

        }
      },
      error => {
        this.status = 'error';
        console.log(error);
      }
    );

  }

  getTopics(id) {
    this._topicService.getMyTopics(id).subscribe(
      response => {
        if (response.topics) {
          this.status = 'success';
          this.topics = response.topics;
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

}
