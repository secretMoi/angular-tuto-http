import {Injectable} from "@angular/core";
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable()
export class AuthInterceptorService implements HttpInterceptor{
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log('Request intercepted');

    const modifiedRequest = req.clone({headers : req.headers.append('Auth', 'xyz')}); // clone car la req est immutable

    return next.handle(modifiedRequest);
  }

}
