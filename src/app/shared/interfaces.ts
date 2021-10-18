export interface User {
  country_id:number,
  email: string,
  phone: string,
  password: string,
  company:string
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
export interface basketShow {


}
export interface ProductB2b {
  "item": {
    "item_id":string,
    "item_name": string,
    "category_name": string,
    "design_name": string,
    "item_description": string,
     currency_code:string
  },
  "options": {
    images: [
      {
        item_image: string
      }
    ],
    "size": [
      {
        "id": string,
        "name": string,
        "price": number,
        "qt":number,
        "color_id"?:number,
        "color":any
      },

    ],
    "sizes":any,
    "base": [
      {
        "price": number
      }
    ],
    "color"?: [
      {
        "id": string,
        "name": string
      },
    ]
  }

}
