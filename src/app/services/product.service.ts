import { Injectable } from '@angular/core';
import {Observable, Subject} from "rxjs";
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Design} from "../shared/interfaces";


@Injectable({
  providedIn: 'root'
})
export class ProductService {
  public underCategory$ = new Subject<any[]>();
  constructor(
    private http: HttpClient
  ) { }

  getProducts(): Observable<any> {

    return this.http.get<any>(`${environment.host}/nyVladikGetProducts`)
  }
  getCategories():Observable<any>{
    return this.http.get<any>(`${environment.host}index.php?route=api/category`)
  }
  getCategories_des(id):Observable<Design>{
    return this.http.get<any>(`${environment.host}index.php?route=api/category&category_id=${id}`)
  }
  getImagesProduct(id):Observable<any>{
    return this.http.get<any>(`${environment.host}/nyVladikGetImagesProduct?id=${id}`)
  }
  getProductByIdOrder(id): Observable<any> {
    return this.http.get<any>(`${environment.host}/nyVladikGetProductOrderById?id=${id}`)
  }
  public underCategories(catalogs:any[]){
   return  this.underCategory$.next(catalogs);
  }

}
// ${environment.host}index.php?route=api/item&category_id=${id}&design_id=1
