import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { global } from './global';
import { User } from '../models/user';

@Injectable()
export class UserService {

    public url: string;
    public identity;
    public token;

    constructor(
        private _http: HttpClient
    ) {
        this.url = global.url
    }

    prueba() {
        return "Servicio usuario";
    }

    register(user): Observable<any> {
        //Convertir a json
        let params = JSON.stringify(user);
        //Definir cabeceras
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        //Petición ajax
        return this._http.post(this.url + 'register', params, { headers: headers });
    }

    signUp(user, getToken = null): Observable<any> {
        //Comprobar getToken
        if (getToken != null) {
            user.getToken = getToken;
        }
        //Convertir a json
        let params = JSON.stringify(user);
        //Definir cabeceras
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        //Petición ajax
        return this._http.post(this.url + 'login', params, { headers: headers });
    }

    update(user): Observable<any> {
        //Convertir a json
        let params = JSON.stringify(user);
        //Definir cabeceras
        let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', this.getToken());
        //Petición ajax
        return this._http.put(this.url + 'update', params, { headers: headers });
    }

    getUsers(): Observable<any> {
        //Petición ajax
        return this._http.get(this.url + 'users');
    }

    getUser(id): Observable<any> {
        //Petición ajax
        return this._http.get(this.url + 'user/' + id);
    }

    getIdentity() {
        let identity = JSON.parse(localStorage.getItem('identity'));
        if (identity && identity != null && identity != undefined) {
            this.identity = identity;
        } else {
            this.identity = null;
        }
        return this.identity;
    }

    getToken() {
        let token = localStorage.getItem('token');
        if (token && token != null && token != undefined) {
            this.token = token;
        } else {
            this.token = null;
        }
        return this.token;
    }

}