import { Injectable } from '@angular/core';
import {Observable, of, Subject} from "rxjs";
import {environment} from "../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {basketShow, Design, ProductB2b} from "../shared/interfaces";
import {catchError, map, tap} from "rxjs/operators";


@Injectable({
  providedIn: 'root'
})
export class ProductService {
  public underCategory$ = new Subject<any[]>();
  public showBasket$ = new Subject<any[]>();
  public isAuth$:any =null
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
  getProduct(category_id,design_id): Observable<ProductB2b> {
    // return this.http.get<any>(`${environment.host}/nyVladikGetProductOrderById?id=${id}`)
    return this.http.get<ProductB2b>(`${environment.host}index.php?route=api/item&category_id=${category_id}&design_id=${design_id}`)
  }
   underCategories(catalogs:any[]){
   return  this.underCategory$.next(catalogs);
  }
  addCart(item):Observable<any>{
    console.log('ADD FUN')
    return this.http.post<any>(`${environment.host}index.php?route=api/cart&add=1`,item
    )
  }

  showOrderBasket():Observable<basketShow>{
    return this.http.get<basketShow>(`${environment.host}index.php?route=api/cart&get`,{})
  }
  showBasket(){
    this.showBasket$.next()
  }
  isAuth():Observable<any>{
    // if (localStorage.getItem('b2b_token') !== null){
    //   const myHeaders = new HttpHeaders().set('Authorization',
    //     'Bearer ' + localStorage.getItem('b2b_token')
    //     );
    //
    //   return this.http.post<any>(`https://b2b.waudog.ua/index.php?route=api/auth-token`,{
    //     'token': localStorage.getItem('b2b_token')
    //   },{headers:myHeaders})
    // }
    return this.http.get<any>(`${environment.host}index.php?route=api/auth-token&token=${localStorage.getItem('b2b_token')}`)
      .pipe(
      map(()=>{

        return  true
      }),catchError(err => {

        return of(false);
      })
    )
  }
  getUser():Observable<any>{
    return this.http.get<any>(`${environment.host}index.php?route=api/auth-token&token=${localStorage.getItem('b2b_token')}`)

  }

   getToken(): Observable<boolean> {

    const expDate = localStorage.getItem('b2b_token-exp')
     if (+expDate < Math.round(new Date().getTime() / 1000 )){
      console.log('logout')
      this.logout()
      return  of(false)

    }else {
      return  this.isAuth()


     }
  }
  logout():Observable<any> {
    return this.http.get(`${environment.host}index.php?route=api/logout`)

  }
  deleteCard(cardId):Observable<any>{
    return this.http.post(`${environment.host}index.php?route=api/cart&delete`,{
      sizetodel:cardId
    })
  }
  orderSave():Observable<any>{
    return this.http.get(`${environment.host}index.php?route=api/order&add`)

  }

}
// ${environment.host}index.php?route=api/item&category_id=${id}&design_id=1
