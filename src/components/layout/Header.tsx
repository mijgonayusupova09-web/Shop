import { Link, NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, LogOut } from "lucide-react";
import img1 from "../../assets/logo.jpg";
import img2 from "../../assets/user.png";
import img3 from "../../assets/heart small.png";
import img5 from "../../assets/Cart1.png";
import { useGetProductsQuery } from "../../store/api/productApi/product";

const Header = () => {
  const { data } = useGetProductsQuery();
  const [cartCount, setCartCount] = useState(0);
  const [wishCount, setWishCount] = useState(0);
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const updateCounts = () => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    const wishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");
    setCartCount(cart.length);
    setWishCount(wishlist.length);
  };

  useEffect(() => {
    updateCounts();
    window.addEventListener("storage", updateCounts);
    return () => window.removeEventListener("storage", updateCounts);
  }, []);

  const menuItems = [
    { path: "/", label: "Home" },
    { path: "/contact", label: "Contact" },
    { path: "/about", label: "About" },
    { path: "/register", label: "Register" },
  ];

  useEffect(() => {
    if (!search) {
      setSearchResults([]);
      return;
    }
    const filtered = data?.data?.products?.filter((p) =>
      p.productName.toLowerCase().includes(search.toLowerCase())
    );
    setSearchResults(filtered || []);
  }, [search, data]);

  const handleLogOut = () => {
    localStorage.removeItem("token");
    window.location.reload(); 
  };

  return (
    <header className="w-full border-b bg-white sticky top-0 z-50">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
        <Link to="/" className="flex items-center gap-2 text-xl font-bold">
          <img className="w-[150px]" src={img1} alt="Logo" />
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          {menuItems.map((item, i) => (
            <NavLink
              key={i}
              to={item.path}
              className={({ isActive }) =>
                isActive
                  ? "text-black font-semibold"
                  : "text-gray-500 hover:text-black"
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-4 relative">
          <div className="relative hidden md:block">
            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-56 rounded-md border px-3 py-1.5 text-sm
                         focus:outline-none focus:ring-1 focus:ring-black"
            />
            {searchResults.length > 0 && (
              <div className="absolute top-full left-0 w-full bg-white border mt-1 z-50 max-h-64 overflow-y-auto shadow-lg rounded">
                {searchResults.map((p: any) => (
                  <Link
                    key={p.id}
                    to={`/product/${p.id}`}
                    onClick={() => setSearch("")}
                    className="block px-3 py-2 hover:bg-gray-100 text-sm"
                  >
                    {p.productName}
                  </Link>
                ))}
              </div>
            )}
          </div>
          <Link to="/wishlist" className="relative text-xl">
            <img src={img3} alt="Wishlist" />
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

          <Link to="/cart" className="relative text-xl">
            <img src={img5} alt="Cart" />
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
          {localStorage.getItem("token") ? (
            <div className="flex items-center gap-2">
              <LogOut
                className="text-xl cursor-pointer"
                onClick={handleLogOut}
                title="Log Out"
              />
            </div>
          ) : ""}

              <Link to={localStorage.getItem("token") ? "/account" : "/login"} className="text-xl">
                <img src={img2} alt="User" className="w-8 h-8 rounded-full" />
              </Link>
          <button className="md:hidden text-xl" onClick={() => setOpen(!open)}>
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </div>
      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t overflow-hidden"
          >
            <div className="flex flex-col px-4 py-2 gap-2">
              {menuItems.map((item, i) => (
                <NavLink
                  key={i}
                  to={item.path}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    isActive
                      ? "text-black font-semibold block py-2"
                      : "text-gray-500 hover:text-black block py-2"
                  }
                >
                  {item.label}
                </NavLink>
              ))}
              <input
                type="text"
                placeholder="Search products..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded-md border px-3 py-1.5 text-sm mt-2"
              />
              {searchResults.length > 0 && (
                <div className="w-full bg-white border mt-1 max-h-64 overflow-y-auto rounded">
                  {searchResults.map((p: any) => (
                    <Link
                      key={p.id}
                      to={`/product/${p.id}`}
                      onClick={() => {
                        setSearch("");
                        setOpen(false);
                      }}
                      className="block px-3 py-2 hover:bg-gray-100 text-sm"
                    >
                      {p.productName}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
