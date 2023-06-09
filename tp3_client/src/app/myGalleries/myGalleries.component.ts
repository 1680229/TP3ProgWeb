import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { Gallery } from 'src/models/gallery';
import { User } from 'src/models/user';


const domain = "https://localhost:7003/"

@Component({
  selector: 'app-myGalleries',
  templateUrl: './myGalleries.component.html',
  styleUrls: ['./myGalleries.component.css']
})
export class MyGalleriesComponent implements OnInit {
  newGalleryName: string = "";
  // newGalleryCoverPicture: File 
  newGalleryIsPublic: boolean = true;
  newOwnerUsername: string = "";
  galleryList: Gallery[] = [];
  ownerList: User[] = [];

  gallerySelected: Gallery | undefined;

  constructor(public http: HttpClient) { }
  ngOnInit() {
    this.getMyGalleries();
  }

  //Sélectionner la galerie
  onItemClick(item: Gallery) {
    this.gallerySelected = item;
    console.log("Une nouvelle gallerie est sélectionnée")
  }

  //GetMyGalleries qui ne fonctionne pas à cause du token
  async getMyGalleries(): Promise<Gallery[]> {
    let token = localStorage.getItem("token");
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      })
    };
    let x = await lastValueFrom(this.http.get<Gallery[]>(domain + "api/Galleries/GetMyGalleries", httpOptions));
    this.galleryList = x;
    console.log(this.galleryList)
    return this.galleryList;
  }
  //Bouton publier
  async postGallery(): Promise<void> {
    let token = localStorage.getItem("token");
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      })
    };
    console.log(token);
    let newGallery = new Gallery(0, this.newGalleryName, this.newGalleryIsPublic, this.ownerList);
    let x = await lastValueFrom(this.http.post<Gallery>(domain + "api/Galleries/PostGallery", newGallery, httpOptions));
    console.log(x);
    this.newGalleryName = "";
  }

  //Associé à rien pour le moment, n'est qu'un template
  async putGallery(): Promise<void> {
    let token = localStorage.getItem("token");
    if (this.gallerySelected != undefined) {
      let updatedGallery = new Gallery(this.gallerySelected.id, this.gallerySelected.name, this.gallerySelected.isPublic, this.ownerList);
      let x = await lastValueFrom(this.http.put<Gallery>(domain + "/api/Galleries/PutGallery/" + this.gallerySelected.id, updatedGallery));
      console.log(x);
    }
  }

  //Bouton public
  async putPublicGallery(): Promise<void> {
    let token = localStorage.getItem("token");

    this.newGalleryIsPublic = true;
    if (this.gallerySelected != undefined) {
      let updatedGallery = new Gallery(this.gallerySelected.id, this.gallerySelected.name, this.newGalleryIsPublic, this.ownerList);
      let x = await lastValueFrom(this.http.put<Gallery>(domain + "/api/Galleries/PutGallery/" + this.gallerySelected.id, updatedGallery));
      console.log(x);
    }
  }

  //Bouton privé
  async putPrivateGallery(): Promise<void> {
    let token = localStorage.getItem("token");

    this.newGalleryIsPublic = false;
    if (this.gallerySelected != undefined) {
      let updatedGallery = new Gallery(this.gallerySelected.id, this.gallerySelected.name, this.newGalleryIsPublic, this.ownerList);
      let x = await lastValueFrom(this.http.put<Gallery>(domain + "/api/Galleries/PutGallery/" + this.gallerySelected.id, updatedGallery));
      console.log(x);
    }
  }
  //Bouton partager
  async partagerGallery(nom: string): Promise<void> {
    let token = localStorage.getItem("token");
    if (this.gallerySelected != undefined) {
      let updatedGallery = new Gallery(this.gallerySelected.id, this.gallerySelected.name, this.gallerySelected.isPublic, this.ownerList);
      let x = await lastValueFrom(this.http.put<Gallery>(domain + "/api/Galleries/PutGallery/" + this.gallerySelected.id, updatedGallery));
      console.log(x);
    }
  }
  //Bouton delete
  async deleteGallery(): Promise<void> {
    let token = localStorage.getItem("token");
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      })
    };
    if (this.gallerySelected != undefined) {
      let x = await lastValueFrom(this.http.delete<Gallery>(domain + "/api/Galleries/DeleteGallery/" + this.gallerySelected.id, httpOptions));
      console.log(x);
    }
  }
}
