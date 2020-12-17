import React, { useEffect } from 'react';
import { withRouter } from 'react-router';

function FAQ({
  history,
  ...props
}) {

  return (
    <div className='main-content pb-16 md:pb-5 flex-1 pt-20 px-2'>
      <div className="p-4 md:p-8 mt-6 lg:mt-0 rounded shadow bg-white">
        <h3 className="text-2xl text-gray-400 font-bold mb-6">Manage FAQ</h3>
        <div className="flex justify-end">
          <a href="#" className="rounded-md py-2 px-4 bg-blue-500 text-white">Edit FAQ</a>
        </div>
        <div className="flex flex-col">
          <div className="flex flex-col text-base mb-6">
            <h4 className="title mb-3 font-semibold text-lg">What is Lorem Ipsum?</h4>
            <div className="description text-gray-200">
              <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
              </p>
            </div>
          </div>
          <div className="flex flex-col text-base mb-6">
            <h4 className="title mb-3 font-semibold text-lg">What is Lorem Ipsum?</h4>
            <div className="description text-gray-200">
              <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
              </p>
            </div>
          </div>
          <div className="flex flex-col text-base mb-6">
            <h4 className="title mb-3 font-semibold text-lg">What is Lorem Ipsum?</h4>
            <div className="description text-gray-200">
              <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
              </p>
            </div>
          </div>
          <div className="flex flex-col text-base mb-6">
            <h4 className="title mb-3 font-semibold text-lg">What is Lorem Ipsum?</h4>
            <div className="description text-gray-200">
              <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default withRouter(FAQ)