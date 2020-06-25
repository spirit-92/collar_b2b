import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserStatisticService {

  constructor(
  private  http: HttpClient
  ) {}

  getUserStatistic(page):Observable<any>{
    return this.http.get(`http://localhost:1111/statisticUser?page=${page}`)
  }
}
