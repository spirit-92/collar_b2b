import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(
    private http: HttpClient
  ) { }

  getProducts(): Observable<any> {

    return this.http.get<any>(`${environment.host}/nyVladikGetProducts`)
  }
  getCategories():Observable<any>{
    return this.http.get<any>(`https://opencard.collar.com.ua/!b2b/index.php?route=api/category`)
  }
  getProductByCategory(id):Observable<any>{
  console.log(id)
  return this.http.get<any>(`https://opencard.collar.com.ua/!b2b/index.php?route=api/category&category_id=${id}`)
  }
  getImagesProduct(id):Observable<any>{
    return this.http.get<any>(`${environment.host}/nyVladikGetImagesProduct?id=${id}`)
  }
  getProductByIdOrder(id): Observable<any> {
    return this.http.get<any>(`${environment.host}/nyVladikGetProductOrderById?id=${id}`)
  }

}
