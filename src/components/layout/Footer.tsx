import React from 'react'
import img1 from "../../assets/icon-send.png"
import img2 from "../../assets/Icon-Facebook.png"
import img3 from "../../assets/Icon-Twitter.png"
import img4 from "../../assets/icon-instagram.png"
import img5 from "../../assets/Icon-Linkedin.png"

export const Footer = () => {
  const accountLinks = ["My Account","Cart","Wishlist","Shop"];
  const quickLinks = ["Privacy Policy","Terms Of Use","FAQ","Contact"];
  const socialIcons = [img2,img3,img4,img5];

  return (
    <footer className="bg-black text-white pt-16 pb-[10px] mt-[40px]">
      <div className="w-full max-w-7xl mx-auto flex flex-col lg:flex-row justify-between gap-12 px-4">

        <div className="flex-1">
          <h1 className="text-lg font-semibold">Exclusive</h1>
          <p className="mt-4">Subscribe</p>
          <p className="mt-2">Get 10% off your first order</p>

          <div className="relative mt-4">
            <input
              type="text"
              placeholder="Enter your email"
              className="w-full md:w-56 rounded-sm border px-3 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-black"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer hover:scale-110 transition">
              <img src={img1} alt="Send" className="w-5 h-5"/>
            </span>
          </div>
        </div>

        <div className="flex-1">
          <h1 className="text-lg font-semibold">Support</h1>
          <p className="mt-4 text-sm">111 Bijoy sarani, Dhaka, <br /> DH 1515, Bangladesh.</p>
          <p className="mt-2 text-sm hover:text-[#DB4444] cursor-pointer transition">exclusive@gmail.com</p>
          <p className="mt-2 text-sm hover:text-[#DB4444] cursor-pointer transition">+88015-88888-9999</p>
        </div>

        <div className="flex-1">
          <h1 className="text-lg font-semibold">Account</h1>
          {accountLinks.map((item, i) => (
            <p key={i} className="mt-2 text-sm hover:text-[#DB4444] cursor-pointer transition">{item}</p>
          ))}
        </div>

        <div className="flex-1">
          <h1 className="text-lg font-semibold">Quick Link</h1>
          {quickLinks.map((item, i) => (
            <p key={i} className="mt-2 text-sm hover:text-[#DB4444] cursor-pointer transition">{item}</p>
          ))}
        </div>
        <div className="flex-1">
          <h1 className="text-lg font-semibold">Social</h1>
          <div className="flex items-center gap-3 mt-4">
            {socialIcons.map((icon, i) => (
              <img key={i} src={icon} alt={`social-${i}`} className="w-6 h-6 cursor-pointer hover:scale-110 transition" />
            ))}
          </div>
        </div>
      </div>

      <hr className="border-gray-800 my-8 " />
      <p className="text-center text-gray-400 text-sm mb-8">
        Copyright Rimel 2022. All rights reserved
      </p>
    </footer>
  )
}
