import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { Topic } from '../../../models/topic';
import { UserService } from '../../../services/user.service';
import { TopicService } from '../../../services/topic.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
  providers: [UserService, TopicService]
})
export class EditComponent implements OnInit {

  public page_title: string;
  public topic: Topic;
  public identity;
  public token;
  public status;

  constructor(
    private _userService: UserService,
    private _topicService: TopicService,
    private _router: Router,
    private _route: ActivatedRoute
  ) {
    this.page_title = 'Editar tema';
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.topic = new Topic('', '', '', '', '', '', this.identity._id, null);
  }

  ngOnInit(): void {
    this.getTopic();
  }

  onSubmit(form) {
    var idTopic = this.topic._id;
    this._topicService.update(this.token, idTopic, this.topic).subscribe(
      response => {
        if (response.topic) {
          this.status = 'success';
          this.topic = response.topic;
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

  getTopic() {
    this._route.params.subscribe(params => {
      let id = params['id'];
      this._topicService.getTopic(id).subscribe(
        response => {
          if (!response.topic) {
            this._router.navigate(['/panel']);
          } else {
            this.topic = response.topic;
          }
        },
        error => {
          this.status = 'error';
          console.log(error);
        }
      );
    });
  }

}
