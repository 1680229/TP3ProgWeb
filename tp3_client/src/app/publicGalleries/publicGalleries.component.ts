import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { Gallery } from 'src/models/gallery';

const domain = "https://localhost:7003/"

@Component({
  selector: 'app-publicGalleries',
  templateUrl: './publicGalleries.component.html',
  styleUrls: ['./publicGalleries.component.css']
})
export class PublicGalleriesComponent implements OnInit {

  constructor(public http: HttpClient) { }
  galleryList: Gallery[] = [];

  ngOnInit() {
    this.getGalleries();
  }

  async getGalleries(): Promise<Gallery[]> {
    let token = localStorage.getItem("token");
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      })
    };
    this.galleryList = await lastValueFrom(this.http.get<Gallery[]>(domain + "api/Galleries/GetGalleries", httpOptions));
    console.log(this.galleryList)
    return this.galleryList;
  }

}
