import {Injectable} from "@angular/core";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {User} from "../../../shared/interfaces";
import {Observable, Subject, throwError} from "rxjs";
import {environment} from "../../../../environments/environment";
import {catchError, tap} from "rxjs/operators";

@Injectable()
export class AuthService {
  public isAuth$ = new Subject<boolean>();
  constructor(
    private http: HttpClient
  ) {
  }
  isAuth(){
    this.isAuth$.next(this.isAuthenticated())
  }
  get token(): string {
    const expDate = localStorage.getItem('b2b_token-exp')
    if (+expDate < Math.round(new Date().getTime() / 1000 ) && +expDate !== 0){
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
  firstRegistration(user):Observable<any>{
    return this.http.post(`${environment.host}index.php?route=api/register`, user)
  }
  logout() {
    this.setToken(null)
    this.http.get(`${environment.host}index.php?route=api/logout`)
    localStorage.clear()
  }

  isAuthenticated(): boolean {
    return !! this.token
  }

   setToken(res) {
      console.log(res,'setToken',  !!res)

      if (!!res){
        const expDate = res.expiry

        localStorage.setItem('b2b_token',res.token)
        localStorage.setItem('b2b_token-exp',expDate.toString())
      }else {
        console.log('remove ,logoute')
        localStorage.removeItem('b2b_token')

      }



  }
}
