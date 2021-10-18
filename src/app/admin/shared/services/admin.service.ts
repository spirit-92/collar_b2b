import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../../environments/environment";


@Injectable({providedIn: 'root'})
export class AdminService {
  constructor(
    private http: HttpClient
  ) {
  }
  getCountry(): Observable<any> {
    return this.http.get<any>(`${environment.host}index.php?route=api/register&country`)
  }
  // getShops(): Observable<any> {
  //   return this.http.get<any>(`${environment.host}/nyVladikGetShops`)
  // }
  //
  // getCategories(): Observable<any> {
  //   return this.http.get<any>(`${environment.host}/nyVladikGetCategories`)
  // }
  //
  // saveProduct(product: any): Observable<any> {
  //   return this.http.post<any>(`${environment.host}/nyVladikSaveProduct`, product)
  // }
  //
  // getProducts(): Observable<any> {
  //   return this.http.get<any>(`${environment.host}/nyVladikGetProducts`)
  // }
  //
  // getProductById(id): Observable<any> {
  //   return this.http.post<any>(`${environment.host}/nyVladikGetProductById`, {
  //     'id': id
  //   },)
  // }
  //
  // deleteProduct(id): Observable<any> {
  //   return this.http.post<any>(`${environment.host}/nyVladikDeleteProduct`, {
  //     'id': id
  //   },)
  // }
  //
  // editProduct(product): Observable<any> {
  //   return this.http.post<any>(`${environment.host}/nyVladikEditProduct`, product,)
  // }
  //
  // addImgByProduct(data): Observable<any> {
  //   return this.http.post<any>(`${environment.host}/nyVladikAddImgProduct`, data, {
  //     reportProgress: true,
  //     observe: 'events'
  //   })
  // }
  //
  // deleteBaseImg(id): Observable<any> {
  //   return this.http.post<any>(`${environment.host}/nyVladikDeleteImgProduct`, {
  //     id: id
  //   })
  // }
  //
  // getSizesProducts(): Observable<any> {
  //   return this.http.get<any>(`${environment.host}/nyVladikGetSizesProducts`)
  // }
  //
  // //options
  //
  //
  // //shop
  // updateShop(id_shop, shopValue): Observable<any> {
  //   return this.http.post<any>(`${environment.host}/nyVladik/edit/shop`, {
  //     id_shop, shopValue
  //   })
  // }
  //
  // deleteShop(id_shop): Observable<any> {
  //   return this.http.post<any>(`${environment.host}/nyVladik/delete/shop`, {
  //     id_shop
  //   })
  // }
  //
  // addShop(value): Observable<any> {
  //   return this.http.post<any>(`${environment.host}/nyVladik/add/shop`, {
  //     value
  //   })
  // }
  // //category
  // addCategory(value_categories): Observable<any> {
  //   return this.http.post<any>(`${environment.host}/nyVladik/add/categories`, {
  //     value_categories
  //   })
  // }
  // deleteCategory(id_categories): Observable<any> {
  //   return this.http.post<any>(`${environment.host}/nyVladik/delete/categories`, {
  //     id_categories
  //   })
  // }
  // updateCategory(id_categories, value_categories): Observable<any> {
  //   return this.http.post<any>(`${environment.host}/nyVladik/edit/categories`, {
  //     id_categories, value_categories
  //   })
  // }
  // //sizes
  // addSizes(value_size): Observable<any> {
  //   return this.http.post<any>(`${environment.host}/nyVladik/add/sizes`, {
  //     value_size
  //   })
  // }
  //
  // deleteSizes(id_size): Observable<any> {
  //   return this.http.post<any>(`${environment.host}/nyVladik/delete/sizes`, {
  //     id_size
  //   })
  // }
  //
  // updateSize(id_size, value_size): Observable<any> {
  //   return this.http.post<any>(`${environment.host}/nyVladik/update/sizes`, {
  //     id_size, value_size
  //   })
  // }
  // saveSize(idProduct,idSize):Observable<any>{
  //   return this.http.post<any>(`${environment.host}/nyVladikSaveSize`, {
  //     idProduct, idSize
  //   })
  // }
  // getSizeProduct(id_product):Observable<any>{
  //   return this.http.post<any>(`${environment.host}/nyVladikGetSizeProduct`, {
  //     id_product
  //   })
  // }
  // deleteSizeProduct(id):Observable<any> {
  //   return this.http.post<any>(`${environment.host}/nyVladikDeleteSizeProduct`, {
  //     id
  //   })
  // }

}
