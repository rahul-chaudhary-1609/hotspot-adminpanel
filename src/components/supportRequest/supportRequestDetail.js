import React, { useState } from 'react';
import { withRouter } from 'react-router';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function SupportRequestDetail({
    history,
    ...props
}) {

    const sendDetails = () => {
        toast.success('Request Sent Successfully')
    }

    return (
        <div className='main-content pb-16 md:pb-5 flex-1 pt-20 px-2'>
            <div className="p-4 md:p-8 mt-6 lg:mt-0 rounded shadow bg-white">
                <h3 className="text-2xl text-gray-400 font-bold mb-6">Support Request Detail</h3>
                <form action="" className="w-full max-w-full text-gray-300 text-base">
                    <div className="flex flex-wrap -mx-3 mb-6">
                        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                            <label className="block tracking-wide mb-2" for="name">Name</label>
                            <input className="appearance-none block w-full bg-gray-100 border border-gray-100 rounded-full py-3 px-4 mb-3 leading-tight focus:outline-none" id="name" type="text" placeholder="Name" value="Jhone" readonly />
                        </div>
                        <div className="w-full md:w-1/2 px-3">
                            <label className="block tracking-wide mb-2" for="email">Email</label>
                            <input className="appearance-none block w-full bg-gray-100 border border-gray-100 rounded-full py-3 px-4 leading-tight focus:outline-none" id="email" type="email" placeholder="Email" value="Cruise@gamil.com" readonly />
                        </div>
                    </div>
                    <div className="flex flex-wrap -mx-3 mb-6">
                        <div className="w-full px-3">
                            <label className="block tracking-wide mb-2" for="title">Title</label>
                            <input className="appearance-none block w-full bg-gray-100 border border-gray-100 rounded-full py-3 px-4 leading-tight focus:outline-none" id="title" type="text" placeholder="Title" value="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Arcu vulputate eu elementum ultrices diam nec. Dignissim quis." readonly />
                        </div>
                    </div>
                    <div className="flex flex-wrap -mx-3 mb-6">
                        <div className="w-full px-3">
                            <label className="block tracking-wide mb-2" for="msg">Message</label>
                            <textarea className="appearance-none block w-full bg-gray-100 border border-gray-100 rounded-lg py-3 px-4 leading-tight focus:outline-none resize-none" id="msg" placeholder="Message" rows="7" readonly>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Convallis turpis proin lacinia amet odio nisi. In fames dignissim sem nullam vestibulum consectetur ornare. Adipiscing sit cursus tempor velit. Ut orci convallis dignissim scelerisque netus. Volutpat laoreet est viverra eleifend velit justo neque. Eget leo turpis viverra amet mauris risus varius tellus felis. Arcu nisi, vitae sem semper arcu dolor purus, nunc sit. Potenti aliquam habitant suspendisse blandit pharetra sagittis.
                                Ultrices in lobortis arcu ipsum, egestas malesuada nisi egestas. Aliquet turpis sollicitudin urna in hac. Rhoncus morbi fames gravida at tristique hendrerit quis nisl. Purus, ligula mauris nisi gravida et in maecenas mi libero. Sit natoque pellentesque mi porta et. Dignissim.
                                 </textarea>
                        </div>
                    </div>
                    <div className="flex flex-wrap -mx-3 mb-6">
                        <div className="w-full px-3">
                            <label className="block tracking-wide mb-2" for="reply">Reply</label>
                            <textarea className="appearance-none block w-full bg-gray-100 border border-gray-100 rounded-lg py-3 px-4 leading-tight focus:outline-none focus:bg-white resize-none focus:border-gray-200" id="reply" placeholder="Reply Message" rows="7" ></textarea>
                        </div>
                    </div>
                    <div className="flex justify-end">
                        <button className="shadow bg-green-500 hover:bg-green-400 focus:shadow-outline focus:outline-none rounded-full text-white font-bold py-4 px-8 uppercase" type="button" onClick={() => { sendDetails() }}>Send</button>
                        <ToastContainer />
                    </div>
                </form>
            </div>
        </div>
    )
}

export default withRouter(SupportRequestDetail)