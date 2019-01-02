import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import { tap } from 'rxjs/operators';
import { TokenService } from './token.service';

export class AuthenticatedHttpService implements HttpInterceptor {
  constructor(public tokenService: TokenService) {}
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      tap(event => {
        // There may be other events besides the response.
        if (event instanceof HttpErrorResponse) {
          if (event.status === 401) {
            this.tokenService.clear();
            window.location.href = '/';
          }
        }
      })
    );
  }
}
