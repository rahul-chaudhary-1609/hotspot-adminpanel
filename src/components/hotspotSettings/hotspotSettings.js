import React, { useEffect, useState } from "react";
import ReactTable from "react-table";
import Pagination from "react-js-pagination";
import "react-table/react-table.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import { getListHotspots } from "../../api";
import { useHistory } from "react-router";

const HotspotSettings = () => {
  const history = useHistory();
  const token = useSelector((state) => state.auth.isSignedIn);

  const [hotspotList, setHotspotList] = useState([]);
  const [activePage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [totalItems, setTotalItems] = useState(null);

  const [startId, setStartId] = useState(0);
  let endId = startId < 0 ? 0 : startId + hotspotList.length;
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
      className: "text-center view-details",
      accessor: (item) => {
        return (
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-around",
            }}
            className="text-center"
            onClick={(e) => e.stopPropagation()}
          >
            <FontAwesomeIcon
              style={{ cursor: "pointer" }}
              onClick={() => history.push(`/hotspots/${item.id}`)}
              className="text-red-600 trash w-5 h-5"
              color="red"
              icon={faEye}
            />
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

    getListHotspots(token, activePage, pageSize)
      .then((hotspots) => {
        let newStartId = pageSize * (activePage - 1);
        setStartId(newStartId);
        setLoading(false);
        setError(null);

        setTotalItems(hotspots.hotspotList.count);
        setHotspotList(hotspots.hotspotList.rows);
      })
      .catch((error) => {
        setLoading(false);
        setError(error);
        let newStartId = startId - 1;
        setStartId(newStartId);
        setTotalItems(0);
        setHotspotList([]);
      });
  };
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  return (
    <>
      <div className='main-content md:pb-5 flex-1 p-8 px-2' style={{ overflowY: 'auto', height: '100vh' }}>
				<div id='recipients' className='p-4 md:p-8 mt-6 lg:mt-0 rounded shadow bg-white'>
					<h1 className='text-xl'>Hotspot Settings</h1>
            <div className='flex flex-wrap -mx-3 mb-6 mt-5' style={{justifyContent: 'space-between' }}>
                <div style={{position: "relative",left: "89%"}}>
                <button
                  onClick={() => history.push("/hotspot")}
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
            data={hotspotList}
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
    </>
  );
};

export default HotspotSettings;
