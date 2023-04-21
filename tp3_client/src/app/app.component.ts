import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { User } from 'src/models/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  users: User[] = [];
  user?: undefined;
  constructor(public router: Router, public http: HttpClient) { }

  async getUsers(): Promise<void> {
    let x = await lastValueFrom(this.http.get<User[]>("https://localhost:7003/api/Users/GetUser"));
    console.log(x);
    this.users = x;
  }

  async getUser(id: number): Promise<void> {
    let x = await lastValueFrom(this.http.get<User>("https://localhost:7003/api/Users/GetUser" + id));
    console.log(x);
  }

  //  async postUser(inputName: string, inputPassword: string): Promise<void> {
  //    let newUser = new User(0, inputName, inputPassword);

  //    let x = await lastValueFrom(this.http.post<User>("https://localhost:7003/api/Users/PostUser", newUser));
  //    console.log(x);
  //  }
  logout() {
    localStorage.removeItem("token");
    this.router.navigate(['/login']);
  }
}
