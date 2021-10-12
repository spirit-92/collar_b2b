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
    return localStorage.getItem('nyVladikTokenAdmin')
  }

  login(user: User): Observable<any> {
    return this.http.post(`${environment.host}/authorise`, user).pipe(
      tap(this.setToken),

    )
  }
  registration(user):Observable<any>{
    console.log(user ,'!)!)!')
    return this.http.post(`${environment.host}index.php?route=api/register-test`, user)
  }
  logout() {
    this.setToken(null)
  }

  isAuthenticated(): boolean {
    return !! this.token
  }

  private setToken(res) {
    console.log(res)
    if (res){
      localStorage.setItem('nyVladikTokenAdmin',res.token)
    }else {
      localStorage.removeItem('nyVladikTokenAdmin')
    }

  }
}
