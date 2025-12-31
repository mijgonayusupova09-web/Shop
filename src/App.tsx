import { BrowserRouter, Route, Routes } from "react-router-dom"
import Layout from "./components/layout/Layout"
import { Shop } from "./pages/Shop"
import { Cart } from "./pages/Cart"
import { Wishlist } from "./pages/Wishlist"
import { Checkout } from "./pages/Checkout"
import { Account } from "./pages/Account"
import { Orders } from "./pages/Orders"
import { About } from "./pages/About"
import { Contact } from "./pages/Contact"
import { NotFound } from "./pages/NotFound"
import { Login } from "./pages/Login"
import Register from "./pages/Register"
import { Home } from "./pages/Home"
import ProductDetails from "./pages/ProductDetails"

const App = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/shop" element={<Shop/>} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart/>} />
          <Route path="/wishlist" element={<Wishlist/>} />
          <Route path="/checkout" element={<Checkout/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/register" element={<Register/>} />
          <Route path="/account" element={<Account/>} />
          <Route path="/orders" element={<Orders/>} />
          <Route path="/about" element={<About/>} />
          <Route path="/contact" element={<Contact/>} />
          <Route path="*" element={<NotFound/>} />
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}

export default App
