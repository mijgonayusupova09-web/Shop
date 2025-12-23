import { Link, NavLink } from "react-router-dom"
import img1 from "../../assets/Group 1116606595.png"
import img2 from "../../assets/Component 2.png"
import img3 from "../../assets/Wishlist.png"
import img4 from "../../assets/user.png"
import img5 from "../../assets/Cart1.png"
const Header = () => {
  return (
    <header className="w-full border-b bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">

        <Link to="/" className="flex items-center gap-2 text-xl font-bold">
        <img src={img1} alt="" />
        </Link>

        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "text-black font-semibold" : "text-gray-500 hover:text-black"
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/contact"
            className={({ isActive }) =>
              isActive ? "text-black font-semibold" : "text-gray-500 hover:text-black"
            }
          >
            Contact
          </NavLink>

          <NavLink
            to="/about"
            className={({ isActive }) =>
              isActive ? "text-black font-semibold" : "text-gray-500 hover:text-black"
            }
          >
            About
          </NavLink>

          <NavLink
            to="/register"
            className={({ isActive }) =>
              isActive ? "text-black font-semibold" : "text-gray-500 hover:text-black"
            }
          >
            Sign Up
          </NavLink>
        </nav>

        <div className="flex items-center gap-4">
          <div className="relative hidden md:block">
            <input
              type="text"
              placeholder="What are you looking for?"
              className="w-56 rounded-md border px-3 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-black"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
            <img src={img2} alt="" />
            </span>
          </div>

          <Link to="/wishlist" className="text-xl">
            <img src={img3} alt="" />
          </Link>

          <Link to="/cart" className="relative text-xl">
          <img src={img5} alt="" />
            <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-xs text-white">
              2
            </span>
          </Link>
          <Link to="/account" className="text-xl">
            <img src={img4} alt="" />
          </Link>
        </div>
      </div>
    </header>
  )
}

export default Header
