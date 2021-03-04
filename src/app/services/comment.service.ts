import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { global } from './global';

@Injectable()
export class CommentService {

    public url: string;

    constructor(
        private _http: HttpClient
    ) {
        this.url = global.url;
    }

    add(id, token, comment): Observable<any> {
        //Convertir a json
        let params = JSON.stringify(comment);
        //Definir cabeceras
        let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', token);
        //Petición ajax
        return this._http.post(this.url + 'comment/topic/' + id, params, { headers: headers });
    }

    delete(token, topicId, commentId): Observable<any> {
        //Definir cabeceras
        let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', token);
        //Petición ajax
        return this._http.delete(this.url + 'comment/' + topicId + "/" + commentId, { headers: headers });
    }
}