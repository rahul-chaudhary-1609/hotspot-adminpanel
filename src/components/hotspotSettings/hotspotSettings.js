/**
 * The file is covered under Algoworks Work Product License for Design & Development of Mobile Application for “Hotspot”.
 * Please review the license for full details.
 * This program is not free software: You cannot redistribute it for any use under the terms of the Algoworks Work Product License for Design & Development of Mobile Application for “Hotspot”.
 * However the source can be modified and updated for the working of the application Design & Development of Mobile Application for “Hotspot” for which it was licensed.
*/

import React, { useEffect, useState } from "react";
import ReactTable from "react-table";
import Pagination from "react-js-pagination";
import "react-table/react-table.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import { listHotspot, toggleHotspotAvailibility } from "../../api";
import { useHistory } from "react-router";
import ServiceAvailibilityModal from "./serviceAvailibilityModal";
import ToggleOffIcon from '@material-ui/icons/ToggleOff';
import ToggleOnIcon from '@material-ui/icons/ToggleOn';
import ReactTooltip from 'react-tooltip';

const HotspotSettings = () => {
  const history = useHistory();
  const token = useSelector((state) => state.auth.isSignedIn);

  const [tableData, setTableData] = useState([]);
  const [activePage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [totalItems, setTotalItems] = useState(null);
  const [statusModal,setStatusModal]=useState(false);
  let [item,setItem]=useState(null);

  const [startId, setStartId] = useState(0);
  let endId = startId < 0 ? 0 : startId + tableData.length;
  let currentId = startId;

  const columns = [
    {
      Header: "#",
      width: 30,
      id: 1,
      className: "text-center view-details",
      accessor: (item) => {
        currentId++;
        return (
          <>
            <div className="flex items-center" style={{ cursor: "pointer" }}>
              <div className="text-sm">
                <p className="text-gray-300 leading-none">{currentId}</p>
              </div>
            </div>
          </>
        );
      },
    },
    {
      id: 2,
      Header: "Hotspot Name",
      width:300,
      className: "text-center view-details",
      accessor: (item) => {
        return (
          <div style={{ padding: "6px", cursor: "pointer" }}>{item.name}</div>
        );
      },
    },
    {
      id: 3,
      Header: "Hotspot Location",
      className: "text-center view-details",
      accessor: (item) => {
        return (
          <div style={{ padding: "6px", cursor: "pointer" }}>
            {item.locationDetail}
          </div>
        );
      },
    },

    {
      id: 4,
      Header: "Action",
      width:200,
      className: "text-center view-details",
      accessor: (item) => {
        return (
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-around",
              alignItems:"center"
            }}
            className="text-center"
            onClick={(e) => e.stopPropagation()}
          >
          <p data-tip='' data-for='hotspot-view-tool-tip'>
              <FontAwesomeIcon
                style={{ cursor: "pointer" }}
                onClick={() => history.push(`/hotspots/${item.id}`)}
                className="text-red-600 trash w-5 h-5"
                color="red"
                icon={faEye}
              />
            <ReactTooltip id="hotspot-view-tool-tip">View Hotspot Details</ReactTooltip>
						</p>
            {item.service_availibility == 1 ? (
							<p data-tip='' data-for='hotspot-status-tool-tip'>
								<ToggleOnIcon
									onClick={() => handleStatusModal(item)}
									style={{ color: 'green', fontSize: '35',cursor:"pointer" }}
								/>
							</p>
						) : (
							<p data-tip='' data-for='hotspot-status-tool-tip'>
								<ToggleOffIcon
									onClick={() => handleStatusModal(item)}
									style={{ color: 'red', fontSize: '35',cursor:"pointer" }}
								/>
							</p>
						)}
						<ReactTooltip id="hotspot-status-tool-tip">Toggle Service Availibility</ReactTooltip>
          </div>
        );
      },
    },
  ];
  useEffect(() => {
    hotspotLists();
  }, [activePage]);

  const hotspotLists = () => {
    setLoading(true);
    let currentPage = activePage;
    let data={
      query:{
        is_pagination:1,
        page:currentPage,
        page_size:pageSize,
      }
    }

    listHotspot(token,data)
      .then((hotspots) => {
        let newStartId = pageSize * (activePage - 1);
        setStartId(newStartId);
        setLoading(false);
        setError(null);

        setTotalItems(hotspots.hotspotList.count);
        setTableData(hotspots.hotspotList.rows);
      })
      .catch((error) => {
        setLoading(false);
        setError(error);
        let newStartId = startId - 1;
        setStartId(newStartId);
        setTotalItems(0);
        setTableData([]);
      });
  };
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  
	const handleStatusModal=(item)=>{
		setItem(item)
		setStatusModal(!statusModal)
	}

	const handleStatusChange = async(id) => {
		try {
                let data={
                    body:{
                      hotspotLocationId:id,
                    }
                }
				console.log("data",data)
				const res = await toggleHotspotAvailibility(token, data);
				if (res.status == 200) {
					setStatusModal(false)
					hotspotLists();
				}
			} catch (error) {
				console.log(error);
			}
	};

  return (
    <>
      <div className='main-content md:pb-5 flex-1 p-8 px-2' style={{ overflowY: 'auto', height: '100vh' }}>
				<div id='recipients' className='p-4 md:p-8 mt-6 lg:mt-0 rounded shadow bg-white'>
					<h1 className='text-xl'>Hotspot Management</h1>
            <div className='flex flex-wrap -mx-3 mb-6 mt-5' style={{justifyContent: 'space-between' }}>
                <div style={{position: "relative",left: "89%"}}>
                <button
                  onClick={() => history.push("/addHotspot")}
                  className="shadow bg-blue-500 hover:bg-blue-400  focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                  type="button"
                >
                  Add New
                </button>
             </div>
           </div>
          {error && (
            <p
              style={{
                color: "red",
                fontSize: "20px",
                textAlign: "center",
                width: "100%",
              }}
            >
              {error}
            </p>
          )}
          <ReactTable
            showPagination={false}
            minRows={0}
            NoDataComponent={() => null}
            defaultPageSize={10}
            data={tableData}
            className="-highlight"
            loading={loading}
            columns={columns}
          />
          <br />
          <p
            style={{
              marginLeft: "20px",
            }}
          >
           {totalItems > 0 ? `(showing ${startId + 1} - ${endId} of ${totalItems})` : 'showing 0 result'}
          </p>
          <div style={{ textAlign: "right" }}>
            <Pagination
              activePage={activePage}
              itemsCountPerPage={pageSize}
              totalItemsCount={totalItems}
              pageRangeDisplayed={3}
              onChange={handlePageChange}
            />
          </div>
        </div>
      </div>
      {statusModal && <ServiceAvailibilityModal
						{...{ 
							setIsOpen:setStatusModal, 
							modalIsOpen:statusModal, 
							details: item,
							itemId:item.id,
							handleStatusChange, 
							name:'Hotspot' 
						}} 
					/>}
    </>
  );
};

export default HotspotSettings;
