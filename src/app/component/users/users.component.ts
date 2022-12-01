// @ts-ignore
import {Component, OnInit} from '@angular/core';
import {UserService} from "../../service/user.service";
import {Response} from "../../models/response.model";

// @ts-ignore
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent  implements OnInit {
  response: Response;
  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getUsers(15).subscribe(
      (result: Response) => {
        console.log(result);
        this.response = result;
      }
    )
  }

}
