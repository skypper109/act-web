import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Association } from '../models/association';

@Injectable({
  providedIn: 'root'
})
export class Data {


  // header!:HttpHeaders ;
  header = new HttpHeaders()
    .set('Content-Type', 'application/json')
    .set('Accept', 'application/json')
    .set('Access-Control-Allow-Origin', '*')
    .set('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  // static http: HttpClient = new HttpClient;

  constructor(private http:HttpClient) {
    this.header = new HttpHeaders();
    this.header.append('Content-Type', 'application/json');
    this.header.append('Accept', 'application/json');
    this.header.append('Access-Control-Allow-Origin', '*');
    this.header.append('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  }

  getData(url: string) {
    return this.http.get(url, { headers: this.header });
  }

  getDataById(url: string, id: number) {
    return this.http.get(`${url}${id}`, { headers: this.header });
  }

  postData(url: string, body: any) {
    return this.http.post(url, body, { headers: this.header });
  }


  postDataWithFile(url: string, body: any,file:File) {
    const formData = new FormData();
    formData.append('contenu', new Blob([JSON.stringify(body)], {
      type: 'application/json'
    }));
    if (file) {
      formData.append('fichier', file);
    }
    return this.http.post(`${url}`, formData);
  }

  putData(url: string, id: number, body: any,attribut:any) {
    const formData = new FormData();
    formData.append(attribut, new Blob([JSON.stringify(body)], {
      type: 'application/json'
    }));
    return this.http.put(`${url}${id}`, formData, { headers: this.header });
  }

  putDataWithFile(url: string, id: number, body: any,file:File) {
    const formData = new FormData();
    formData.append('contenu', new Blob([JSON.stringify(body)], {
      type: 'application/json'
    }));
    if (file) {
      formData.append('fichier', file);
    }
    return this.http.put(`${url}${id}`, formData);
  }

  deleteData(url: string, id: number) {
    return this.http.delete(`${url}${id}`, { headers: this.header });
  }
}
