import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { LoginDTO } from 'src/models/loginDTO';
import { User } from 'src/models/user';

const domain = "https://localhost:7003/"

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginUsername: string = "";
  loginPassword: string = "";

  constructor(public router: Router, public http: HttpClient) { }

  ngOnInit() {
  }

  async login(): Promise<void> {
    let loginDTO = new LoginDTO(this.loginUsername, this.loginPassword);
    let x = await lastValueFrom(this.http.post<any>(domain + "api/Users/Login", loginDTO))
    localStorage.setItem("token", x.token);
    console.log(x.token);
    // Retourner à la page d'accueil
    this.router.navigate(['/publicGalleries']);
  }

}
