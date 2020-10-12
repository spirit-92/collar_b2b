export interface User {
  email: string,
  password: string
}

export interface Shops {
    id: number,
    shop: string
}
export interface Product {
  id:number,
  body: string,
  img: string,
  shop: string,
  sku: string,
  title: string,
  sizes:string [],
  price:number,

}
