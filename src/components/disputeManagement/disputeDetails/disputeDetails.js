import React, { useEffect, useState } from "react";
import { useHistory, useLocation, useParams } from "react-router";
import { Link } from 'react-router-dom';
import {
    getDisputeDetails,
} from "../../../api";
import { useSelector } from "react-redux";
import moment from "moment";
import Loader from "../../../globalComponent/layout/loader";
import StatusModal from '../statusModal';



const DisputeDetails = () => {
  const history = useHistory();
  const token = useSelector((state) => state.auth.isSignedIn);
  const params = useParams();
  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      width: "98%",
      backgroundColor: "#fafafa",
      borderColor: "grey",
    }),
    container: (provided, state) => ({
      ...provided,
      width: "450px",
    }),
  };

  const { pathname } = useLocation();
  const path = pathname.split("/")[1];

  const [statusModal, setStatusModal]=useState(false);
  const [disputeDetails, setDisputeDetails] = useState(null);
  const [selectedStatus,setSelectedStatus]=useState(null);
	const [selectedResult,setSelectedResult]=useState(null);
	const [adminComment,setAdminComment]=useState(null);

  useEffect(() => {
    loadDisputeDetails();
  }, []);

  const loadDisputeDetails = () => {
    let data={
      params:{
        dispute_id:params.dispute_id,
      }
    }
    getDisputeDetails(token, data)
      .then((response) => {
          console.log("response",response)
        setDisputeDetails(response.dispute);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  let disputeType={
        1:"Customer",
        2:"Driver"
    }

let disputeResult=[
        {
            label:"None",
            color:"Black",
            value:0,
        },
        {
            label:"Partially Accepted",
            color:"Blue",
            value:1,
        },
        {
            label:"Accepted",
            color:"Green",
            value:2,
        },
        {
            label:"Rejected",
            color:"Red",
            value:3,
        },
    ]

let disputeStatus=[
        {
            label:"NEW",
            color:"Blue",
            value:1,
        },
        {
            label:"UNDER REVIEW",
            color:"Green",
            value:2,
        },
        {
            label:"CLOSED",
            color:"Red",
            value:3,
        },
    ]

    const handleStatusModal=()=>{
      setDisputeDetails(disputeDetails);
      setAdminComment(disputeDetails.admin_comment);
      setSelectedResult(disputeResult.find((result)=>result.value==disputeDetails.result));
      setSelectedStatus(disputeStatus.find((status)=>status.value==disputeDetails.status));
      setStatusModal(true);
    }
  
    const handleReload=()=>{
      loadDisputeDetails();
    }

  return (
    <>
    <div
      className="main-content pb-16 md:pb-5 flex-1 pt-20 px-2"
      style={{ overflowY: "scroll", height: "100vh" }}
    >
        {!disputeDetails? (
            <Loader />
        ) : (
                <div className="p-4 md:p-8 mt-6 lg:mt-0 rounded shadow bg-white">
                    <div className="flex">
                        <h3 className="text-2xl text-gray-400 font-bold mb-6">
                            Dispute Id #{disputeDetails.dispute_id}
                        </h3>
                        <button
                            style={{ height: "3rem", marginLeft: "45%" }}
                            onClick={() => history.push("/disputes")}
                            className="shadow bg-blue-500 ml-3 hover:bg-blue-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                            type="button"
                            >
                            Back
                        </button>
                    </div>
                    <div className="form-layout text-base" style={{ marginTop: "-20px" }}>
                      <div className="flex flex-row items-center ">
                        <div
                          className="font-semibold py-4 px-6 text-left text-lg"
                          style={{ width: "21%" }}
                        >
                          Order ID
                        </div>
                        <div className="px-8 text-lg">
                            <Link
                                to={`/orderDetails/${disputeDetails.order_id}`}
                                style={{color:'#39B7CD	'}}>
                                {disputeDetails.order_id}
                            </Link>
                        </div>
                      </div>
                    </div>
                    <div className="form-layout text-base" style={{ marginTop: "-20px" }}>
                      <div className="flex flex-row items-center ">
                        <div
                          className="font-semibold py-4 px-6 text-left text-lg"
                          style={{ width: "21%" }}
                        >
                          Payment ID
                        </div>
                        <div className="px-8 text-lg">
                            <Link
                                to={`/payments/${disputeDetails.Order.order_payment_id}`}
                                style={{color:'#39B7CD	'}}>
                                {disputeDetails.Order.order_payment_id}
                            </Link>
                        </div>
                      </div>
                    </div>
                    <div className="form-layout text-base" style={{ marginTop: "-20px" }}>
                      <div className="flex flex-row items-center ">
                        <div
                          className="font-semibold py-4 px-6 text-left text-lg"
                          style={{ width: "21%" }}
                        >
                          Customer
                        </div>
                        <div className="px-8 text-lg">{disputeDetails.Order.order_details.customer.name}</div>
                      </div>
                    </div>
                    <div className="form-layout text-base" style={{ marginTop: "-20px" }}>
                      <div className="flex flex-row items-center ">
                        <div
                          className="font-semibold py-4 px-6 text-left text-lg"
                          style={{ width: "21%" }}
                        >
                          Restaurant
                        </div>
                        <div className="px-8 text-lg">{disputeDetails.Order.order_details.restaurant.restaurant_name}</div>
                      </div>
                    </div>
                    <div className="form-layout text-base" style={{ marginTop: "-20px" }}>
                      <div className="flex flex-row items-center ">
                        <div
                          className="font-semibold py-4 px-6 text-left text-lg"
                          style={{ width: "21%" }}
                        >
                          Hotspot
                        </div>
                        <div className="px-8 text-lg">{disputeDetails.Order.order_details.hotspot.name}</div>
                      </div>
                    </div>
                    <div className="form-layout text-base" style={{ marginTop: "-20px" }}>
                      <div className="flex flex-row items-center ">
                        <div
                          className="font-semibold py-4 px-6 text-left text-lg"
                          style={{ width: "21%" }}
                        >
                          Raised On
                        </div>
                        <div className="px-8 text-lg">{moment(disputeDetails.raised_at,"YYYY-MM-DD HH:mm:ss").format("MM/DD/YYYY h:mma")}</div>
                      </div>
                    </div>  
                    <div className="form-layout text-base" style={{ marginTop: "-20px" }}>
                      <div className="flex flex-row items-center ">
                        <div
                          className="font-semibold py-4 px-6 text-left text-lg"
                          style={{ width: "21%" }}
                        >
                          Type
                        </div>
                        <div className="px-8 text-lg">{disputeType[disputeDetails.type]}</div>
                      </div>
                    </div>  
                    <div className="form-layout text-base" style={{ marginTop: "-20px" }}>
                      <div className="flex flex-row items-center ">
                        <div
                          className="font-semibold py-4 px-6 text-left text-lg"
                          style={{ width: "21%" }}
                        >
                          Result
                        </div>
                        <div className="px-8 text-lg" style={{color:disputeResult[disputeDetails.result].color}}>{disputeResult[disputeDetails.result].label}</div>
                      </div>
                    </div>  
                    <div className="form-layout text-base" style={{ marginTop: "-20px" }}>
                      <div className="flex flex-row items-center ">
                        <div
                          className="font-semibold py-4 px-6 text-left text-lg"
                          style={{ width: "21%" }}
                        >
                          Status
                        </div>
                        <div className="px-8 text-lg" style={{color:disputeStatus[disputeDetails.status-1].color}}>{disputeStatus[disputeDetails.status-1].label}</div>
                      </div>
                    </div> 
                    <div className="form-layout text-base" style={{ marginTop: "-20px" }}>
                      <div className="flex flex-row items-center ">
                        <div
                          className="font-semibold py-4 px-6 text-left text-lg"
                          style={{ width: "21%" }}
                        >
                          Title
                        </div>
                        <div className="px-8 text-lg">{disputeDetails.title}</div>
                      </div>
                    </div> 
                    {disputeDetails.description && disputeDetails.description.trim()?<div className="form-layout text-base" style={{ marginTop: "15px" }}>
                      <div className="flex flex-row items-center ">
                        <div
                          className="font-semibold py-4 px-6 text-left text-lg"
                          style={{ width: "21%" }}
                        >
                          Description
                        </div>
                        <div className="px-8 text-lg">
                            <textarea
                                style={{border:"2px solid rgba(0,0,0,0.1)", padding:"10px", width:"75%"}}
                                rows="5"
                                cols="100"
                                value={disputeDetails.description}
                            />
                        </div>
                      </div>
                    </div>:null  }
                    {disputeDetails.admin_comment && disputeDetails.admin_comment.trim()?<div className="form-layout text-base" style={{ marginTop: "15px" }}>
                      <div className="flex flex-row items-center ">
                        <div
                          className="font-semibold py-4 px-6 text-left text-lg"
                          style={{ width: "21%" }}
                        >
                          Admin Comment
                        </div>
                        <div className="px-8 text-lg">
                            <textarea
                                style={{border:"2px solid rgba(0,0,0,0.1)", padding:"10px", width:"75%"}}
                                rows="5"
                                cols="100"
                                value={disputeDetails.admin_comment}
                            />
                        </div>
                      </div>
                    </div>:null}
                    {disputeDetails.status<3?<div className="px-8" style={{display:"flex", marginTop: "10px", justifyContent:"center"}}>
                      <div>
                        <button 
                          style={{backgroundColor:"rgb(50,120,50)"}}
                          className='shadow bg-red-500 ml-3 hover:bg-red-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded'
                          onClick={handleStatusModal}>
                          Resolve
                        </button>
                      </div>
                  </div>:null }  
                </div>
        )}
    </div>
    <StatusModal 
					{
						...{
							statusModal,
							setStatusModal,
							disputeDetails,
							disputeStatus,
							disputeResult,
							selectedResult,
							setSelectedResult,
							selectedStatus,
							setSelectedStatus,
							adminComment,
							setAdminComment,
							handleReload
						}
					}
						
				/>
    </>
  );
};

export default DisputeDetails;
