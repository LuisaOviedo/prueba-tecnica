import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';

@Injectable()
export class TarjetaService {

  private url = "http://localhost:8080/actividad";

  constructor(private http: HttpClient) {
  }

  public get(): Observable<any> {
    return this.http.get<any>(this.url);
  }

  public post(body: any): Observable<any> {
    return this.http.post<any>(this.url, body);

  }

  public delete(id: string): Observable<void> {
    return this.http.delete<void>(this.url + '/' + id);
  }
}
