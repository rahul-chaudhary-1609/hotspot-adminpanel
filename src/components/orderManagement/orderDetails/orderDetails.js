import React, { useEffect, useState } from "react";
import { useHistory, useLocation, useParams } from "react-router";
import Select from "react-select";
import {
  getOrderDetailsById,
  getDriverListByHotspot,
  assignDriver,
} from "../../../api";
import { useSelector } from "react-redux";
import moment from "moment";
import Loader from "../../../globalComponent/layout/loader";
import { Link } from 'react-router-dom';

import {formatDateWithTime} from '../../../utils/redableDateTime'

const OrderDetails = () => {
  const history = useHistory();
  const token = useSelector((state) => state.auth.isSignedIn);
  const { id } = useParams();
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

  const [orderDetails, setOrderDetails] = useState(null);
  const [drivers, setDrivers] = useState([]);
  const [selectedDriver, setSelectedDriver] = useState(null);

  useEffect(() => {
    getOrderDetails();
  }, []);

  useEffect(() => {
    if (orderDetails) {
      getDriverList();
    }
  }, [orderDetails]);

  const getDriverList = async () => {
    try {
      // let hotspotId = orderDetails.hotspotLocation.id;
      let data={
        query:{
          hotspot_location_id : orderDetails.hotspotLocation.id,
        }
      }
      const res = await getDriverListByHotspot(token, data);
      let drivers = res.rows.reduce((acc, curr) => {
        return acc.concat({
          id: curr.id,
          name: `${curr.first_name}  ${curr.last_name}`,
        });
      }, []);
      setDrivers(drivers);
    } catch (error) {
      console.log(error);
    }
  };

  const getOrderDetails = () => {
    let data={
      params:{
        orderId:id,
      }
    }
    getOrderDetailsById(token, data)
      .then((order) => {
        let updatedDetails = { ...order.orderDetails };

        let date = order.deliveryDateTime;
        console.log(new Date(date));
        // updatedDetails['deliveryDateTime'] =
        setOrderDetails(order.orderDetails);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleAssignDriver = () => {
    let driverId = selectedDriver.id;
    let data={
      body:{
        orderId:id,
        driverId
      }
    }
    assignDriver(token, data)
      .then((resp) => {
        history.push(`/${path}`);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div
      className="main-content pb-16 md:pb-5 flex-1 pt-20 px-2"
      style={{ overflowY: "scroll", height: "100vh" }}
    >
      {!orderDetails ? (
        <Loader />
      ) : (
        <div className="p-4 md:p-8 mt-6 lg:mt-0 rounded shadow bg-white">
          <div className="flex">
            <h3 className="text-2xl text-gray-400 font-bold mb-6">
              Order Id # {orderDetails.orderId}
            </h3>
            <button
              style={{ height: "3rem", marginLeft: "45%" }}
              onClick={() => history.goBack()}
              className="shadow bg-blue-500 ml-3 hover:bg-blue-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
              type="button"
            >
              Back
            </button>
          </div>
         

          <div className="form-layout text-base" style={{ marginTop: "-20px" }}>
            <div className="flex flex-row items-center ">
              <div
                className="text-gray-300  py-4 px-6 text-left text-xl "
                style={{ width: "21%" }}
              >
                Received on
              </div>
              <div className="px-8 text-xl text-gray-300">
                {formatDateWithTime(orderDetails.createdAt)}
              </div>
            </div>
          </div>

          <div className="form-layout text-base" style={{ marginTop: "-20px" }}>
            <div className="flex flex-row items-center ">
              <div
                className="text-gray-300  py-4 px-6 text-left text-xl "
                style={{ width: "21%" }}
              >
                {orderDetails.status === "Pickup" ? "Pickup" : "Delivery"} Time
              </div>
              <div className="px-8 text-xl text-gray-300">
                {" "}
                {formatDateWithTime(orderDetails.deliveryDateTime)}
              </div>
            </div>
          </div>

          <div className="form-layout text-base" style={{ marginTop: "-20px" }}>
            <div className="flex flex-row items-center ">
              <div
                className="font-semibold py-4 px-6 text-left text-xl"
                style={{ width: "21%" }}
              >
                Customer Name
              </div>
              <div className="px-8 text-xl">{orderDetails.customer}</div>
            </div>
          </div>
        {console.log(orderDetails)}
          {orderDetails.type == 1 && (
            <>
              <div
                className="form-layout text-base"
                style={{ marginTop: "-20px" }}
              >
                <div className="flex flex-row items-center ">
                  <div
                    className="font-semibold py-4 px-6 text-left text-xl"
                    style={{ width: "21%" }}
                  >
                    Hotspot Name
                  </div>
                  <div className="px-8 text-xl">
                    {orderDetails.hotspotLocation &&
                      orderDetails.hotspotLocation.name}
                  </div>
                </div>
              </div>
              <div
                className="form-layout text-base "
                style={{ marginTop: "-20px" }}
              >
                <div className="flex flex-row items-center ">
                  <div
                    className=" font-semibold py-4 px-6  text-left text-xl "
                    style={{ width: "21%" }}
                  >
                    Hotspot Location
                  </div>
                  <div className="px-8 text-xl">
                    {orderDetails.hotspotLocation &&
                      orderDetails.hotspotLocation.details}
                  </div>
                </div>
              </div>
            </>
          )}
          <div className="form-layout text-base" style={{ marginTop: "-20px" }}>
            <div className="flex flex-row items-center ">
              <div
                className="font-semibold py-4 px-6 text-left text-xl"
                style={{ width: "21%" }}
              >
                Restaurant Name
              </div>
              <div className="px-8 text-xl">{orderDetails.restaurant}</div>
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
                                to={`/payments/${orderDetails.order_payment_id}`}
                                style={{color:'#39B7CD	'}}>
                                {orderDetails.order_payment_id}
                            </Link>
                        </div>
                      </div>
                    </div>

          <div style={{padding:"5px",border:"2px solid rgba(0,0,0,0.3)"}}>
          
          <div className="px-8 text-base" style={{marginTop: "10px"}}>
                      <table style={{width: "100%"}} cellpadding="5">

                      {orderDetails.order_details.ordered_items.map((ordered_item,itemIndex)=> {
                        return (
                            <tr style={{verticalAlign: "top",}}>
                                <td style={{textAlign: "left"}}>
                                    <div>
                                        {ordered_item.itemCount}x
                                    </div>
                                </td>
                                <td>
                                    <div>
                                    {ordered_item.is_refunded?
                                      <>
                                        {/* <input  
                                          style={{marginRight:"5px",height:"15px",width:"15px",border:"2px solid black", borderRadius:"5px"}}
                                          type="checkbox" 
                                          checked={ordered_item.is_refunded}                                                            
                                        />                                          
                                              <input 
                                                style={{marginRight:"5px",textAlign:"center",height:"20px",width:"40px",paddingLeft:"2px" ,border:"1px solid rgba(0,0,0,0.5)", borderRadius:"5px"}}
                                                type="number" 
                                                value={ordered_item.refund_count} 
                                                min={1} 
                                                max={ordered_item.itemCount}                 
                                              /> */}
                                        </>:""
                                          } 
                                      {ordered_item.itemName} (${(parseFloat(ordered_item.price)*ordered_item.itemCount).toFixed(2)}) 
                                      {/* {ordered_item.is_refunded?(<span style={{color:"red",marginRight:"10px"}}>(- ${(parseFloat(ordered_item.refund_amount)).toFixed(2)})</span>):""} */}
                                       {ordered_item.is_refunded?(<span style={{fontSize: "10px",color:"white",marginLeft:"5px", backgroundColor:"red", borderRadius:"10px", padding:"1px 5px 1px 5px"}}>{ordered_item.refund_count}x refunded</span>):""}
                          {ordered_item.itemAddOn.map((addOn,addonIndex)=> {
                              return <li style={{fontSize: "14px"}}>
                              {addOn.is_refunded?
                                <>
                                  {/* <input
                                  style={{marginRight:"5px",height:"15px",width:"15px",border:"2px solid black", borderRadius:"5px"}}
                                  type="checkbox" 
                                  checked={addOn.is_refunded}                                    
                                  />
                                  
                                    <input 
                                      style={{marginRight:"5px",textAlign:"center",marginLeft:"5px",height:"20px",width:"40px",paddingLeft:"2px" ,border:"1px solid rgba(0,0,0,0.5)", borderRadius:"5px"}}
                                      type="number" 
                                      value={addOn.refund_count} 
                                      min={1} 
                                      max={ordered_item.itemCount}               
                                  /> */}
                                </>:""} 
                                {addOn.name} (${(parseFloat(addOn.price)*ordered_item.itemCount).toFixed(2)}) 
                                {/* {addOn.is_refunded?(<span style={{color:"red",marginRight:"10px"}}>(- ${(parseFloat(addOn.refund_amount)).toFixed(2)})</span>):""} */}
                                 {addOn.is_refunded?(<span style={{fontSize: "10px",color:"white",marginLeft:"5px", backgroundColor:"red", borderRadius:"10px", padding:"1px 5px 1px 5px"}}>{addOn.refund_count}x refunded</span>):""}
                              </li>
                          })}

                         { ordered_item.preference && ordered_item.preference.trim()!==""?(
                              <div>
                                  <i>Preference: </i>
                                      <span style={{fontSize: "13px"}}>
                                          {ordered_item.preference}
                                      </span>
                              </div>
                         ):("")}

                          </div>
                              </td>
                              <td style={{textAlign: "right"}}>
                                  <div>
                                      ${(parseFloat(ordered_item.itemPrice)).toFixed(2)}
                                  </div>
                              </td>
                          </tr>
                        )
                          
                      })}                          
                      </table>
                  </div>

                  <div className="px-8" style={{marginTop: "10px"}}>
                      <table style={{width: "100%"}}>
                          <tr style={{textAlign: "left", verticalAlign: "top"}}>
                              <td style={{textAlign: "left", borderTop:"2px solid #e6e8e6"}}>
                                  <div>
                                      Subtotal
                                  </div>
                              </td>
                              <td style={{textAlign: "right", borderTop:"2px solid #e6e8e6"}}>
                                  <div>
                                  {/* {orderDetails.order_details.amount_details.refundSubtotal?(<span style={{color:"red",marginLeft:"10px"}}>(- ${(parseFloat(orderDetails.order_details.amount_details.refundSubtotal)).toFixed(2)})</span>):""}   */}
                                  ${orderDetails.order_details.amount_details.subtotal.toFixed(2)}
                                  </div>
                              </td>
                          </tr>
                          <tr style={{textAlign: "left", verticalAlign: "top"}}>
                              <td style={{textAlign: "left"}}>
                                  <div>
                                      Regulatory Response Fee
                                  </div>
                              </td>
                              <td style={{textAlign: "right"}}>
                                  <div>
                                      {orderDetails.order_details.amount_details.regulatory_response_fee?`$${orderDetails.order_details.amount_details.regulatory_response_fee.toFixed(2)}`:`Free`}
                                  </div>
                              </td>
                          </tr>
                          <tr style={{textAlign: "left", verticalAlign: "top"}}>
                              <td style={{textAlign: "left"}}>
                                  <div>
                                      Delivery Fee
                                  </div>
                              </td>
                              <td style={{textAlign: "right"}}>
                                  <div>
                                      {orderDetails.order_details.amount_details.regulatory_response_fee?`$${orderDetails.order_details.amount_details.delivery_fee.toFixed(2)}`:`Free`}
                                  </div>
                              </td>
                          </tr>
                          <tr style={{textAlign: "left", verticalAlign: "top"}}>
                              <td style={{textAlign: "left"}}>
                                  <div>
                                      Service Fee
                                  </div>
                              </td>
                              <td style={{textAlign: "right"}}>
                                  <div>
                                      {orderDetails.order_details.amount_details.service_fee?`$${orderDetails.order_details.amount_details.service_fee.toFixed(2)}`:`Free`}
                                  </div>
                              </td>
                          </tr>
                          <tr style={{textAlign: "right"}}>
                              <td style={{textAlign: "left"}}>
                                  <div>
                                      Processing Fee ({orderDetails.order_details.amount_details.processing_fee_variable_percentage}%{orderDetails.order_details.amount_details.processing_fee_fixed_amount?` + ¢${orderDetails.order_details.amount_details.processing_fee_fixed_amount}`:``})
                                  </div>
                              </td>
                              <td style={{textAlign: "right"}}>
                                  <div>
                                  {/* {refundProcessingFee?(<span style={{color:"red",marginLeft:"10px"}}>(- ${(parseFloat(refundProcessingFee)).toFixed(2)})</span>):""}  */}
                                   ${orderDetails.order_details.amount_details.processing_fee.toFixed(2)}
                                  </div>
                              </td>
                          </tr>
                          <tr style={{textAlign: "left", verticalAlign: "top"}}>
                              <td style={{textAlign: "left"}}>
                                  <div>
                                      Taxes ({orderDetails.order_details.amount_details.taxes_variable_percentage}%{orderDetails.order_details.amount_details.taxes_fixed_amount?` + ¢${orderDetails.order_details.amount_details.taxes_fixed_amount}`:``})
                                  </div>
                              </td>
                              <td style={{textAlign: "right"}}>
                                  <div>
                                    {/* {orderDetails.order_details.amount_details.refundSalesFee?(<span style={{color:"red",marginLeft:"10px"}}>(- ${(parseFloat(orderDetails.order_details.amount_details.refundSalesFee)).toFixed(2)})</span>):""} */}
                                     ${orderDetails.order_details.amount_details.taxes.toFixed(2)}
                                  </div>
                              </td>
                          </tr>
                          { orderDetails.order_details.amount_details.credits_applied>0 && (<tr style={{textAlign: "left", verticalAlign: "top"}}>
                              <td style={{textAlign: "left"}}>
                                  <div>
                                      Credits Applied
                                  </div>
                              </td>
                              <td style={{textAlign: "right"}}>
                                  <div>
                                      -${orderDetails.order_details.amount_details.credits_applied.toFixed(2)}
                                  </div>
                              </td>
                          </tr>)}
                          <tr style={{textAlign: "left", verticalAlign: "top"}}>
                              <td style={{textAlign: "left"}}>
                                  <div>
                                      Tip
                                  </div>
                              </td>
                              <td style={{textAlign: "right"}}>
                                  <div>
                                      ${orderDetails.order_details.amount_details.tip || "0.00"}
                                  </div>
                              </td>
                          </tr>
                      </table>
                  </div>

                  <div className="px-8" style={{marginTop: "10px"}}>
                      <table style={{width: "100%"}}>
                          <tr style={{textAlign: "left", verticalAlign: "top"}}>
                              <td style={{textAlign: "left", borderTop:"2px solid #e6e8e6"}}>
                                  <div>
                                      <strong>Total Charged </strong> 
                                  </div>
                              </td>
                              <td style={{textAlign: "right", borderTop:"2px solid #e6e8e6"}}>
                                <div>
                                    <strong>${orderDetails.order_details.amount_details.grandTotal.toFixed(2)}</strong>
                                  </div>
                              </td>
                          </tr>
                      </table>                        
                  </div>
                  <div className="px-8" style={{marginTop: "10px"}}>
                      <table style={{width: "100%"}}>
                          <tr style={{textAlign: "left", verticalAlign: "top"}}>
                              <td style={{textAlign: "left", borderTop:"2px solid #e6e8e6"}}>
                                  <div>
                                      <strong>Total Cost </strong> 
                                  </div>
                              </td>
                              <td style={{textAlign: "right", borderTop:"2px solid #e6e8e6"}}>
                                <div>
                                    <strong>${orderDetails.order_details.amount_details.totalCost.toFixed(2)}</strong>
                                  </div>
                              </td>
                          </tr>
                      </table>                        
                  </div>
                  {/* {orderDetails.order_details.amount_details.refundTotal?
                    <div className="px-8" style={{marginTop: "5px"}}>
                      <table style={{width: "100%"}}>
                          <tr style={{textAlign: "left", verticalAlign: "top"}}>
                              <td style={{textAlign: "left", color:"red" }}>
                                  <div>
                                      Total Refunded
                                  </div>
                              </td>
                              <td style={{textAlign: "right", color:"red"}}>
                                <div>
                                    - ${orderDetails.order_details.amount_details.refundTotal}
                                  </div>
                              </td>
                          </tr>
                      </table>                        
                  </div>:""}  */}

                  </div>

          {/* <div style={{ marginTop: "40px", width: "60%", marginLeft: "235px" }}>
            {orderDetails.orderItems.map((item) => {
              var addOnName = ""
              {item.itemAddOn.map((addOn) => {
                
                 addOnName =  <div
                      style={{ backgroundColor: "lightgrey", fontSize:"13px" }}
                      className=""
                    >
                      {addOn.name + "($" + addOn.price + ")"}
                    </div>

              })}
              return (
                <div className="form-layout text-base border border-gray-200 ">
                  <div className="flex flex-row items-center ">
                    <div
                      style={{ backgroundColor: "lightgrey" }}
                      className="bg-gray-100 font-semibold py-4 px-6 w-1/2 text-right"
                    >
                      {item.itemName} * {item.itemCount}

                      {addOnName}
                    
                    </div>
                    <div className="px-8">${item.itemPrice}
                    </div>
                  </div>
                </div>
              );
            })}
                <div className="form-layout text-base border border-gray-200 ">
                  <div className="flex flex-row items-center ">
                    <div
                      style={{ backgroundColor: "lightgrey" }}
                      className="bg-gray-100 font-semibold py-4 px-6 w-1/2 text-right"
                    >
                      Tip
                    </div>
                    <div className="px-8">${orderDetails.tipAmount}</div>
                  </div>
                </div>
          </div>
          <div className="flex flex-row items-center text-xl font-bold ml-20">
            <div className=" font-bold py-2 px-6 w-1/2 text-right">
              Order Total
            </div>
            <div className="px-8">${orderDetails.amount}</div>
          </div> */}
          {orderDetails.status === "Pickup" ||
          orderDetails.status === "Completed" ? null : [2,3,4].includes(orderDetails.order_status)? (
            <div
              className="flex flex-row items-center mt-4 ml-5 "
              style={{ marginTop: "20px" }}
            >
              <div className=" font-semibold  w-1/3 text-left text-xl">
                Assigned Driver
              </div>
              <div style={{ marginLeft: "-120px" }}>
                {orderDetails.order_status == 2 ? (
                  <div style={{ width: "100%", display: "flex" }}>
                    <Select
                      menuPlacement="auto"
                      styles={customStyles}
                      options={drivers}
                      value={selectedDriver}
                      getOptionLabel={(option) => option.name}
                      getOptionValue={(option) => option.id}
                      inputId="order_type"
                      placeholder="Select driver....."
                      onChange={(selectedValue) =>
                        setSelectedDriver(selectedValue)
                      }
                    />
                    <button
                      onClick={handleAssignDriver}
                      className="shadow bg-blue-500  hover:bg-blue-400 border border-warning focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                    >
                      Assign
                    </button>
                  </div>
                ) : (
                  <div
                    className="px-8  text-xl "
                    style={{ marginLeft: "-45px" }}
                  >
                    {orderDetails.driver}
                  </div>
                )}
              </div>
            </div>
          ):null}
          <div className="flex flex-row items-center  mt-5 ml-5 ">
            <div className=" font-semibold  w-1/3 text-left text-xl">
              Order Status
            </div>
            <div style={{ marginLeft: "-135px" }}>
              <button
                className={
                  orderDetails.status === "Pending" ||
                  orderDetails.status === "Pickup"
                    ? "shadow bg-red-500 ml-3 hover:bg-red-400 border border-secondary focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                    : "shadow bg-white-500  hover:grey-red-400 border border-secondary focus:shadow-outline focus:outline-none text-black font-bold py-2 px-4 rounded"
                }
              >
                {/* {orderDetails.status === 'Pending' ||
								orderDetails.status === 'Completed' ||
								orderDetails.status === 'Delivered' ||
								orderDetails.status === 'Pickup' ||
								orderDetails.status === 'Food is on the way'
									? 'Pending'
									: 'Scheduled'} */}
                Pending
              </button>
            </div>
            {orderDetails.status === "Pickup" ||
            orderDetails.status === "Completed" ? null : (
              <>
                <button
                  className={
                    orderDetails.status === "Preparing food"
                      ? "shadow bg-red-500 ml-3 hover:bg-red-400 border border-secondary focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                      : "shadow bg-white-500 ml-3 hover:grey-red-400 border border-secondary focus:shadow-outline focus:outline-none text-black font-bold py-2 px-4 rounded"
                  }
                >
                  Preparing food
                </button>
                <button
                  className={
                    orderDetails.status === "Sprinting"
                      ? "shadow bg-red-500 ml-3 hover:bg-red-400 border border-secondary focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                      : "shadow bg-white-500 ml-3 hover:grey-red-400 border border-secondary focus:shadow-outline focus:outline-none text-black font-bold py-2 px-4 rounded"
                  }
                >
                  {" "}
                  Sprinting
                </button>
              </>
            )}
            <button
              className={
                orderDetails.status === "Delivered" ||
                orderDetails.status === "Completed"
                  ? "shadow bg-red-500 ml-3 hover:bg-red-400 border border-secondary focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                  : "shadow bg-white-500 ml-3 hover:grey-red-400 border border-secondary focus:shadow-outline focus:outline-none text-black font-bold py-2 px-4 rounded"
              }
            >
              {orderDetails.status === "Completed" ||
              orderDetails.status === "Pickup"
                ? "Completed"
                : "Delivered"}
            </button>
          </div>

          {orderDetails.status === "Delivered" && (
            <div className=" items-center mt-5 ml-5 ">
              <div className=" font-semibold  w-1/3 text-left text-xl">
                Delivery Images
              </div>
              <div className="flex mt-6">
                {orderDetails.delivery_image_urls &&
                  orderDetails.delivery_image_urls.map((image_url) => {
                    return (
                      <img
                        alt="upload image"
                        style={{
                          height: "150px",
                          width: "50%",
                          backgroundColor: "gray",
                          marginLeft: "10px",
                        }}
                        src={image_url}
                      />
                    );
                  })}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default OrderDetails;
