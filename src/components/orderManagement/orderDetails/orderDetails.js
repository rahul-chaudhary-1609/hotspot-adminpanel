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
      let hotspotId = orderDetails.hotspotLocation.id;
      const res = await getDriverListByHotspot(token, hotspotId);
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

          <div style={{ marginTop: "40px", width: "60%", marginLeft: "235px" }}>
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
          </div>
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
