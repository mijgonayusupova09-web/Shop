import React from 'react'

export const Account = () => {
  return (
    <div className='w-[90%] m-auto  mt-[60px]'>
      <div className="">
        <span className='text-[grey]'>Home</span>
        <span className='ml-[5px]'>/</span>
        <span className='ml-[5px]'>Cart</span>
      </div>
      <div className="max-w-6xl mx-auto px-6 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
          <aside className="space-y-6">
            <div>
              <h3 className="font-semibold mb-3">Manage My Account</h3>
              <ul className="space-y-2 text-sm">
                <li className="text-red-500">My Profile</li>
                <li className="text-gray-500">Address Book</li>
                <li className="text-gray-500">My Payment Options</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-3">My Orders</h3>
              <ul className="space-y-2 text-sm text-gray-500">
                <li>My Returns</li>
                <li>My Cancellations</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-3">My Wishlist</h3>
            </div>
          </aside>
          <section className="lg:col-span-3 bg-white shadow rounded-lg p-8">
            <h2 className="text-lg font-semibold mb-6 text-red-500">
              Profile
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div>
                <label className="text-sm text-gray-500">First name</label>
                <input
                  type="text"
                  defaultValue="Md"
                  className="w-full border rounded px-3 py-2 mt-1"
                />
              </div>

              <div>
                <label className="text-sm text-gray-500">Last name</label>
                <input
                  type="text"
                  defaultValue="Risel"
                  className="w-full border rounded px-3 py-2 mt-1"
                />
              </div>

              <div>
                <label className="text-sm text-gray-500">Email address</label>
                <input
                  type="email"
                  defaultValue="rims111@gmail.com"
                  className="w-full border rounded px-3 py-2 mt-1"
                />
              </div>

              <div>
                <label className="text-sm text-gray-500">Street address</label>
                <input
                  type="text"
                  defaultValue="Kingston, 5236, United State"
                  className="w-full border rounded px-3 py-2 mt-1"
                />
              </div>
            </div>
            <h3 className="font-semibold mb-4">Password Changes</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <input
                type="password"
                placeholder="Current password"
                className="border rounded px-3 py-2"
              />
              <div></div>
              <input
                type="password"
                placeholder="New password"
                className="border rounded px-3 py-2"
              />
              <input
                type="password"
                placeholder="Confirm new password"
                className="border rounded px-3 py-2"
              />
            </div>
            <div className="flex justify-end gap-4">
              <button className="text-gray-500">Cancel</button>
              <button className="bg-red-500 text-white px-6 py-2 rounded">
                Save Changes
              </button>
              <button onClick={() => [localStorage.removeItem("token"), window.location="/"]} className="bg-red-600 text-white px-6 py-2 rounded">
                Log out
              </button>
            </div>
          </section>

        </div>
      </div>

    </div>
  )
}
