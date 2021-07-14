import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class UsuarioService {

  private url = "https://prueba-tecnica-luisa-oviedo.herokuapp.com/usuario";

  constructor(private http: HttpClient) {
  }

  public get(): Observable<any> {
    return this.http.get<any>(this.url);
  }
}
