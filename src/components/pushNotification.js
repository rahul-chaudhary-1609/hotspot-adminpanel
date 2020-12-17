import React from 'react';
import { withRouter } from 'react-router';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function PushNotification({
  history,
  ...props
}) {

  const updateDetails = () => {
    toast.success('Notification Sent Successfully')
  }

  return (
    <div className='main-content pb-16 md:pb-5 flex-1 pt-20 px-2'>
      <div className="p-4 md:p-8 mt-6 lg:mt-0 rounded shadow bg-white">
        <h3 className="font-bold text-2xl text-gray-400">Push Notifications</h3>
        <div className="flex flex-wrap -mx-3 mb-6 ">
          <div className="w-full px-3 mb-6 md:mb-0 " style={{textAlign:"right"}}>
            <select id="page" value={10} style={{ width: "145px" }} className="mar-10 pad-7 shadow bg-white-500 hover:bg-white-400 focus:shadow-outline focus:outline-none text-black py-2 px-4 rounded">
              <option value="10">Filter 1</option>
              <option value="25">Filter 2</option>
              <option value="100">Filter 3</option>
            </select></div>
        </div>
        <form action="" className="mt-6">
          <div className="flex flex-col mb-6">
            <label for="pushNoti" className=" block tracking-wide text-gray-400 mb-2">Enter your message here :</label>
            <textarea className="rounded-lg resize-none bg-gray-100 border text-lg text-gray-300 border-gray-100 focus:border-gray-300 focus:outline-none p-4" placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit." rows='5'></textarea>
          </div>
          <div className="flex justify-end">
            <button type="submit" onClick={() => { updateDetails() }} className="shadow bg-green-500 hover:bg-green-400 focus:shadow-outline focus:outline-none rounded-full text-white font-bold py-4 px-8 uppercase" type="button">Send</button>
            <ToastContainer />
          </div>
        </form>

      </div>
    </div>
  )
}

export default withRouter(PushNotification)