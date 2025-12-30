import { Link, NavLink } from "react-router-dom"
import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import img1 from "../../assets/logo.jpg"
import img2 from "../../assets/user.png"
import img3 from "../../assets/heart small.png"
import img4 from "../../assets/Component 2.png"
import img5 from "../../assets/Cart1.png"

const Header = () => {
  const [cartCount, setCartCount] = useState(0)
  const [wishCount, setWishCount] = useState(0)

  const updateCounts = () => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]")
    const wishlist = JSON.parse(localStorage.getItem("wishlist") || "[]")
    setCartCount(cart.length)
    setWishCount(wishlist.length)
  }

  useEffect(() => {
    updateCounts()
    window.addEventListener("storage", updateCounts)
    return () => window.removeEventListener("storage", updateCounts)
  }, [])

  return (
    <header className="w-full border-b bg-white sticky top-0 z-50">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
        <Link to="/" className="flex items-center gap-2 text-xl font-bold">
        <img className="w-[150px]" src={img1} alt="" />
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          {["/", "/contact", "/about", "/register"].map((path, i) => (
            <NavLink
              key={i}
              to={path}
              className={({ isActive }) =>
                isActive
                  ? "text-black font-semibold"
                  : "text-gray-500 hover:text-black"
              }
            >
              {path === "/" ? "Home" : path.replace("/", "").toUpperCase()}
            </NavLink>
          ))}
        </nav>
        <div className="flex items-center gap-4">
          <div className="relative hidden md:block">
            <input
              type="text"
              placeholder="What are you looking for?"
              className="w-56 rounded-md border px-3 py-1.5 text-sm
                         focus:outline-none focus:ring-1 focus:ring-black"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2">
              <img src={img4} alt="" />
            </span>
          </div>
          <Link to="/wishlist" className="relative text-xl">
            <img src={img3} alt="" />
            <AnimatePresence>
              {wishCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  className="absolute -right-2 -top-2
                             h-4 w-4 rounded-full bg-red-500
                             text-xs text-white flex items-center justify-center"
                >
                  {wishCount}
                </motion.span>
              )}
            </AnimatePresence>
          </Link>
          <Link style={{display:localStorage.getItem("token") ? "block" : "block"}} to="/cart" className="relative text-xl">
            <img src={img5} alt="" />
            <AnimatePresence>
              {cartCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  className="absolute -right-2 -top-2
                             h-4 w-4 rounded-full bg-red-500
                             text-xs text-white flex items-center justify-center"
                >
                  {cartCount}
                </motion.span>
              )}
            </AnimatePresence>
          </Link>
          <Link to={localStorage.getItem("token") ? "/account" : "/register"}  className="text-xl">
            <img src={img2} alt="" />
          </Link>
        </div>
      </div>
    </header>
  )
}

export default Header
