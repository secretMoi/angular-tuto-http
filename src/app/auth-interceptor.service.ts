import {Injectable} from "@angular/core";
import {HttpEvent, HttpEventType, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";
import {tap} from "rxjs/operators";

@Injectable()
export class AuthInterceptorService implements HttpInterceptor{
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log('Request intercepted');

    const modifiedRequest = req.clone({headers : req.headers.append('Auth', 'xyz')}); // clone car la req est immutable

    return next.handle(modifiedRequest).pipe(tap(event => {
      // intercepte la réponse
      console.log(event);
      if(event.type === HttpEventType.Response) {
        console.log('Response arrived, body data :');
        console.log(event.body);
      }
    }));
  }

}
