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

  getUsersStatistic(page):Observable<any>{
    return this.http.get(`https://spirit.pp.ua/statisticUsers?page=${page}`)
  }
  getUserStatistic(id):Observable<any>{
    return this.http.get(`https://spirit.pp.ua/statisticUser?userId=${id}`)
  }
  getUserInfo():Observable<any>{
    return this.http.get(`http://localhost:1111/infoUser`)
  }
}
