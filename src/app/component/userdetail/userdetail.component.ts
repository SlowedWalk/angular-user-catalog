import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import * as Leaflet from 'leaflet';
import {UserService} from "../../service/user.service";
import {User} from "../../models/user.model";
import {Coordiante} from "../../models/coordinate.model";

@Component({
  selector: 'app-userdetail',
  templateUrl: './userdetail.component.html',
  styleUrls: ['./userdetail.component.css']
})
export class UserdetailComponent implements OnInit {
  user: User;
  mode: 'edit' | 'locked' = 'locked';
  buttonText: string = 'Edit';
  marker = new Leaflet.Icon({
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-icon.png',
    iconSize: [32, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, 34],
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    shadowSize: [41, 41]
  });

  constructor(private activatedRoute: ActivatedRoute, private userService: UserService) {}

  ngOnInit(): void {
    this.user = (<User>(this.activatedRoute.snapshot.data['resolvedResponse'].results[0]));
    console.log(this.user);
    this.loadMap(this.user.coordinate)
    // this.activatedRoute.paramMap.subscribe((params: ParamMap) => {
    //   console.log("ID", params.get('uuid')!);
    //   this.userService.getUser(params.get('uuid')!).subscribe(
    //     (response: any) => {
    //       console.log(response);
    //       this.response = response;
    //     }
    //   );
    // });
  }

  changeMode(mode?: 'edit' | 'locked'): void {
    console.log(mode);
    this.mode = this.mode === 'locked' ? 'edit' : 'locked';
    this.buttonText = this.buttonText === 'Edit' ? 'Save Change' : 'Edit';
    if(mode == 'edit') {
      // Logic to update the user on the back end
      console.log('Updating user on the backend')
    }
  }

  private loadMap(coordinate: Coordiante): void {
    const map = Leaflet.map('map', {
      center: [coordinate.latitude, coordinate.latitude],
      zoom: 8
    });

    const mainLayer = Leaflet.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      tileSize: 512,
      zoomOffset: -1,
      minZoom: 1,
      maxZoom: 30,
      crossOrigin: true,
      attribution: "&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
    });
    mainLayer.addTo(map);
    const marker = Leaflet.marker([coordinate.latitude, coordinate.longitude], { icon: this.marker });
    marker.addTo(map).bindPopup(`${this.user.firstName}'s Location`).openPopup();
  }
}
