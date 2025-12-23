import React from 'react'
import { Section1 } from './home/section1'
import { ChevronRight } from 'lucide-react'
import img1 from "../assets/Fill With Left Arrow.png"
import img2 from "../assets/Fill with Right Arrow.png"
import { ProductCrad1 } from './home/productCrad1'
import { ProductCrad2 } from './home/productCrad2'
import { ProductCrud3 } from './home/productCrud3'
import { Categories } from './home/categories'

export const Home = () => {
  return (
    <div className='h-[900vh] w-[90%] m-auto mt-[40px]'>
      <div className="flex justify-between">
        <div className="">
          <p>Woman’s Fashion<ChevronRight className="inline ml-[70px]" /></p>
          <p className='mt-[13px]'>Men’s Fashion<ChevronRight className="inline ml-[90px]" /></p>
          <p className='mt-[13px]'>Electronics</p>
          <p className='mt-[13px]'>Home & Lifestyle</p>
          <p className='mt-[13px]'>Medicine</p>
          <p className='mt-[13px]'>Sports & Outdoor</p>
          <p className='mt-[13px]'>Baby’s & Toys</p>
          <p className='mt-[13px]'>Groceries & Pets</p>
          <p className='mt-[13px]'>Health & Beauty</p>
        </div>
        <Section1 />
      </div>
      <div className="flex items-center gap-[10px] mt-[30px]">
        <div className="w-[25px] h-[50px] bg-[#DB4444] rounded-[8px]"></div>
        <p className='text-[#DB4444]'>Today’s</p>
      </div>
      <div className="flex justify-between ">
        <div className="flex gap-[100px] items-end">
          <p className='text-[30px] font-bold '>Flash Sales</p>
          <div className="flex items-end gap-[10px]">
            <div className="">
              <p className='text-[12px]'>Days</p>
              <h1 className='text-[30px] font-bold'>03</h1>
            </div>
            <p className='text-[30px] font-bold text-[#E07575]'>:</p>
            <div className="">
              <p className='text-[12px]'>Hours</p>
              <h1 className='text-[30px] font-bold'>23</h1>
            </div>
            <p className='text-[30px] font-bold text-[#E07575]'>:</p>
            <div className="">
              <p className='text-[12px]'>Minutes</p>
              <h1 className='text-[30px] font-bold'>19</h1>
            </div>
            <p className='text-[30px] font-bold text-[#E07575]'>:</p>
            <div className="">
              <p className='text-[12px]'>Seconds</p>
              <h1 className='text-[30px] font-bold'>56</h1>
            </div>
          </div>
        </div>
        <div className="flex gap-[10px]">
          <img src={img1} alt="" />
          <img src={img2} alt="" />
        </div>
      </div>
      <div className="flex justify-between mt-[20px]">
        <ProductCrad1 />
        <ProductCrad1 />
        <ProductCrad1 />
        <ProductCrad1 />

      </div>
      <button className='w-[200px] h-[50px] text-[white] ml-[450px] mt-[30px] bg-[#DB4444]'>View All Products</button>
      <div className="flex items-center gap-[10px] mt-[30px]">
        <div className="w-[25px] h-[50px] bg-[#DB4444] rounded-[8px]"></div>
        <p className='text-[#DB4444]'>Categories</p>
      </div>
      <div className="flex justify-between ">
        <div className="flex gap-[100px] items-end">
          <p className='text-[30px] font-bold '>Browse By Category</p>
        </div>
        <div className="flex gap-[10px]">
          <img src={img1} alt="" />
          <img src={img2} alt="" />
        </div>
      </div>
      <div className="flex justify-between">
        <ProductCrad2 />
        <ProductCrad2 />
        <ProductCrad2 />
        <ProductCrad2 />
        <ProductCrad2 />
        <ProductCrad2 />
      </div>
      <div className="flex items-center gap-[10px] mt-[30px]">
        <div className="w-[25px] h-[50px] bg-[#DB4444] rounded-[8px]"></div>
        <p className='text-[#DB4444]'>This Month</p>
      </div>
      <div className="flex justify-between ">
        <div className="flex gap-[100px] items-end">
          <p className='text-[30px] font-bold '>Best Selling Products</p>
        </div>
        <button className='w-[150px] h-[48px] rounded-[3px] bg-[#DB4444] text-[white]'>View All</button>
      </div>
      <div className="mt-[30px] flex justify-between">
        <ProductCrud3 />
        <ProductCrud3 />
        <ProductCrud3 />
        <ProductCrud3 />
      </div>

      <Categories/>
    </div>

  )
}
