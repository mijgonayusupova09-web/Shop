import React from 'react'
import img1 from "../../assets/heart small.png"
import img2 from "../../assets/Quick View.png"
import img3 from "../../assets/Frame 611.png"
import img4 from "../../assets/Five star.png"

export const ProductCrad1 = () => {
  return (
    <div>
        <div className="w-[220px] h-[220px] bg-[#e7e7e7]">
            <div className="flex justify-between p-[10px]">
                <div className="w-[40px] h-[20px] rounded-[5px] bg-[#DB4444] text-[white] text-center items-center">
                    <p className='text-[12px]'>-40%</p>
                </div>
                <div className="">
                    <img className='bg-[white] rounded-[10px]' src={img1} alt="" />
                    <img className='bg-[white] mt-[10px] rounded-[10px]' src={img2} alt="" />
                </div>
            </div>
            <img className='h-[180px] absolute top-[640px] pl-[10px]' src={img3} alt="" />
        </div>
        <h1 className='mt-[10px]'>HAVIT HV-G92 Gamepad</h1>
        <span className='text-[#DB4444] text-[15] pt-[14px]'>$120</span>
        <span className='ml-[10px] text-[15px]'>$160</span>
        <div className="flex items-center gap-[10px]">
            <img src={img4} alt="" />
            <p>(88)</p>
        </div>
    </div>
  )
}
