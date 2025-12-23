import React from 'react'
import img1 from "../../assets/icon-send.png"
import img2 from "../../assets/Icon-Facebook.png"
import img3 from "../../assets/Icon-Twitter.png"
import img4 from "../../assets/icon-instagram.png"
import img5 from "../../assets/Icon-Linkedin.png"
import '../../App'

export const Footer = () => {
  return (
    <div>
      <div className="bb w-[100%] h-[67vh] bg-[black] text-[white]">
       <div className="w-[90%] m-auto flex justify-between pt-[70px]">
        <div className="">
          <h1 className='text-[20px]'>Exclusive</h1>
          <br />
          <p >Subscribe</p>
          <p className='mt-[10px]'>Get 10% off your first order</p>
            <div className="relative hidden md:block mt-[10px]">
            <input
              type="text"
              placeholder="Enter your email"
              className="w-56 rounded-[3px] border px-3 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-black"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
            <img src={img1} alt="" />
            </span>
          </div>
          </div>
          <div className="">
            <h1 className='text-[20px]'>Support</h1>
            <br />
            <p className='mt-[10px]'>111 Bijoy sarani, Dhaka, <br />
               DH 1515, Bangladesh.</p>
               <p className='mt-[10px]'>exclusive@gmail.com</p>
               <p className='mt-[10px]'>+88015-88888-9999</p>
          </div>
          <div className="">
            <p className='text-[20px]'>Account</p>
            <br />
            <p className='mt-[10px]'>My Account</p>
            <p className='mt-[10px]'>Cart</p>
            <p className='mt-[10px]'>Wishlist</p>
            <p className='mt-[10px]'>Shop</p>
          </div>
          <div className="">
            <h1 className='text-[20px]'>Quick Link</h1>
            <br />
            <p >Privacy Policy</p>
            <p className='mt-[10px]'>Terms Of Use</p>
            <p className='mt-[10px]'>FAQ</p>
            <p className='mt-[10px]'>Contact</p>
          </div>
          <div className="">
            <h1 className='text-[20px]'>Social </h1>
            <br />
            <div className="flex items-center gap-[10px]">
              <img src={img2} alt="" />
              <img src={img3} alt="" />
              <img src={img4} alt="" />
              <img src={img5} alt="" />
            </div>
          </div>
       </div>
       <hr className='mt-[70px] text-[#191919]' />
       <h1 className='text-center mt-[20px] text-[14px] text-[grey]'>Copyright Rimel 2022. All right reserved</h1>
      </div>
    </div>
  )
}
