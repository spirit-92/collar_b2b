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
export interface Design {
  design?:any[],


}
export interface ProductB2b {
  "item": {
    "item_id":string,
    "item_name": string,
    "category_name": string,
    "design_name": string,
    "item_description": string
  },
  "options": {
    "size": [
      {
        "id": string,
        "name": string,
        "price": number
      },
      {
        "id": string,
        "name": string,
        "price": number
      },
      {
        "id": string,
        "name":string,
        "price": number
      },
      {
        "id": string,
        "name": string,
        "price":number
      }
    ],
    "base": [
      {
        "price": number
      }
    ],
    "color": [
      {
        "id": string,
        "name": string
      },
      {
        "id": string,
        "name": string
      }
    ]
  }

}
