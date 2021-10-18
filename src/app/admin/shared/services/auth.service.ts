import {Injectable} from "@angular/core";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {User} from "../../../shared/interfaces";
import {Observable, throwError} from "rxjs";
import {environment} from "../../../../environments/environment";
import {catchError, tap} from "rxjs/operators";

@Injectable()
export class AuthService {
  constructor(
    private http: HttpClient
  ) {
  }

  get token(): string {
    const expDate = localStorage.getItem('b2b_token-exp')
    console.log(expDate,+expDate ,Math.round(new Date().getTime() / 1000))
    if (+expDate < Math.round(new Date().getTime() / 1000 ) && +expDate !== 0){
      console.log('logout')
      this.logout()
      return  null
    }
    console.log('get')
    return localStorage.getItem('b2b_token')
  }

  login(user: any): Observable<any> {
    console.log(user,'service user')
    return this.http.post(`${environment.host}index.php?route=api/login`, user).pipe(
      tap(this.setToken),

    )
  }
  registration(user):Observable<any>{

    return this.http.post(`${environment.host}index.php?route=api/register`, user).pipe(
      tap(this.setToken),

    )
  }
  logout() {
    this.setToken(null)
    localStorage.clear()
  }

  isAuthenticated(): boolean {
    return !! this.token
  }

  private setToken(res) {
      console.log(res,'setToken')
      if (res.token){
        const expDate = res.expiry

        localStorage.setItem('b2b_token',res.token)
        localStorage.setItem('b2b_token-exp',expDate.toString())
      }else {
        console.log('remove')
        localStorage.removeItem('b2b_token')
      }



  }
}
