export interface Product {
  id: number
  productName: string
  price: number
  discountPrice?: number
  image: string
  description?: string
}

export interface CartItem extends Product {
  quantity: number
}
