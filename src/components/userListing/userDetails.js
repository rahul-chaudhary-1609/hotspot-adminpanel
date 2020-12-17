import React, { useEffect } from 'react';
import { withRouter } from 'react-router';

function UserDetails({
  history,
  ...props
}) {

  return (
    <div className='main-content pb-16 md:pb-5 flex-1 pt-20 px-2'>
      <div className="p-4 md:p-8 mt-6 lg:mt-0 rounded shadow bg-white">
        <h3 className="text-2xl text-gray-400 font-bold mb-6">User Details</h3>
        <div class="flex flex-wrap -mx-3 justify-center">
          <div class="w-40 px-3 mb-6 flex justify-center flex-wrap">
            <div class="border rounded-full overflow-hidden w-24 h-24">
              <img id="avtar" class="rounded-full h-full w-full" alt="profile-img" src={require('../../assets/img/icon-user.png')} accept="image/*"/>
            </div>              
          </div>
        </div>
        <div className="form-layout text-base border border-gray-200">
          <div className="flex flex-row items-center ">
            <div className="bg-gray-100 font-semibold py-4 px-6 w-1/3 text-right">User Name</div>
            <div className="px-8">Jonathan Reinink</div>
          </div>
          <div className="flex flex-row items-center border-t border-gray-200">
            <div className="bg-gray-100 font-semibold py-4 px-6 w-1/3 text-right">Email ID</div>
            <div className="px-8">tom.cruise@gmail.com</div>
          </div>
          <div className="flex flex-row items-center border-t border-gray-200">
            <div className="bg-gray-100 font-semibold py-4 px-6 w-1/3 text-right">Phone Number</div>
            <div className="px-8">+91- 9876543210</div>
          </div>
          <div className="flex flex-row items-center border-t border-gray-200">
            <div className="bg-gray-100 font-semibold py-4 px-6 w-1/3 text-right">Gender</div>
            <div className="px-8">Male</div>
          </div>
          <div className="flex flex-row items-center border-t border-gray-200">
            <div className="bg-gray-100 font-semibold py-4 px-6 w-1/3 text-right">Height</div>
            <div className="px-8">175cm</div>
          </div>
          <div className="flex flex-row items-center border-t border-gray-200">
            <div className="bg-gray-100 font-semibold py-4 px-6 w-1/3 text-right">Weight</div>
            <div className="px-8">75Kg</div>
          </div>
          <div className="flex flex-row items-center border-t border-gray-200">
            <div className="bg-gray-100 font-semibold py-4 px-6 w-1/3 text-right">Date of Birth</div>
            <div className="px-8">15/12/1981</div>
          </div>
          <div className="flex flex-row items-center border-t border-gray-200">
            <div className="bg-gray-100 font-semibold py-4 px-6 w-1/3 text-right">Registration Date</div>
            <div className="px-8">10/08/2020</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default withRouter(UserDetails)