import {Pipe, PipeTransform} from "@angular/core";
import {Product} from "../../../shared/interfaces";
@Pipe({
  name:'searchProduct'
})
export class SearchPipe implements PipeTransform{
  transform(products: any[], search = ''): any[] {
    if (!search.trim()){
      return products
    }
    return products.filter( product =>{
      return product.name.toLocaleLowerCase().includes(search.toLocaleLowerCase())
    })
  }

}
