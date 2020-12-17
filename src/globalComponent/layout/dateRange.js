import React from 'react'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function GlobalDateRange  ({
  ...props
}) {

  const DownloadReport = () => {
    toast.success('Report Download Initiated')
  }

  return(
    <div className="w-full p-5">
      <form className="border border-gray-200 p-5 rounded">
        <div className="flex flex-wrap -mx-3">
          <div className="w-full md:w-1/3 px-3">
            <label className="block uppercase tracking-wide text-gray-200 text-xs font-bold mb-2" for="startDate">
              Start Date
    </label>
            <input className="appearance-none block w-full bg-gray-100 text-gray-200 border border-gray-100 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-200" id="startDate" type="date" placeholder="Jane" />
          </div>
          <div className="w-full md:w-1/3 px-3">
            <label className="block uppercase tracking-wide text-gray-200 text-xs font-bold mb-2" for="endDate">
              End Date
    </label>
            <input className="appearance-none block w-full bg-gray-100 text-gray-200 border border-gray-100 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-200" id="endDate" type="date" placeholder="Doe" />
          </div>
          <div className="w-full md:w-1/3 px-3 flex flex-col justify-center">
            <button type="submit" onClick={() => { DownloadReport() }} className="bg-blue-500 hover:bg-blue-700 focus:outline-none text-white font-bold py-2 px-8 rounded uppercase" type="button">Download PDF</button>
            <ToastContainer />
          </div>
        </div>

      </form>
    </div>
  )}

export default GlobalDateRange