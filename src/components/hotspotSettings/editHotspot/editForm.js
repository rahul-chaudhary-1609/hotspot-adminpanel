import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import ClearIcon from "@material-ui/icons/Clear";
import CustomTimePicker from "../../../globalComponent/layout/timePicker";
import moment from "moment";
import AddIcon from "@material-ui/icons/Add";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import Select from "react-select";
import {
  getDriverLists,
  listRestaurant,
  deleteHotspot,
} from "../../../api";
import { useSelector } from "react-redux";

import Loader from "../../../globalComponent/layout/loader";
import DeleteModal from "../../deleteModal/deleteModal";

const EditForm = (props) => {
  const history = useHistory();
  const token = useSelector((state) => state.auth.isSignedIn);

  let { location_detail } = props.scheduleDetails;

  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      width: "100%",
      backgroundColor: "#fafafa",
      borderColor: "grey",height:"100%",
			minHeight:"50px",marginBottom:"12px",
      // borderRadius: '9999px',
    }),
    container: (provided, state) => ({
      ...provided,
      width: "100%",
      borderRadius: "1.75rem",
      backgroundColor: "#fafafa",
      borderColor: "grey",
    }),
  };
  const [driver, setDriver] = useState(null);
  const [restaurant, setRestaurant] = useState(null);

  const { id } = useParams();
  const [deleteModal, setDeleteModal] = useState(false);

  const handleLocation = (location) => {
    let service = new window.google.maps.places.PlacesService(
      document.getElementById("map")
    );
    service.getDetails(
      {
        placeId: location.value.place_id,
        fields: ["geometry"],
      },
      async function (place, status) {
        let locations = [];
        let latitude = place.geometry.location.lat();
        let longitude = place.geometry.location.lng();
        locations.push(latitude);
        locations.push(longitude);

        let newScheduleDetails = { ...props.scheduleDetails };

        const response = await fetch(
          `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=AIzaSyCqeKge8JYCJdvyt77p0QEqIr0dMyA8BOM`
        );

        const jsonResponse = await response.json();

        const findAddressType = (key) => {
          return jsonResponse.results[0].address_components.find(
            (val) => val.types[0] === key
          );
        };

        const location_detail = jsonResponse.results[0].formatted_address;
        const location = [latitude, longitude];

        const cityComponent =
          findAddressType("administrative_area_level_2") ||
          findAddressType("postal_town") ||
          findAddressType("locality");

        const city = cityComponent ? cityComponent.long_name : null;
        const state = findAddressType("administrative_area_level_1")
          ? findAddressType("administrative_area_level_1").long_name
          : null;
        const country = findAddressType("country")
          ? findAddressType("country").long_name
          : null;
        const postal_code = findAddressType("postal_code")
          ? findAddressType("postal_code").long_name
          : null;

        newScheduleDetails["location_detail"] = location_detail;
        newScheduleDetails["location"] = location;
        newScheduleDetails["city"] = city;
        newScheduleDetails["state"] = state;
        newScheduleDetails["country"] = country;
        newScheduleDetails["postal_code"] = postal_code;

        props.setScheduleDetails(newScheduleDetails);
      }
    );
  };

  useEffect(() => {
    driverLists();
    restaurantLists();
  }, []);

  const driverLists = () => {
    getDriverLists(token, "", "", "")
      .then((drivers) => {
        let updatedList = drivers.driverList.rows;
        updatedList = updatedList.reduce((acc, curr) => {
          if (curr.status === 1 && curr.approval_status === 1) {
               return acc.concat({ label: curr.name, value: curr.id });
          }
          return acc;
        }, []);

        props.setDriverList(updatedList);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const restaurantLists = () => {
    let data={
      query:{
        is_pagination:1,
        page:1,
        page_size:10,
      }
    }
    listRestaurant(token, data)
      .then((restaurants) => {
        let updatedList = restaurants.restaurantList.rows;
        updatedList = updatedList.reduce((acc, curr) => {
          if (curr.status == 1) {
            return acc.concat({
              restaurant_name: curr.restaurant_name,
              id: curr.id,
            });
          }
          return acc;
        }, []);
        props.setRestaurantList(updatedList);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleDelete = () => {
    deleteHotspot(token, id)
      .then((res) => {
        history.push("/hotspots");
        setDeleteModal(false);
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
        <div className="p-4 md:p-8 mt-6 lg:mt-0 rounded shadow bg-white w-3/4 mx-auto">
          <h3 className="text-2xl font-bold mb-4">{props.title}</h3>

          <div
            style={{
              marginLeft: "75%",
              marginTop: "-50px",
            }}
          >
            <button
              style={{ height: "3rem" }}
              onClick={() => {
                if (props.id) {
                  history.push(`/hotspots/${props.id}`);
                } else {
                  history.push("/hotspots");
                }
              }}
              className="shadow bg-blue-500 ml-3 hover:bg-blue-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
              type="button"
            >
              Back
            </button>

            <button
              style={{ height: "3rem" }}
              form="myForm"
              type="submit"
              className="shadow bg-red-500 ml-3 hover:bg-red-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
            >
              Save
            </button>
            {props.title === "Edit Hotsot Details" && (
              <button
                style={{ height: "3rem" }}
                onClick={() => {
                  setDeleteModal(true);
                }}
                className="shadow bg-blue-500 ml-3 hover:bg-blue-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                type="button"
              >
                Delete
              </button>
            )}

            <DeleteModal
              {...{
                setDeleteModal,
                deleteModal,
                name: "Hotspot",
                handleDelete,
              }}
            />
          </div>
          <br />
          {props.error && (
            <p
              style={{
                color: "red",
                fontSize: "20px",
                textAlign: "center",
                width: "100%",
              }}
            >
              {props.error}
            </p>
          )}
          {props.successMsg && (
            <div
              style={{
                backgroundColor: "#9ACD32",
                padding: "10px",
                width: "fit-content",
                marginLeft: "auto",
                marginRight: "auto",
                marginTop: "12px",
              }}
            >
              {props.successMsg}
            </div>
          )}
          {props.showLoader ? (
            <Loader />
          ) : (
            props.scheduleDetails && (
              <form
                id="myForm"
                onSubmit={props.handleSchedule}
                style={{ marginTop: "40px" }}
                className="w-full mt-50 max-w-full text-base text-gray-200"
              >
                <div className="w-full flex  px-3  d-inline-flex">
                  <label
                    className=" w-1/2 block tracking-wide mb-2 text-gray-300"
                    for="name"
                  >
                    Hotspot Name
                  </label>
                  <input
                    className="appearance-none block w-1/2 bg-gray-100 border border-gray-200 rounded-half py-3 px-6 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-200"
                    id="name"
                    type="text"
                    required
                    value={props.scheduleDetails.name}
                    onChange={(e) => {
                      let data = e.target.value;
                      let schedule = { ...props.scheduleDetails };
                      schedule.name = data;
                      props.setScheduleDetails(schedule);
                    }}
                  />
                </div>

                <div className="w-full flex  px-3 mb-6 md:mb-0 d-inline-flex">
                  <label
                    className="w-1/2 block tracking-wide mb-2 text-gray-300 mb-2"
                    for="text"
                  >
                    Address
                  </label>
                  <div style={{ display: "inline-grid", width: "50%" }}>
                    <GooglePlacesAutocomplete
                      inputStyle={{
                        height: 40,
                        fontSize: 28,
                      }}
                      components={{
                        DropdownIndicator: () => null,
                        IndicatorSeparator: () => null,
                      }}
                      suggestionsStyles={{
                        container: {
                          padding: 16,
                          background: "#efefef",
                        },
                        suggestion: {
                          background: "#eee",
                          cursor: "pointer",
                        },
                        suggestionActive: {
                          background: "#bbb",
                        },
                      }}
                      selectProps={{
                        placeholder: "Search the hotspot address...",
                        location_detail,
                        onChange: handleLocation,
                        styles: {
                          indicatorsContainer: (prevStyle, state) => ({
                            ...prevStyle,
                            display: "none",
                          }),
                          container: (prevStyle) => ({
                            ...prevStyle,
                            width: "100%",
                          }),
                        },
                      }}
                      // apiKey={'AIzaSyA7NF6WwqPWNK2kDDVN6ayffGd10-0aqJs'}
                      apiKey={"AIzaSyCqeKge8JYCJdvyt77p0QEqIr0dMyA8BOM"}
                    />

                    <input
                      className="appearance-none not-allowed block w-full mt-4 bg-gray-100 border border-gray-200 rounded-half py-3 px-6 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-200"
                      id="address"
                      type="text"
                      disabled
                      value={location_detail}
                    />
                  </div>
                  <div id="map" style={{ display: "none" }}></div>
                </div>

                <div className="w-full flex  px-3 mb-6 md:mb-0 d-inline-flex">
                  <label
                    className="block w-1/2 tracking-wide text-gray-300 mb-2"
                    for="restaurant_name"
                  >
                    Drop Offs
                  </label>
                  <div className="flex flex-col w-1/2">
                    {props.scheduleDetails.dropoffs &&
                      props.scheduleDetails.dropoffs.map((dropoff, index) => {
                        return (
                          <div className="flex w-full">
                            <input
                              className="appearance-none block w-full  bg-gray-100 border border-gray-200 rounded-half py-3 px-6 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-200"
                              id="dropoffs"
                              type="text"
                              value={dropoff}
                              onChange={(e) => {
                                let data = e.target.value;
                                let schedule = { ...props.scheduleDetails };
                                schedule.dropoffs[index] = data;
                                props.setScheduleDetails(schedule);
                              }}
                            />
                            <ClearIcon
                              style={{ marginLeft: "10px", marginTop: "7px" }}
                              onClick={() => {
                                let schedule = { ...props.scheduleDetails };
                                schedule.dropoffs.splice(index, 1);
                                props.setScheduleDetails(schedule);
                              }}
                            />
                          </div>
                        );
                      })}
                    <AddIcon
                      style={{ fontSize: "30px" }}
                      onClick={() => {
                        let schedule = { ...props.scheduleDetails };

                        schedule.dropoffs.push("");
                        props.setScheduleDetails(schedule);
                      }}
                    />
                  </div>
                </div>

                <div className="w-full flex px-3 mb-6 md:mb-0 mt-5 d-inline-flex">
                  <label
                    className="block w-1/2 tracking-wide text-gray-300 mb-2"
                    for="cut_off_time"
                  >
                    Delivery Shifts
                  </label>

                  <div className="flex flex-col w-1/2">
                    {props.scheduleDetails.delivery_shifts.map(
                      (shifts, index) => {
                        let { value, id } = shifts;
                        return (
                          <>
                            <div className="flex">
                              <CustomTimePicker
                                use12Hours
                                format="h:mm A"
                                value={value && moment(value, "HH:mm:ss")}
                                className="appearance-none block w-full bg-gray-100 border border-gray-200 rounded-half py-3 px-6 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-200"
                                id={id}
                                onChange={(e) => {
                                  let schedule = { ...props.scheduleDetails };
                                  if (e) {
                                    let data = e.format("HH:mm:ss");

                                    schedule.delivery_shifts[index].value =
                                      data;
                                  } else {
                                    schedule.delivery_shifts[index].value =
                                      null;
                                  }
                                  props.setScheduleDetails(schedule);
                                }}
                              />
                              <ClearIcon
                                style={{ marginLeft: "10px", marginTop: "7px" }}
                                onClick={() => {
                                  let schedule = { ...props.scheduleDetails };
                                  schedule.delivery_shifts.splice(index, 1);
                                  props.setScheduleDetails(schedule);
                                }}
                              />
                            </div>
                          </>
                        );
                      }
                    )}
                    {props.scheduleDetails.delivery_shifts.length < 3 && (
                      <AddIcon
                        style={{ fontSize: "30px" }}
                        onClick={() => {
                          let schedule = { ...props.scheduleDetails };
                          schedule.delivery_shifts.push({
                            id: new Date().getTime(),
                            value: null,
                          });
                          props.setScheduleDetails(schedule);
                        }}
                      />
                    )}
                  </div>
                </div>

                <div className="w-full flex px-3 mb-6 md:mb-0 mt-5 d-inline-flex">
                  <label
                    className="block w-1/2 tracking-wide mt-5 text-gray-300 mb-2"
                    for="cut_off_time"
                  >
                    Restaurants
                  </label>

                  <div className="w-1/2 mt-3  px-3 flex flex-col">
                    <Select
                      value={props.scheduleDetails.restaurants}
                      styles={customStyles}
                      menuPlacement="auto"
                      options={
                        props.restaurantList &&
                        props.restaurantList.filter((restaurant) => {
                          let resp = props.scheduleDetails.restaurants.find(
                            (res) => res.id === restaurant.value
                          );
                          return !resp;
                        })
                      }
                      getOptionLabel={(option) => option.restaurant_name}
                      getOptionValue={(option) => option.id}
                      isMulti={true}
                      inputId="restaurant"
                      placeholder="Select the restaurant...."
                      onChange={(selectedValue) => {
                        setRestaurant(selectedValue);
                        let schedule = { ...props.scheduleDetails };
                        schedule.restaurants = selectedValue;
                        props.setScheduleDetails(schedule);
                      }}
                    />
                  </div>
                </div>
                <div className="w-full flex px-3 mb-6 md:mb-0  mt-5 d-inline-flex">
                  <label
                    className="block w-1/2 tracking-wide text-gray-300 mb-2"
                    for="cut_off_time"
                  >
                    Drivers
                  </label>

                  <div className="w-1/2 mt-3  px-3 flex flex-col">
                    {/* <div style={{ display: 'flex ' }}> */}
                    <Select
                      value={props.scheduleDetails.drivers}
                      styles={customStyles}
                      options={props.driverList}
                      inputId="drivers"
                      menuPlacement="auto"
                      placeholder="select the driver...."
                      isMulti
                      onChange={(selectedValue) => {
                        setDriver(selectedValue);
                        let schedule = { ...props.scheduleDetails };
                        schedule.drivers = selectedValue;
                        props.setScheduleDetails(schedule);
                      }}
                    />

                    {/* </div> */}
                  </div>
                </div>
              </form>
            )
          )}
        </div>
      </div>
    </>
  );
};
export default EditForm;
