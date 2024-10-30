import { Injectable } from "@angular/core"
import { Observable, ObservedValuesFromArray } from "rxjs"
import { HttpClient } from "@angular/common/http"
import { Phone } from "../models/phones"
import { map } from "rxjs/operators"

@Injectable({
  providedIn: "root"
})
export class TestService {
  private url = "https://api.restful-api.dev/objects"
  private localPhones = new Map<string, Phone>()

  constructor(private http: HttpClient) { }

  getAll(): Observable<any> {
    return this.http.get(this.url).pipe(
      map((response: any) => {
        const apiPhones = response as Phone[];
        const localPhonesArray = Array.from(this.localPhones.values());
        return [...apiPhones, ...localPhonesArray];
      })
    );
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