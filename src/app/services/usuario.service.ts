import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class UsuarioService {

  private url = "http://localhost:8080/usuario";

  constructor(private http: HttpClient) {
  }

  public get(): Observable<any> {
    return this.http.get<any>(this.url);
  }
}
