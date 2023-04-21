import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { RegisterDTO } from 'src/models/registerDTO';

const domain = "https://localhost:7003/"

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerUsername: string = "";
  registerEmail: string = "";
  registerPassword: string = "";
  registerPasswordConfirm: string = "";


  constructor(public router: Router, public http: HttpClient) { }

  ngOnInit() {
  }

  async register(): Promise<void> {

    let registerDTO = new RegisterDTO(
      this.registerUsername,
      this.registerEmail,
      this.registerPassword,
      this.registerPasswordConfirm
    );
    console.log(registerDTO);
    let x = await lastValueFrom(this.http.post<RegisterDTO>(domain + "api/Users/Register/", registerDTO));
    console.log(x);
    // Aller vers la page de connexion

    this.router.navigate(['/login']);
  }
}
