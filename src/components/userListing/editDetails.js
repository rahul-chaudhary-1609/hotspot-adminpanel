import React from 'react';
import { withRouter } from 'react-router';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function EditDetails({
  history,
  ...props
}) {

  const updateDetails = () => {
    toast.success('Profile Updated Successfully')
  }

  return (
    <>
      <div className='main-content pb-16 md:pb-5 flex-1 pt-20 px-2'>
        <div className="p-4 md:p-8 mt-6 lg:mt-0 rounded shadow bg-white w-3/4 mx-auto">
          <h3 className="text-lg font-bold mb-4">Edit Info</h3>
          <form action="" className="w-full max-w-full text-base text-gray-200">
            <div class="flex flex-wrap -mx-3 mb-6 justify-center">
              <div class="w-40 px-3 mb-6 flex justify-center flex-wrap">
                <div class="border rounded-full overflow-hidden w-24 h-24">
                  <img id="avtar" class="rounded-full h-full w-full" alt="profile-img" src={require('../../assets/img/icon-user.png')} accept="image/*" />
                </div>
                <label for="upload" class="w-24 block ">
                  <div class="w-full px-2 py-1 my-2 flex justify-around items-center bg-gray-400 rounded-lg text-white" title="Upload a photo...">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg> Upload
                  <input type="file" id="upload" style={{ display: "none" }} accept="image/x-png,image/gif,image/jpeg" />
                  </div>
                </label>
                <span class="text-red-500 text-xs italic" id="uploadError"></span>
              </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label className="block tracking-wide mb-2 text-gray-300" for="first-name">First Name</label>
                <input className="appearance-none block w-full bg-gray-100 border border-red-500 rounded-full py-3 px-6 mb-3 leading-tight focus:outline-none focus:bg-white" id="first-name" type="text" placeholder="Jane" />
                <p className="text-red-500 text-xs italic">Please fill out this field.</p>
              </div>
              <div className="w-full md:w-1/2 px-3">
                <label className="block tracking-wide mb-2 text-gray-300" for="last-name">Last Name</label>
                <input className="appearance-none block w-full bg-gray-100 border border-gray-100 rounded-full py-3 px-6 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-200" id="last-name" type="text" placeholder="Doe" />
              </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label className="block tracking-wide mb-2 text-gray-300" for="email">Email Address</label>
                <input className="appearance-none block w-full bg-gray-100 border border-gray-100 rounded-full py-3 px-6 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-200" id="email" type="email" placeholder="jhon.doe@gmail.com" />
              </div>
              <div className="w-full md:w-1/2 px-3">
                <label className="block tracking-wide text-gray-300 mb-2" for="mob">Contact Number</label>
                <input className="appearance-none block w-full bg-gray-100 border border-gray-100 rounded-full py-3 px-6 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-200" id="mob" type="text" placeholder="+91 + 9876543210" />
              </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label className="block tracking-wide mb-2 text-gray-300" for="gender">Gender</label>
                <div className="relative">
                  <select className="block appearance-none w-full bg-gray-100 border border-gray-100 py-3 px-4 pr-8 rounded-full leading-tight focus:outline-none focus:bg-white focus:border-gray-200" id="gender">
                    <option value="M">Male</option>
                    <option value="F">Female</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg viewBox="0 0 20 20" fill="currentColor" className="text-gray-200 chevron-down w-6 h-6"><path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                  </div>
                </div>
              </div>
              <div className="w-full md:w-1/2 px-3">
                <label className="block tracking-wide text-gray-300 mb-2" for="height">Height</label>
                <input className="appearance-none block w-full bg-gray-100 border border-gray-100 rounded-full py-3 px-6 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-200" id="height" type="text" placeholder="185 Cm" />
              </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label className="block tracking-wide mb-2 text-gray-300" for="weight">Weight</label>
                <input className="appearance-none block w-full bg-gray-100 border border-gray-100 rounded-full py-3 px-6 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-200" id="weight" type="text" placeholder="65 Kg" />
              </div>
              <div className="w-full md:w-1/2 px-3">
                <label className="block tracking-wide text-gray-300 mb-2" for="dob">D.O.B.</label>
                <input className="appearance-none block w-full bg-gray-100 border border-gray-100 rounded-full py-3 px-6 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-200" id="dob" type="date" placeholder="" />
              </div>
            </div>
            <div className="md:flex md:justify-center">
              <div className="md:w-2/6 text-center">
                <button onClick={() => { updateDetails() }} className="shadow bg-green-500 hover:bg-green-400 focus:shadow-outline focus:outline-none rounded-full text-white font-bold py-4 px-8 uppercase" type="button">
                  Update
              </button>
                <ToastContainer />
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}
export default withRouter(EditDetails)