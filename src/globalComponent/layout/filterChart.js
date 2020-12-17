import React from 'react'

const GlobalFilterChart = ({
    ...props
}) => (
        <>
            <h3 className="font-bold text-gray-400 text-lg mb-6 px-4">Filter Chart</h3>
            <div className='flex flex-row p-4'>
                <form className="w-full max-w-full">
                    <div className="flex flex-wrap -mx-3 mb-6">
                        <div className="w-full md:w-1/5 px-3 mb-6 md:mb-0">
                            <select id="page" value={100} style={{width:"145px"}} className="mar-15 pad-7 shadow bg-white-500 hover:bg-white-400 focus:shadow-outline focus:outline-none text-black py-2 px-4 rounded">
                                <option value="10">Total Doctors</option>
                                <option value="25">Total Users</option>
                                <option value="50">Total Ads View</option>
                            </select>
                        </div>
                        <div className="w-full md:w-1/5 px-3 mb-6 md:mb-0">
                            <select id="page" value={100} style={{width:"145px"}} className="mar-15 pad-7 shadow bg-darkslategrey-500 hover:bg-darkslategrey-400 focus:shadow-outline focus:outline-none text-black py-2 px-4 rounded">
                                <option value="10">Day</option>
                                <option value="25">Week</option>
                                <option value="50">Month</option>
                                <option value="100">Year</option>
                            </select>
                        </div>
                        <div className="w-full md:w-1/5 px-3 mb-6 md:mb-0">
                                <button className="mar-15 pad-7 shadow bg-blue-500 hover:bg-blue-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded">
                                    Filter
            </button>
                            </div>
                    </div>
                </form>
            </div>
        </>
    );

export default GlobalFilterChart