import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export interface CartItem {
  id: number
  title: string
  price: number
  qty: number
}

const initialState: CartItem[] = []

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      state.push(action.payload)
    },
    removeFromCart: (state, action: PayloadAction<number>) => {
      return state.filter(item => item.id !== action.payload)
    }
  }
})

export const { addToCart, removeFromCart } = cartSlice.actions
export default cartSlice.reducer
