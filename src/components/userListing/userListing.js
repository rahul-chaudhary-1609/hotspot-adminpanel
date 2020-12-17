import React, { useState } from 'react';
import { withRouter } from 'react-router';
import ReactTable from "react-table";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Pagination from "react-js-pagination";
import 'react-table/react-table.css';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css'
import SearchBox from '../../globalComponent/layout/search';
import GlobalFilterData from '../../globalComponent/layout/filterData'

function UserListing({
  history,
  ...props
}) {

  const [activePage, setCurrentPage] = useState(1);
  const [closeDelete, setDelete] = useState('false');

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber)
  };

  function handleEditDetails() {
    history.push('/editDetails')
  }
  function handleUserDelete() {
    toast.error('Profile Deleted Successfully')
  }

  const submit = () => {
    confirmAlert({
      title: 'Are you sure you want to delete this?',
      buttons: [
        {
          label: 'Yes',
          onClick: () => handleUserDelete(),
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


  const data = [{ UserName: "Jonathan Reinink", EmailID: 'tom.cruise@gmail.com', PhoneNumber: '+91- 9876543210', Status: 'Active' }];
  return (
    <>
      <div className='main-content pb-16 md:pb-5 flex-1 pt-20 px-2'>
        <GlobalFilterData/>
        <div id='recipients' className="p-4 md:p-8 mt-6 lg:mt-0 rounded shadow bg-white">

          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              Show {' '}<select id="page" value={10} style={{ width: "145px" }} className="mar-10 pad-7 shadow bg-white-500 hover:bg-white-400 focus:shadow-outline focus:outline-none text-black py-2 px-4 rounded">
                <option value="10">10</option>
                <option value="25">25</option>
                <option value="50">50</option>
                <option value="100">100</option>
              </select>entries</div>
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0 search-text" ><SearchBox /></div>
          </div>

          <div className="stripe hover" style={{ paddingTop: "1em", paddingBottom: "1em", width: "100%" }}>
            <ReactTable
              showPagination={false}
              minRows={0}
              NoDataComponent={() => null}
              defaultPageSize={10}
              data={data}
              className="-highlight"
              columns={[
                {
                  id: "UserName",
                  Header: "User Name",
                  className: "text-center view-details",
                  accessor: () => {
                    return <>
                      <div className="flex items-center" style={{ cursor: "pointer" }}>
                        <img className="w-10 h-10 rounded-full mr-4" src={require("../../assets/img/photo.png")} alt="Avatar of Jonathan Reinink" />
                        <div className="text-sm">
                          <p className="text-gray-300 leading-none">Jonathan Reinink</p>
                        </div>
                      </div>
                    </>
                  }
                },
                {
                  id: "EmailID",
                  Header: "Email ID",
                  className: "text-center view-details",
                  accessor: () => {
                    return <div style={{ padding: "6px", cursor: "pointer" }}>tom.cruise@gmail.com</div>
                  }
                },
                {
                  id: "PhoneNumber",
                  Header: "Phone Number",
                  className: "text-center view-details",
                  accessor: () => {
                    return <div style={{ padding: "6px", cursor: "pointer" }}>+91- 9876543210</div>
                  }
                },
                {
                  id: "Status",
                  Header: "Status",
                  className: "text-center view-details",
                  accessor: () => {
                    return <><div className="text-green-600" style={{ padding: "6px", cursor: "pointer" }}>Active</div></>
                  }
                },
                {
                  id: "Action",
                  Header: "Action",
                  className: "text-center view-details",
                  accessor: () => {
                    return <div className="text-center" onClick={(e) => e.stopPropagation()}>
                      <a onClick={() => handleEditDetails()} className="inline-block mr-1 border border-green-600 rounded-full p-2" title="Edit Details">
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
              getTrProps={(state, rowInfo) => {
                return {
                  onClick: (e) => {
                    history.push('/userDetails')
                  }
                }
              }
              }
              className="-highlight"
            />
          </div>showing 1 to 1 of 1 entries
              <div style={{ textAlign: "right" }}>
            <Pagination
              activePage={activePage}
              itemsCountPerPage={10}
              totalItemsCount={1}
              pageRangeDisplayed={5}
              onChange={handlePageChange}
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default withRouter(UserListing);