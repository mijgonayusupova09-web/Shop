import React from 'react'
import img1 from "../../../assets/Services (1).png"

export const Loader = () => {
  const items = [
    {
      title: "FREE AND FAST DELIVERY",
      desc: "Free delivery for all orders over $140",
    },
    {
      title: "FREE AND FAST DELIVERY",
      desc: "Free delivery for all orders over $140",
    },
    {
      title: "FREE AND FAST DELIVERY",
      desc: "Free delivery for all orders over $140",
    },
  ]

  return (
    <div className="mt-24 px-4">
      <div className="flex flex-col md:flex-row justify-evenly items-center text-center gap-8">
        {items.map((item, index) => (
          <div key={index} className="group p-4 hover:bg-gray-100 rounded-md transition">
            <img className="mx-auto w-20 h-20 mb-4 group-hover:scale-110 transition" src={img1} alt={item.title} />
            <h1 className="font-bold text-lg mb-2 group-hover:text-[#DB4444] transition">{item.title}</h1>
            <p className="text-sm text-gray-600">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
