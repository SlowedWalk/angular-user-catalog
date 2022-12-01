import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {Response} from "../models/response.model";
import {UserService} from "../service/user.service";

@Injectable({
  providedIn: 'root'
})
export class UserResolver implements Resolve<Response> {
  constructor(private userService: UserService) {
  }
  resolve(route: ActivatedRouteSnapshot, _: RouterStateSnapshot): Observable<Response> {
    return this.userService.getUser(route.paramMap.get('uuid')!);
  }
}
