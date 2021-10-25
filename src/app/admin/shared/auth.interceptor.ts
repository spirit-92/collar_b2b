import {Injectable} from "@angular/core";
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {Router} from "@angular/router";
import {catchError, tap} from "rxjs/operators";
import {AuthService} from "./services/auth.service";

// @ts-ignore
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private auth: AuthService,
    private router: Router
  ) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log("CLONE intercept not auth")
    if (this.auth.isAuthenticated()) {
      console.log("CLONE intercept")
      req = req.clone({
        headers:req.headers.append('Authorization',this.auth.token)
      })
    }
    return next.handle(req)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          console.log(error)
          if (error.status === 401) {
            this.auth.logout()
            console.log("error logout status 401")
            this.router.navigate(['/account','user','login'], {
              queryParams: {
                authFailed: true
              }
            })
          }
          return throwError(error)
        })
      )
  }

}

