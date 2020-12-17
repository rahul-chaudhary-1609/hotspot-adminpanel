import React, { useEffect ,useState} from "react";
import { withRouter } from 'react-router-dom'

function ResetPassword({
    history,
    ...props
}) {


    return (
        <>
           <div className="bg-white h-screen text-base font-body">
  <div className="w-full flex flex-wrap">
    <div className="w-full md:w-1/2 flex items-center justify-center">
      <div className="flex flex-col justify-center md:justify-start my-auto pt-8 md:pt-0 px-8 md:px-16 lg:px-32">
        <a href="/" className="flex justify-center">
          <img src={require('../../assets/img/logo.png')} alt=""/>
        </a>
        <h1 className="font-bold text-center md:text-4xl lg:text-5xl text-teal-250">Reset Password</h1>
        <div className="reset-password-module">
          <p className="text-gray-200 text-center text-base">Setup your password</p>
          <form className="flex flex-col pt-3 md:pt-8" onsubmit="event.preventDefault();">
            <div className="flex flex-col pt-4">
              <label for="newPassword" className="text-base text-gray-200">New Password</label>
              <div className="relative mt-1">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                  <svg viewBox="0 0 20 20" className="lock-closed w-6 h-6 fill-current text-gray-200"><path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd"></path></svg>
                </div>
                <input type="password" id="newPassword" placeholder="******" className="bg-blue-100 appearance-none border-0 rounded-full w-full py-2 px-3 text-gray-200 text-base pl-12 mt-1 leading-tight focus:outline-none focus:shadow-outline h-12"/>
              </div>
            </div>
            
            <div className="flex flex-col pt-4">
              <label for="confirmPassword" className="text-base text-gray-200">Confirm New Password</label>
              <div className="relative mt-1">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                  <svg viewBox="0 0 20 20" className="lock-closed w-6 h-6 fill-current text-gray-200"><path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd"></path></svg>
                </div>
                <input type="password" id="confirmPassword" placeholder="******" className="bg-blue-100 appearance-none border-0 rounded-full w-full py-2 px-3 text-gray-200 text-base pl-12 mt-1 leading-tight focus:outline-none focus:shadow-outline h-12"/>
              </div>
            </div>

            <input type="submit" value="Submit" className="bg-red-700 text-white font-semibold text-lg hover:bg-red-600 p-2 mt-8 h-12 rounded-full" id="resetPasswordBtn"/>
          </form>
        </div>
        {/* <!-- Link sent module --> */}
        <div className="success-model hidden">
          <div className="my-10 rounded-lg mx-auto border border-green-500 bg-green-100 py-10 px-12 w-full md:w-3/4 flex flex-wrap justify-center items-center flex-col" >
            <div className="w-32 h-32 rounded-full border border-green-500 flex items-center justify-center mb-2">
              <svg viewBox="0 0 20 20" className="check w-12 h-12 fill-current text-green-500"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>
            </div>
            <p className="text-lg text-green-500 text-center">Your password has been reset successfully</p>
          </div>
        </div>
      </div>
    </div>
    <div className="w-1/2 h-screen bg-gray-100 justify-center items-center hidden md:flex">
      <img src={require("../../assets/img/work-time-amico.png")} alt="" className=""/>
    </div>
  </div>
 
</div>
        </>
    )
}

export default (withRouter(ResetPassword))

