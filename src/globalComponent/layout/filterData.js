import React from 'react'

const GlobalFilterData = ({
  ...props
}) => (
    <>
    <h3 className="font-bold text-gray-400 text-lg mb-6 px-4">Filter Data</h3>
    <div className='flex flex-row p-4'>
      <form  className="w-full max-w-full">
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <label className="block text-gray-200 font-bold mb-2" for="name">
              Name
            </label>
            <input className="appearance-none block w-full bg-gray-100 text-gray-200 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="name" type="text" placeholder="Jane"/>
          </div>
          <div className="w-full md:w-1/3 px-3">
            <label className="block text-gray-200 font-bold mb-2" for="email">
              Email
            </label>
            <input className="appearance-none block w-full bg-gray-100 text-gray-200 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="email" type="email" placeholder="doe@gmail.com"/>
          </div>
          <div className="w-full md:w-1/3 px-3">
            <label className="block text-gray-200 font-bold mb-2" for="phone">
              Phone
            </label>
            <input className="appearance-none block w-full bg-gray-100 text-gray-200 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="phone" type="text" placeholder="xxxxxxxxx"/>
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full flex items-center justify-center">
            <button className="shadow bg-blue-500 hover:bg-blue-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" type="button">
              Filter
            </button>
          </div>
        </div>
      </form>
    </div>
    </>
  );

export default GlobalFilterData