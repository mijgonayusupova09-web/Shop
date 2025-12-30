import React from 'react'
import img1 from "../assets/icons-phone.png"

export const Contact = () => {
  return (
    <div className='w-[90%] m-auto mt-[60px]'>
      <div>
        <span className='text-[grey]'>Home</span>
        <span className='ml-[5px]'>/</span>
        <span className='ml-[5px]'>Contact</span>
      </div>
      <div className="flex flex-col lg:flex-row justify-between gap-8 mt-[50px]">
        <div className="w-full lg:w-[300px] h-auto lg:h-[75vh] 
        border border-white shadow-2xl rounded-[10px] 
        pl-[30px] pt-[40px] transition hover:shadow-3xl">

          <div className="flex gap-[10px] items-center">
            <img src={img1} alt="" className="hover:scale-110 transition" />
            <h1 className='text-[18px] font-semibold'>Call To Us</h1>
          </div>

          <p className='text-[13px] mt-4'>We are available 24/7, 7 days a week.</p>
          <p className='text-[13px] pt-[10px]'>Phone: +8801611112222</p>

          <hr className='w-[210px] text-[#b9b9b9] mt-[30px]' />

          <div className="flex gap-[10px] items-center pt-[30px]">
            <img src={img1} alt="" className="hover:scale-110 transition" />
            <h1 className='text-[18px] font-semibold'>Write To Us</h1>
          </div>

          <p className='text-[13px] mt-4'>
            Fill out our form and we will contact <br />
            you within 24 hours.
          </p>
          <p className='text-[13px] pt-[10px]'>Emails: customer@exclusive.com</p>
          <p className='text-[13px] pt-[10px]'>Emails: support@exclusive.com</p>
        </div>
        <div className="w-full lg:w-[800px] h-auto lg:h-[75vh] 
        border border-white shadow-2xl rounded-[10px] 
        px-[20px] lg:px-[30px] pt-[40px] lg:pt-[70px]">

          <div className="flex flex-col lg:flex-row gap-4 justify-between">
            <input
              className='border w-full lg:w-[220px] h-[45px] rounded-[3px] pl-[10px] 
              focus:outline-none focus:ring-1 focus:ring-[#DB4444]'
              type="text"
              placeholder='Name'
            />
            <input
              className='border w-full lg:w-[220px] h-[45px] rounded-[3px] pl-[10px] 
              focus:outline-none focus:ring-1 focus:ring-[#DB4444]'
              type="email"
              placeholder='Email'
            />
            <input
              className='border w-full lg:w-[220px] h-[45px] rounded-[3px] pl-[10px] 
              focus:outline-none focus:ring-1 focus:ring-[#DB4444]'
              type="tel"
              placeholder='Phone'
            />
          </div>

          <textarea
            className='w-full border mt-[30px] h-[170px] pl-[10px] pt-[10px] 
            focus:outline-none focus:ring-1 focus:ring-[#DB4444]'
            placeholder='Your Message'
          />

          <button
            className='w-[170px] text-white rounded-[3px] 
            mt-[30px] h-[45px] bg-[#DB4444] 
            hover:bg-[#b93838] transition
            block ml-auto'
          >
            Send Message
          </button>
        </div>

      </div>
    </div>
  )
}
