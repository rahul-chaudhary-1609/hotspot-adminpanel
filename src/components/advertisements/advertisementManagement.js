import React, { useState } from 'react';
import { withRouter } from 'react-router';
import { confirmAlert } from 'react-confirm-alert';
import ReactTable from "react-table";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function AdvertisementManagement({
    history,
    ...props
}) {

    const [isEdit, setIsEdit] = useState(false);
    const [isEditBanner, setIsEditBanner] = useState(false);
    const [closeDelete, setDelete] = useState('false');

    const editAdvertisement = () => {
        window.scrollTo(0, 0)
        setIsEdit(true)
    }

    const OnCancel = () => {
        setIsEdit(false)
    }
    const updateBanner = () => {
        setIsEditBanner(true)
    }

    const UpdateDetails = () => {
        toast.success('Details Updated Successfully')
    }

    function handleUserDetails() {
        toast.error('Request Deleted Successfully')
    }

    const submit = () => {
        confirmAlert({
            title: 'Are you sure you want to delete this?',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => handleUserDetails(),
                    className: "btnn btn-wid deletebtn"
                },
                {
                    label: 'No',
                    onClick: () => () => setDelete('true'),
                    className: "btnn btn-wid cancelbtn"
                }
            ],
            closeOnEscape: true,
            closeOnClickOutside: true
        })
    };

    const data = [{ Title: "Lorem ipsum ", Description: 'Lorem ipsum dolor sit amet', Url: 'https://tailwindcss.com/', Banner: 'work-time-amico.png' }];
    return (
        <>
            <div className='main-content pb-16 md:pb-5 flex-1 pt-20 px-2'>
                <div className="p-4 md:p-8 mt-6 lg:mt-0 rounded shadow bg-white ">
                    <h3 className="text-2xl text-black font-bold py-4 md:py-6">{isEdit ? 'Edit Details' : 'Add New Advertisement'}</h3>
                    <div className="flex flex-wrap ">
                        <form className="w-full text-base">
                            <div className="flex flex-wrap -mx-3 mb-6">
                                <div className="w-full px-3">
                                    <label className="block tracking-wide mb-2 text-gray-300" for="title">
                                        Title
                                    </label>
                                    <input value={isEdit ? data[0].Title : ''} className="appearance-none block w-full bg-gray-100 border border-gray-100 rounded-full py-3 px-6 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-200" id="title" type="text" placeholder="title" />
                                </div>
                            </div>
                            <div className="flex flex-wrap -mx-3 mb-6">
                                <div className="w-full px-3">
                                    <label className="block tracking-wide mb-2 text-gray-300" for="description">
                                        Description
                                    </label>
                                    <textarea value={isEdit ? data[0].Description : ''} className="w-full rounded-lg resize-none bg-gray-100 border text-lg border-gray-100 focus:border-gray-300 focus:outline-none p-4" placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit." rows='5' id="description"></textarea>
                                </div>
                            </div>
                            <div className="flex flex-wrap -mx-3 mb-6">
                                <div className="w-full px-3">
                                    <label className="block tracking-wide mb-2 text-gray-300" for="url">
                                        URL
                                    </label>
                                    <input value={isEdit ? data[0].Url : ''} className="appearance-none block w-full bg-gray-100 border border-gray-100 rounded-full py-3 px-6 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-200" id="url" type="url" placeholder="https://tailwindcss.com/" />
                                </div>
                            </div>
                            <div className="flex flex-wrap -mx-3 mb-6">
                                <div className="w-full px-3">
                                    <label className="block tracking-wide mb-2 text-gray-300" for="url">
                                        Banner
                                    </label>

                                    {isEditBanner ? <input className="appearance-none block w-full py-3 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-200" id="url" type="file" /> : isEdit ? <><div className="w-32 h-32">
                                        <img src={require('../../assets/img/work-time-amico.png')} alt="" />
                                    </div>
                                        <a onClick={() => { updateBanner() }}><svg fill="currentColor" className="text-green-600 pencil w-5 h-5"><path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"></path></svg></a> {data[0].Banner}</>
                                        : <input className="appearance-none block w-full py-3 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-200" id="url" type="file" />}
                                </div>
                            </div>
                            <div className="w-full flex justify-center">
                                <button className="shadow bg-green-500 hover:bg-green-400 focus:shadow-outline focus:outline-none rounded-full text-white font-bold py-3 px-6 uppercase " style={{ marginRight: "5px" }} onClick={() => { UpdateDetails() }} type="button">
                                    Save
                               </button>
                                <ToastContainer />
                                {isEdit ? <button className="shadow bg-red-500 hover:bg-red-400 focus:shadow-outline focus:outline-none rounded-full text-white font-bold py-3 px-6 uppercase" onClick={() => { OnCancel() }}>
                                    Cancel
                                </button> : ''}
                            </div>
                        </form>

                    </div>
                    <h3 className="text-2xl text-black font-bold py-4 md:py-6" style={{ paddingBottom: "0px" }}>Advertisements List</h3>
                    <div id="adv" className="stripe hover" style={{ paddingTop: "1em", paddingBottom: "1em", width: "100%" }}>
                        <ReactTable
                            showPagination={false}
                            minRows={0}
                            NoDataComponent={() => null}
                            defaultPageSize={10}
                            data={data}
                            className="-highlight"
                            columns={[
                                {
                                    id: "Title",
                                    Header: "Title",
                                    className: "text-center view-details",
                                    accessor: () => {
                                        return <>
                                            <div className="w-40"> Lorem ipsum
                                            </div></>
                                    }
                                },
                                {
                                    id: "Description",
                                    Header: "Description",
                                    className: "text-center view-details",
                                    accessor: () => {
                                        return <div className="w-40">Lorem ipsum dolor sit
                                               {/* amet, Lorem ipsum dolor sit amet */}
                                        </div>
                                    }
                                },
                                {
                                    id: "Url",
                                    Header: "Url",
                                    className: "text-center view-details",
                                    accessor: () => {
                                        return <div><a href='https://tailwindcss.com'>https://tailwindcss.com</a></div>
                                    }
                                },
                                {
                                    id: "Banner",
                                    Header: "Banner",
                                    className: "text-center view-details",
                                    accessor: () => {
                                        return <> <div className="w-32 h-32 ">
                                            <img src={require('../../assets/img/work-time-amico.png')} alt="" />
                                        </div></>
                                    }
                                },
                                {
                                    id: "Action",
                                    Header: "Action",
                                    className: "text-center view-details",
                                    accessor: () => {
                                        return <div className="text-center">
                                            <a onClick={() => { editAdvertisement() }} className="inline-block mr-1 border border-green-600 rounded-full p-2" title="Edit Details">
                                                <svg viewBox="0 0 20 20" fill="currentColor" className="text-green-600 pencil w-5 h-5"><path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"></path></svg>
                                            </a>
                                            <a onClick={closeDelete == true ? '' : () => submit()} className="inline-block border rounded-full p-2 border-red-600" title="Delete Details">
                                                <svg viewBox="0 0 20 20" fill="currentColor" className="text-red-600 trash w-5 h-5"><path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd"></path></svg>
                                            </a>
                                            <ToastContainer />
                                        </div>
                                    }
                                },
                            ]}
                            className="-highlight"
                        />
                    </div>
                </div>
            </div>
        </>
    )
}

export default withRouter(AdvertisementManagement)