import React from 'react'
import img1 from "../../assets/1200px-Apple_gray_logo 1.png"
import { ChevronRight } from 'lucide-react'
import img2 from "../../assets/hero_endframe__cvklg0xk3w6e_large 2.png"

export const Section1 = () => {
    return (
        <div>
            <div className="w-[850px] text-[white] h-[58vh] bg-[black] flex  items-center">
                <div className="ml-[100px]">
                    <div className="flex items-center gap-[30px]">
                        <img src={img1} alt="" />
                        <p>iPhone 14 Series</p>
                    </div>
                    <h1 className='text-[45px]'>Up to 10% <br />
                        off Voucher</h1>
                    <p>Shop Now -<ChevronRight className="inline " /></p>
                </div>
                <img src={img2} alt="" />
            </div>
        </div>
    )
}
