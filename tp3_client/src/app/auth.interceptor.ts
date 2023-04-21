import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor() { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (request.url != "https://localhost:7003/api/Users/Register") {
      request = request.clone({
        setHeaders: {
          'Content-type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem("authKey")
        }
      })
    }
    let url: URL = new URL(request.url);
    console.log(url);
    return next.handle(request);
  }
}
