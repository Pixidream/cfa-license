import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders(
    {
      'Content-Type': 'application/json',
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PATCH",
      "Access-Control-Allow-Headers": "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With"
    }
  ),
  status: 200,
  resonseType: "json"
}

@Injectable({
  providedIn: 'root'
})
export class AppareilService {
  private _appareilsUrl: string = 'https://appareils-cfa-default-rtdb.europe-west1.firebasedatabase.app/appareils'

  constructor(private http: HttpClient) { }

  getAppareils(): Observable<object> {
    return this.http.get(this._appareilsUrl + ".json", httpOptions);
  }

  addAppareil(appareil) {
    return this.http.post(this._appareilsUrl + ".json", appareil)
  }

  allumerUnAppareil(id) {
    return this.http.patch(`${this._appareilsUrl}/${id}.json`, { status: "allumé" }, httpOptions)
  }

  supprimerUnAppareil(id) {
    return this.http.delete(`${this._appareilsUrl}/${id}.json`, httpOptions)
  }

  modifierUnAppareil(data) {
    return this.http.patch(`${this._appareilsUrl}/${data.id}.json`, { name: data.name }, httpOptions)
  }

  eteindreUnAppareil(id) {
    return this.http.patch(`${this._appareilsUrl}/${id}.json`, { status: "éteint" }, httpOptions)
  }
}
