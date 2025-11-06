import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable()
export class InterceptorHttp implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    const authToken = localStorage.getItem('token');

    if (authToken) {
      // Nous nous assurons d'utiliser le format standard pour un jeton Bearer
      const authRequest = request.clone({
        setHeaders: {
          Authorization: `Bearer ${authToken}`
        }
      });

      // Poursuivre la requête avec les nouveaux en-têtes
      return next.handle(authRequest);
    }
    if (request.url.includes('/uploads/')) {
      return next.handle(request); 
    }


    //Si aucun jeton n'est trouvé, poursuivre la requête originale.
    return next.handle(request);
  }
}
