import { Router, ActivatedRoute, Params } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { Comment } from '../../models/comment';
import { Topic } from '../../models/topic';
import { TopicService } from 'src/app/services/topic.service';
import { UserService } from 'src/app/services/user.service';
import { CommentService } from 'src/app/services/comment.service';


@Component({
  selector: 'app-topic-detail',
  templateUrl: './topic-detail.component.html',
  styleUrls: ['./topic-detail.component.css'],
  providers: [TopicService, UserService, CommentService]
})
export class TopicDetailComponent implements OnInit {

  public topic: Topic;
  public comment: Comment;
  public identity;
  public token;
  public status;

  constructor(
    private _topicService: TopicService,
    private _userService: UserService,
    private _commentService: CommentService,
    private _router: Router,
    private _route: ActivatedRoute
  ) {
    this.topic = new Topic('', '', '', '', '', '', '', '');
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.comment = new Comment('', '', '', this.identity._id);
  }

  ngOnInit(): void {
    this.getTopic();
  }

  onSubmit(form) {
    this._commentService.add(this.topic._id, this.token, this.comment).subscribe(
      response => {
        if (!response.topic) {
          this.status = 'error';
        } else {
          this.status = 'success';
          this.topic = response.topic;
          form.reset();
        }
      },
      error => {
        this.status = 'error';
        console.log(error);
      }
    );
  }

  deleteComment(id) {
    this._commentService.delete(this.token, this.topic._id, id).subscribe(
      response => {
        if (!response.topic) {
          this.status = 'error';
        } else {
          this.status = 'success';
          this.topic = response.topic;
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

      this._topicService.getTopicById(id).subscribe(
        response => {
          if (response.topic) {
            this.topic = response.topic;
          } else {
            this._router.navigate(['/home']);
          }
        },
        error => {
          console.log(error);
        }
      );
    });
  }
}
