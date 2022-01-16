import React, { useEffect, useState } from "react";
import { useHistory, useLocation, useParams } from "react-router";
import { Link } from 'react-router-dom';
import {
    getRefundHistoryDetails,
} from "../../../api";
import { useSelector } from "react-redux";
import moment from "moment";
import Loader from "../../../globalComponent/layout/loader";

import {formatDateWithTime} from '../../../utils/redableDateTime';


const RefundHistoryDetails = () => {
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

  const [refundHistoryDetails, setRefundHistoryDetails] = useState(null);

  useEffect(() => {
    getPaymentDetails();
  }, []);

 
  const getPaymentDetails = () => {
    let data={
      params:{
        refund_id:params.customer_id,
      }
    }
    getRefundHistoryDetails(token, data)
      .then((response) => {
          console.log("response",response)
          setRefundHistoryDetails(response.refundHistory);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
    <div
      className="main-content pb-16 md:pb-5 flex-1 pt-20 px-2"
      style={{ overflowY: "scroll", height: "100vh" }}
    >
        {!refundHistoryDetails? (
            <Loader />
        ) : (
          
              <div className="p-4 md:p-8 mt-6 lg:mt-0 rounded shadow bg-white" style={{width:"100%"}}>
                <div style={{width:"100%", display:"flex", justifyContent:"space-between"}}>
                    <h3 className="text-2xl text-gray-400 font-bold mb-6">
                        {refundHistoryDetails.customer.name}
                    </h3>
                    <button
                        style={{ height: "3rem", }}
                        onClick={() => history.goBack()}
                        className="shadow bg-blue-500 ml-3 hover:bg-blue-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                        type="button"
                        >
                        Back
                    </button>
                </div>
                <div style={{display:"flex",flexDirection:"column", width:"100%", alignContent:"space-between"}}>
                {refundHistoryDetails.refunds.rows.map((refund)=>{
                  return (
                    <div style={{display:"flex",flexDirection:"column", width:"100%", marginBottom:"1rem", border:"2px solid rgba(0,0,0,0.1)",padding:"10px", borderRadius:"10px"}}>

                      <div style={{display:"flex"}}>
                            <div style={{display:"flex",width:"30%"}}>
                                <div style={{marginRight:"5px", fontWeight:"bold"}}>
                                    Refund ID: 
                                </div>
                                <div>
                                  <Link
                                      to={`/refunds/${refund.refund_id}`}
                                      style={{color:'#39B7CD	'}}>
                                       {refund.refund_id}
                                  </Link>
                                </div>
                            </div>
                            <div style={{display:"flex",width:"30%"}}>
                                <div style={{marginRight:"5px", fontWeight:"bold"}}>
                                    Payment ID:
                                </div>
                                <div>
                                  <Link
                                      to={`/payments/${refund.payment_id}`}
                                      style={{color:'#39B7CD	'}}>
                                       {refund.payment_id}
                                  </Link>
                                </div>
                            </div>
                            <div style={{display:"flex",width:"30%"}}>
                                <div style={{marginRight:"5px", fontWeight:"bold"}}>
                                    Order ID:
                                </div>
                                <div>
                                  <Link
                                      to={`/orderDetails/${refund.order_id}`}
                                      style={{color:'#39B7CD	'}}>
                                       {refund.order_id}
                                  </Link>
                                </div>
                            </div>
                          
                      </div>
                      <div style={{display:"flex"}}>
                            <div style={{display:"flex",width:"30%"}}>
                                <div style={{marginRight:"5px", fontWeight:"bold"}}>
                                    Refund Value:
                                </div>
                                <div>
                                       ${refund.refund_value}
                                </div>
                            </div>
                            <div style={{display:"flex",width:"30%"}}>
                                <div style={{marginRight:"5px", fontWeight:"bold"}}>
                                    Refund Type:
                                </div>
                                <div>
                                       {refund.type==1?"Hotspot Credit":"Card Refund"}
                                </div>
                            </div>
                            <div style={{display:"flex",width:"30%"}}>
                                <div style={{marginRight:"5px", fontWeight:"bold"}}>
                                  Refunded On:
                                </div>
                                <div>
                                   {moment(refund.refund_on).format("MM/DD/YYYY h:mma")}
                                </div>
                            </div>
                      </div>
                      <div style={{display:"flex"}}>
                        <div style={{marginRight:"5px", fontWeight:"bold"}}>
                            Restaurant:
                        </div>
                        <div>
                                {refund.refund_details.order_details.restaurant.restaurant_name}
                        </div>
                      </div>
                      <div style={{display:"flex"}}>
                        <div style={{marginRight:"5px", fontWeight:"bold"}}>
                            Hotspot:
                        </div>
                        <div>
                                {refund.refund_details.order_details.hotspot.name}
                        </div>
                      </div>
                      <div style={{display:"flex"}}>
                        <div style={{marginRight:"5px", fontWeight:"bold"}}>
                            Comment:
                        </div>
                        <div>
                                {refund.admin_comment}
                        </div>
                      </div>

                    </div>
                  )
                  }) }

                  </div>

                  </div>      
         )}
    </div>
    </>
  );
};

export default RefundHistoryDetails;
