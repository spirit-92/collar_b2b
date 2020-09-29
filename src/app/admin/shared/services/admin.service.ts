import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../../environments/environment";
import {Shops} from "../../../shared/interfaces";

@Injectable()
export class AdminService {
  constructor(
    private http: HttpClient
  ) {}

  getShops():Observable<any>{
    const header = new HttpHeaders({
      'token':localStorage.getItem('nyVladikTokenAdmin'),
      'Content-Type': 'application/json'
    })
    return this.http.get<any>(`${environment.host}/nyVladikGetShops`,{headers:header})
  }
  saveProduct(product:any):Observable<any>{
    const header = new HttpHeaders({
      'token':localStorage.getItem('nyVladikTokenAdmin'),
    })
    return this.http.post<any>(`${environment.host}/nyVladikSaveProduct`,product,{headers:header})
  }
  getProducts():Observable<any>{
    return this.http.get<any>(`${environment.host}/nyVladikGetProducts`)
  }
  deleteProduct(id):Observable<any>{
    const header = new HttpHeaders({
      'token':localStorage.getItem('nyVladikTokenAdmin'),
    })
    return this.http.post<any>(`${environment.host}/nyVladikDeleteProduct`,{
      'id':id
    },{headers:header})
  }
}
