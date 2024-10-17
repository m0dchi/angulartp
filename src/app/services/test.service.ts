import { Injectable } from "@angular/core"
import { Observable, ObservedValuesFromArray } from "rxjs"
import { HttpClient } from "@angular/common/http"
import { Phone } from "../models/phones"

@Injectable({
  providedIn: "root"
})
export class TestService {
  private url = "https://api.restful-api.dev/objects"

  constructor(private http: HttpClient) { }

  getAll(): Observable<any> {
    return this.http.get(this.url);
  }

  save(phone: Phone): Observable<any> {
    return this.http.post(this.url, phone)
  }

  delete(id: string): Observable<any> {
    return this.http.delete(this.url + "/" + id)
  }

  update(phone: Phone): Observable<any> {
    return this.http.put(this.url + "/" + phone.id, phone)
  }

}
