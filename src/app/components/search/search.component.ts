import { Router, ActivatedRoute, Params } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { Topic } from '../../models/topic';
import { TopicService } from 'src/app/services/topic.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  providers: [TopicService]
})
export class SearchComponent implements OnInit {

  public page_title: string;
  public topics: Topic;
  public status;

  constructor(
    private _topicService: TopicService,
    private _router: Router,
    private _route: ActivatedRoute
  ) {
    this.page_title = 'Busqueda';
  }

  ngOnInit(): void {
    this._route.params.subscribe(params => {
      var search = params['text'];
      this.page_title = this.page_title + ': ' + search;
      this.getTopics(search);
    });
  }

  getTopics(search) {
    this._topicService.search(search).subscribe(
      response => {
        if (response.topic) {
          this.status = 'success';
          this.topics = response.topic;
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
