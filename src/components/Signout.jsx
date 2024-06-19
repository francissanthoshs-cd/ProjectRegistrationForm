import React, { useEffect, useState } from 'react'
function Signout() {
    const [hidden,setHidden]=useState(true);
  return (
    <div className={`${ hidden ? 'flex' :'hidden'}  items-center justify-center absolute z-10 top-[50%] left-[40%]`}>
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-semibold mb-4">Are you sure you want to sign out?</h1>
        <div className="flex justify-center space-x-4">
          <button
            // onClick={() => handleSignOut(true)}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none">
            Yes
          </button>
          <button
            onClick={() => setHidden(false)}
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400 focus:outline-none">
            No
          </button>
        </div>
      </div>
    </div>
  )
}

export default Signout