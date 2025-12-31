import "../App.css"
import img1 from "../assets/Side Image.png"
import img2 from "../assets/Services.png"
import img3 from "../assets/image 46.png"
import img5 from "../assets/Group.png"
import img6 from "../assets/icon-instagram (1).png"
import img7 from "../assets/Icon-Linkedin (1).png"
import { Loader } from '../components/layout/ui/Loader'

export const About = () => {
  return (
    <div className='w-[90%] m-auto mt-[60px]'>
      <div className="flex flex-col lg:flex-row justify-between mt-[50px] items-center gap-8">
        <div className="flex-1">
          <h1 className='text-[40px] font-bold'>Our Story</h1>
          <p className='mt-4 text-gray-700'>
            Launched in 2015, Exclusive is South Asia’s premier online shopping <br />
            marketplace with an active presence in Bangladesh. Supported by a wide <br />
            range of tailored marketing, data and service solutions, Exclusive has <br />
            10,500 sellers and 300 brands and serves 3 million customers across <br />
            the region.
          </p>
          <p className='mt-4 text-gray-700'>
            Exclusive has more than 1 Million products to offer, growing at a very <br />
            fast pace. Exclusive offers a diverse assortment in categories ranging <br />
            from consumer.
          </p>
        </div>
        <img src={img1} alt="" className="w-full lg:w-[400px] object-cover rounded-lg hover:scale-105 transition" />
      </div>

      <div className="flex flex-wrap justify-between mt-[80px] gap-6">
        <div className="group border text-center w-[200px] h-[170px] p-4 hover:shadow-lg rounded-md transition">
          <img className="w-16 mx-auto mt-2 group-hover:scale-110 transition" src={img2} alt="" />
          <h1 className="font-bold text-[20px] mt-4 group-hover:text-red-500 transition">10.5k</h1>
          <p className="text-[14px] text-gray-700 group-hover:text-gray-900 transition">Sellers active on our site</p>
        </div>
        <div className="group border text-center w-[200px] h-[170px] p-4 hover:shadow-lg rounded-md transition">
          <img className="w-16 mx-auto mt-2 group-hover:scale-110 transition" src={img2} alt="" />
          <h1 className="font-bold text-[20px] mt-4 group-hover:text-red-500 transition">10.5k</h1>
          <p className="text-[14px] text-gray-700 group-hover:text-gray-900 transition">Sellers active on our site</p>
        </div>
        <div className="group border text-center w-[200px] h-[170px] p-4 hover:shadow-lg rounded-md transition">
          <img className="w-16 mx-auto mt-2 group-hover:scale-110 transition" src={img2} alt="" />
          <h1 className="font-bold text-[20px] mt-4 group-hover:text-red-500 transition">10.5k</h1>
          <p className="text-[14px] text-gray-700 group-hover:text-gray-900 transition">Sellers active on our site</p>
        </div>
        <div className="group border text-center w-[200px] h-[170px] p-4 hover:shadow-lg rounded-md transition">
          <img className="w-16 mx-auto mt-2 group-hover:scale-110 transition" src={img2} alt="" />
          <h1 className="font-bold text-[20px] mt-4 group-hover:text-red-500 transition">10.5k</h1>
          <p className="text-[14px] text-gray-700 group-hover:text-gray-900 transition">Sellers active on our site</p>
        </div>
      </div>
      <div className="flex flex-col lg:flex-row justify-between mt-[50px] gap-6">
        <div className="group w-[300px] rounded-md bg-[#e2e2e2] p-4 hover:shadow-xl transition">
          <img src={img3} alt="" className="w-[210px] mx-auto rounded-md group-hover:scale-105 transition" />
          <h1 className="mt-4 text-[30px] font-semibold group-hover:text-red-500 transition">Tom Cruise</h1>
          <p className="text-[13px] text-gray-700">Founder & Chairman</p>
          <div className="flex gap-2 mt-2 ">
            <img src={img5} alt="" className="w-6 h-6 group-hover:scale-110 transition" />
            <img src={img6} alt="" className="w-6 h-6 group-hover:scale-110 transition" />
            <img src={img7} alt="" className="w-6 h-6 group-hover:scale-110 transition" />
          </div>
        </div>
        <div className="group w-[300px] rounded-md bg-[#e2e2e2] p-4 hover:shadow-xl transition">
          <img src={img3} alt="" className="w-[210px] mx-auto rounded-md group-hover:scale-105 transition" />
          <h1 className="mt-4 text-[30px] font-semibold group-hover:text-red-500 transition">Tom Cruise</h1>
          <p className="text-[13px] text-gray-700">Founder & Chairman</p>
          <div className="flex gap-2 mt-2 ">
            <img src={img5} alt="" className="w-6 h-6 group-hover:scale-110 transition" />
            <img src={img6} alt="" className="w-6 h-6 group-hover:scale-110 transition" />
            <img src={img7} alt="" className="w-6 h-6 group-hover:scale-110 transition" />
          </div>
        </div>
        <div className="group w-[300px] rounded-md bg-[#e2e2e2] p-4 hover:shadow-xl transition">
          <img src={img3} alt="" className="w-[210px] mx-auto rounded-md group-hover:scale-105 transition" />
          <h1 className="mt-4 text-[30px] font-semibold group-hover:text-red-500 transition">Tom Cruise</h1>
          <p className="text-[13px] text-gray-700">Founder & Chairman</p>
          <div className="flex gap-2 mt-2">
            <img src={img5} alt="" className="w-6 h-6 group-hover:scale-110 transition" />
            <img src={img6} alt="" className="w-6 h-6 group-hover:scale-110 transition" />
            <img src={img7} alt="" className="w-6 h-6 group-hover:scale-110 transition" />
          </div>
        </div>
      </div>

      <Loader/>
    </div>
  )
}
