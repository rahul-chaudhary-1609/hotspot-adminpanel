import React, { useEffect, useState } from "react";
import { useHistory, useLocation, useParams } from "react-router";
import { Link } from 'react-router-dom';
import {
    getRefundDetails,
} from "../../../../api";
import { useSelector } from "react-redux";
import moment from "moment";
import Loader from "../../../../globalComponent/layout/loader";

import {formatDateWithTime} from '../../../../utils/redableDateTime';


const RefundDetails = () => {
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

  const [refundDetails, setRefundDetails] = useState(null);
  let [refundProcessingFee,setRefundProcessingFee]=useState(0.00);
  let [refundSalesFee,setRefundSalesFee]=useState(0.00);
  let [refundSubtotal,setRefundSubtotal]=useState(0.00);
  let [refundAmount,setRefundAmount]=useState(0.00);

  useEffect(() => {
    getPaymentDetails();
  }, []);

  useEffect(() => {
    
    if(refundSubtotal)
    {
      let stripeFeeAmount=0.00;
      if(refundDetails?.refund_details.order_details.amount_details.processing_fee_variable_percentage && refundDetails.refund_details.order_details.amount_details.processing_fee_fixed_amount){
        stripeFeeAmount=parseFloat((((refundSubtotal*refundDetails.refund_details.order_details.amount_details.processing_fee_variable_percentage)/100)+(refundDetails.refund_details.order_details.amount_details.processing_fee_fixed_amount/100)).toFixed(2));
      }else if(refundDetails?.refund_details.order_details.amount_details.processing_fee_variable_percentage){
          stripeFeeAmount=parseFloat(((refundSubtotal*refundDetails.refund_details.order_details.amount_details.processing_fee_variable_percentage)/100).toFixed(2));
      }else if(refundDetails?.refund_details.order_details.amount_details.processing_fee_fixed_amount){
          stripeFeeAmount=parseFloat((refundDetails.refund_details.order_details.amount_details.processing_fee_fixed_amount/100).toFixed(2));
      }else{
          stripeFeeAmount=0.00;
      }
      
      setRefundProcessingFee(stripeFeeAmount);
      
      let salesTaxAmount=0.00;

      if(refundDetails?.refund_details.order_details.amount_details.taxes_variable_percentage && refundDetails.refund_details.order_details.amount_details.taxes_fixed_amount){
          salesTaxAmount=parseFloat((((refundSubtotal*refundDetails.refund_details.order_details.amount_details.taxes_variable_percentage)/100)+(refundDetails.refund_details.order_details.amount_details.taxes_fixed_amount/100)).toFixed(2));
      }else if(refundDetails?.refund_details.order_details.amount_details.taxes_variable_percentage){
          salesTaxAmount=parseFloat(((refundSubtotal*refundDetails.refund_details.order_details.amount_details.taxes_variable_percentage)/100).toFixed(2));
      }else if(refundDetails?.refund_details.order_details.amount_details.taxes_fixed_amount){
          salesTaxAmount=parseFloat((refundDetails.refund_details.order_details.amount_details.taxes_fixed_amount/100).toFixed(2));
      }else{
          salesTaxAmount=0.00;
      }

      setRefundSalesFee(salesTaxAmount);
      setRefundAmount(parseFloat((refundSubtotal+stripeFeeAmount+salesTaxAmount).toFixed(2)))

    }else{
      setRefundProcessingFee(0.00);
      setRefundSalesFee(0.00);
      setRefundAmount(0.00)
    }
    
  }, [refundSubtotal]); 

  const getPaymentDetails = () => {
    let data={
      params:{
        refund_id:params.refund_id,
      }
    }
    getRefundDetails(token, data)
      .then((response) => {
          console.log("response",response)
        setRefundDetails(response.refund);
        if(response.refund.refund_details.order_details.amount_details.refundSubtotal){
          setRefundSubtotal(response.refund.refund_details.order_details.amount_details.refundSubtotal)
        }
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
        {!refundDetails? (
            <Loader />
        ) : (
                <div className="p-4 md:p-8 mt-6 lg:mt-0 rounded shadow bg-white">
                    <div className="flex">
                        <h3 className="text-2xl text-gray-400 font-bold mb-6">
                            Refund Id #{refundDetails.refund_id}
                        </h3>
                        <button
                            style={{ height: "3rem", marginLeft: "45%" }}
                            onClick={() => history.push("/refunds")}
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
                          Payment ID
                        </div>
                        <div className="px-8 text-lg">
                            <Link
                                to={`/payments/${refundDetails.payment_id}`}
                                style={{color:'#39B7CD	'}}>
                                {refundDetails.payment_id}
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
                          Order ID
                        </div>
                        <div className="px-8 text-lg">
                            <Link
                                to={`/orderDetails/${refundDetails.order_id}`}
                                style={{color:'#39B7CD	'}}>
                                {refundDetails.order_id}
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
                        <div className="px-8 text-lg">{refundDetails.refund_details.order_details.customer.name}</div>
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
                        <div className="px-8 text-lg">{refundDetails.refund_details.order_details.restaurant.restaurant_name}</div>
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
                        <div className="px-8 text-lg">{refundDetails.refund_details.order_details.hotspot.name}</div>
                      </div>
                    </div>
                    <div className="form-layout text-base" style={{ marginTop: "-20px" }}>
                      <div className="flex flex-row items-center ">
                        <div
                          className="font-semibold py-4 px-6 text-left text-lg"
                          style={{ width: "21%" }}
                        >
                          Refund Value($)
                        </div>
                        <div className="px-8 text-lg">${refundDetails.refund_value}</div>
                      </div>
                    </div> 
                    <div className="form-layout text-base" style={{ marginTop: "-20px" }}>
                      <div className="flex flex-row items-center ">
                        <div
                          className="font-semibold py-4 px-6 text-left text-lg"
                          style={{ width: "21%" }}
                        >
                          Refund Type
                        </div>
                        <div className="px-8 text-lg">{refundDetails.type==1?"Hotspot Credit":"Card Refund"}</div>
                      </div>
                    </div>  
                    <div className="form-layout text-base" style={{ marginTop: "-20px" }}>
                      <div className="flex flex-row items-center ">
                        <div
                          className="font-semibold py-4 px-6 text-left text-lg"
                          style={{ width: "21%" }}
                        >
                          Refunded On
                        </div>
                        <div className="px-8 text-lg">{moment(refundDetails.refund_on).format("MM/DD/YYYY HH:MM:SS")}</div>
                      </div>
                    </div>  
                    <div className="form-layout text-base" style={{ marginTop: "-20px" }}>
                      <div className="flex flex-row items-center ">
                        <div
                          className="font-semibold py-4 px-6 text-left text-lg"
                          style={{ width: "21%" }}
                        >
                          Admin Comment
                        </div>
                        <div className="px-8 text-lg">{refundDetails.admin_comment}</div>
                      </div>
                    </div>      
                </div>
        )}
    </div>
    </>
  );
};

export default RefundDetails;
