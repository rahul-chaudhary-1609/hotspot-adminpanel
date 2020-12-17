import React, { useEffect } from 'react';
import { withRouter } from 'react-router';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function TermsCondition({
  history,
  ...props
}) {

  const updateDetails = () => {
    toast.success('Terms And Conditions Updated Successfully')
  }

  return (
    <div className='main-content pb-16 md:pb-5 flex-1 pt-20 px-2'>
      <div className="mt-6 lg:mt-0 rounded shadow bg-white">
        <h3 className="text-2xl text-gray-400 font-bold p-4 md:p-6">Terms & Conditions</h3>
        <div className="flex flex-wrap border-t border-gray-100">
          <div className="w-full md:w-1/2 border-r border-gray-100 p-4 md:px-8 ">
            <form action="" className="w-full max-w-full text-gray-300 text-base">
              <div className="flex flex-wrap -mx-3 mb-6">
                <label className="block tracking-wide mb-2" for="tc">
                  Enter your Term & Condition
                </label>
                <textarea className="appearance-none block w-full bg-gray-100 border border-gray-100 rounded-lg py-3 px-4 leading-tight focus:outline-none focus:bg-white resize-none focus:border-gray-200" id="tc" placeholder="T&C" rows="15" ></textarea>
              </div>
              <div className="flex justify-end">
                <button type="submit" onClick={() => { updateDetails() }} className="shadow bg-green-500 hover:bg-green-400 focus:shadow-outline focus:outline-none rounded-full text-white font-bold py-4 px-8 uppercase" type="button">Submit</button>
                <ToastContainer />
              </div>
            </form>
          </div>
          <div className="w-full md:w-1/2 p-4 md:p-8">
            <form action="" className="w-full max-w-full h-full text-gray-300 text-base">
              <div className="flex flex-col flex-start justify-center h-full -mx-3">
                <label className="block tracking-wide mb-2">
                  Upload PDF file
                </label>
                <div className="relative m-auto">
                  <button className="btn py-20 px-16 border-2 border-gray-200 rounded-lg bg-gray-100 border-dashed flex items-center flex-col">
                    <img src={require("../assets/img/upload.png")} />
                    <span>Upload the pdf file</span>
                  </button>
                  <input type='file' className="absolute opacity-0 inset-0 m-auto" accept=".pdf" />
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default withRouter(TermsCondition)