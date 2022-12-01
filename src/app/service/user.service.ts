import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {Response} from "../models/response.model";
import {User} from "../models/user.model";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly apiUrl: string = 'https://randomuser.me/api'

  constructor(private http: HttpClient) { }

  // Fetch Users
  getUsers(size: number = 10): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/?results=${size}`).pipe(
      map(response => this.processResponse(response))
    );
  }

  // Fetch one user using UUID.
  getUser(uuid: String): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/?uuid=${uuid}`).pipe(
      map(response => this.processResponse(response))
    );
  }

  //
  private processResponse(response: Response): Response {
    return {
      info: { ...response.info },
      results: response.results.map((user: any) => (<User>{
        uuid: user.login.uuid,
        firstName: user.name.first,
        lastName: user.name.last,
        email: user.email,
        username: user.login.username,
        gender: user.gender,
        address: `${user.location.street.number} ${user.location.city} ${user.location.city}`,
        dateOfBirth: user.dob.date,
        phone: user.phone,
        imageUrl: user.picture.medium,
        coordinate: { latitude: +user.location.coordinates.latitude,  longitude: +user.location.coordinates.longitude},
      }))
    };
  }
}
