import type { CartItem, Product } from "./types"

const CART_KEY = "cart"
const WISHLIST_KEY = "wishlist"

export const getCart = (): CartItem[] =>
  JSON.parse(localStorage.getItem(CART_KEY) || "[]")

export const addToCart = (product: Product): CartItem[] => {
  const cart = getCart()
  const exist = cart.find(i => i.id === product.id)

  if (exist) {
    exist.quantity += 1
  } else {
    cart.push({ ...product, quantity: 1 })
  }

  localStorage.setItem(CART_KEY, JSON.stringify(cart))
  return cart
}

export const updateQuantity = (id: number, qty: number): CartItem[] => {
  const cart = getCart().map(i =>
    i.id === id ? { ...i, quantity: qty } : i
  )
  localStorage.setItem(CART_KEY, JSON.stringify(cart))
  return cart
}

export const removeItem = (id: number): CartItem[] => {
  const cart = getCart().filter(i => i.id !== id)
  localStorage.setItem(CART_KEY, JSON.stringify(cart))
  return cart
}

export const removeAll = (): CartItem[] => {
  localStorage.removeItem(CART_KEY)
  return []
}

/* ===== Wishlist ===== */

export const getWishlist = (): Product[] =>
  JSON.parse(localStorage.getItem(WISHLIST_KEY) || "[]")

export const toggleWishlist = (product: Product): Product[] => {
  const list = getWishlist()
  const exists = list.find(i => i.id === product.id)

  const updated = exists
    ? list.filter(i => i.id !== product.id)
    : [...list, product]

  localStorage.setItem(WISHLIST_KEY, JSON.stringify(updated))
  return updated
}
