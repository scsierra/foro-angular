import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { global } from './global';

@Injectable()
export class TopicService {

    public url: string;
    public identity;
    public token;

    constructor(
        private _http: HttpClient
    ) {
        this.url = global.url;
    }

    prueba() {
        return "Servicio Topic";
    }

    addTopic(token, topic): Observable<any> {
        //Convertir a json
        let params = JSON.stringify(topic);
        //Definir cabeceras
        let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', token);
        //Petición ajax
        return this._http.post(this.url + 'topic', params, { headers: headers });
    }

    getMyTopics(userId): Observable<any> {
        //Definir cabeceras
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        //Petición ajax
        return this._http.get(this.url + 'topics/user/' + userId, { headers: headers });
    }


    getTopic(id): Observable<any> {
        //Petición ajax
        return this._http.get(this.url + 'topic/' + id);
    }

    update(token, id, topic): Observable<any> {
        //Convertir a json
        let params = JSON.stringify(topic);
        //Definir cabeceras
        let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', token);
        //Petición ajax
        return this._http.put(this.url + 'topic/' + id, params, { headers: headers });
    }

    delete(token, id): Observable<any> {
        //Definir cabeceras
        let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', token);
        //Petición ajax
        return this._http.delete(this.url + 'topic/' + id, { headers: headers });
    }

    search(text): Observable<any> {
        //Petición ajax
        return this._http.get(this.url + 'search/' + text);
    }

    getTopics(page = 1): Observable<any> {
        //Petición ajax
        return this._http.get(this.url + 'topics/' + page);
    }

    getTopicById(id): Observable<any> {
        //Petición ajax
        return this._http.get(this.url + 'topic/' + id);
    }

}