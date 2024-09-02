import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  url = 'https://jsonplaceholder.typicode.com/users'

  constructor(private http: HttpClient) { }

  getAllUsers() {
    return this.http.get(this.url);
  }

  getUserById(id: number) {
    return this.http.get(`${this.url}/${id}`)
  }

  updateUser(id: number, body: any) {
    return this.http.post(`${this.url}/${id}`, body);
  }
}
