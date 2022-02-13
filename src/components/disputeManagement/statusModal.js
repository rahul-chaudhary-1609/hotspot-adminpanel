import React, { useState } from "react";
import Modal from "react-modal";
import Select from "react-select";
import { changeDisputeStatus } from '../../api';
import { useSelector} from 'react-redux';
import Loader from "../../globalComponent/layout/loader";

const StatusModal = (props) => {
  const token = useSelector((state) => state.auth.isSignedIn);
  const customStyles = {
    content: {
      top: "55%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      width: "40%",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      marginLeft: "135px",
    },
  };

  const selectCustomStyles = {
    control: (provided, state) => ({
        ...provided,
        width: '100%',
        backgroundColor: '#fafafa',
        borderColor: 'grey',height:"100%",
        minHeight:"50px",
        // marginBottom:"12px",
        // borderRadius: '9999px',
    }),
    container: (provided, state) => ({
        ...provided,
        width: '100%',
        borderRadius: '1.75rem',
        backgroundColor: '#fafafa',
        borderColor: 'grey',
    }),
};

  console.log("props", props);

  const [loader,setLoader]=useState(false);
  

  const closeModal = () => {
    props.setStatusModal(false);
  };

  const handleChangeStatus=()=>{
    setLoader(true);
    let data={
      body:{
        dispute_id:props.disputeDetails?.dispute_id,
        result:props.selectedResult?.value,
        status:props.selectedStatus?.value,
        admin_comment:props.adminComment && props.adminComment.trim()?props.adminComment:null,
      }
    }
    changeDisputeStatus(token, data)
      .then((response) => {
        console.log("response",response);
        setLoader(false);
        props.setStatusModal(false);
        props.handleReload();       

      })
      .catch((error) => {
        console.log(error);
        setLoader(false);
      });
  }

  return (
    <>
      <Modal
        isOpen={props.statusModal}
        onRequestClose={closeModal}
        style={customStyles}
      >
        <h3 style={{ textAlign: "center", fontSize: "20px" }}>Dispute #{props.disputeDetails?.dispute_id}</h3>
        {loader?<Loader height="350px"/>:<div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <div className="form-layout text-base" style={{ marginTop: "-20px" }}>
            <div className="flex flex-row items-center ">
              <div
                className="font-semibold py-4 px-6 text-left text-md"
                style={{ width: "21%" }}
              >
                Order ID
              </div>
              <div className="px-8 text-md">
                {props.disputeDetails?.order_id}
              </div>
            </div>
          </div>
          <div className="form-layout text-base" style={{ marginTop: "-20px" }}>
            <div className="flex flex-row items-center ">
              <div
                className="font-semibold py-4 px-6 text-left text-md"
                style={{ width: "21%" }}
              >
                Customer
              </div>
              <div className="px-8 text-md">
                {props.disputeDetails?.Order.order_details.customer.name}
              </div>
            </div>
          </div>
          <div className="form-layout text-base" style={{ marginTop: "-20px" }}>
            <div className="flex flex-row items-center ">
              <div
                className="font-semibold py-4 px-6 text-left text-md"
                style={{ width: "21%" }}
              >
                Email
              </div>
              <div className="px-8 text-md">
                {
                  props.disputeDetails?.Order.order_details.customer.email
                }
              </div>
            </div>
          </div>
          <div className="form-layout text-base" style={{ marginTop: "-20px" }}>
            <div className="flex flex-row items-center ">
              <div
                className="font-semibold py-4 px-6 text-left text-md"
                style={{ width: "21%" }}
              >
                Issue
              </div>
              <div className="px-8 text-md">{props.disputeDetails?.title}</div>
            </div>
          </div>
          <div className="form-layout text-base" style={{ marginTop: "10px" }}>
            <div className="flex flex-row items-center ">
              <div
                className="font-semibold py-4 px-6 text-left text-md"
                style={{ width: "21%" }}
              >
                Add Comment
              </div>
              <div className="px-8 text-md" style={{ width: "75%" }}>
                <textarea
                  style={{
                    border: "2px solid rgba(0,0,0,0.1)",
                    padding: "5px",
                    width: "100%",
                  }}
                  rows="3"
                  cols="100"
                  value={props.adminComment}
                  onChange={(e)=>{props.setAdminComment(e.target.value)}}
                />
              </div>
            </div>
          </div>
          <div className="form-layout text-base" style={{ marginTop: "10px" }}>
            <div className="flex flex-row items-center ">
              <div
                className="font-semibold py-4 px-6 text-left text-md"
                style={{ width: "21%" }}
              >
                Result
              </div>
              <div className="px-8 text-md" style={{ width: "75%" }}>
                    <Select
                        menuPlacement="top"
                        maxMenuHeight={150}
                        styles={selectCustomStyles}
                        options={props.disputeResult}
                        placeholder="Select Result"
                        value={props.selectedResult}
                        onChange={(selectedResult)=>{
                          props.setSelectedResult(selectedResult)
                        }}
                        required
                        disabled={props.disputeResult?false:true}
                      />
              </div>
            </div>
          </div>
          <div className="form-layout text-base" style={{ marginTop: "10px" }}>
            <div className="flex flex-row items-center ">
              <div
                className="font-semibold py-4 px-6 text-left text-md"
                style={{ width: "21%" }}
              >
                Status
              </div>
              <div className="px-8 text-md" style={{ width: "75%" }}>
                    <Select
                        menuPlacement="top"
                        maxMenuHeight={150}
                        styles={selectCustomStyles}
                        options={props.disputeStatus}
                        placeholder="Select Status"
                        value={props.selectedStatus}
                        onChange={(selectedStatus)=>{
                          props.setSelectedStatus(selectedStatus)
                        }}
                        required
                        disabled={props.disputeStatus?false:true}
                      />
              </div>
            </div>
          </div>
        </div>
}
        <div style={{ display: "flex", marginTop: "20px" }}>
          <button
            onClick={closeModal}
            style={{
              width: "100%",
              backgroundColor: "red",
              color: "white",
              border: "2px solid red",
            }}
          >
            Cancel
          </button>
          <button
            onClick={() =>handleChangeStatus()}
            style={{
              width: "100%",
              marginLeft: "10px",
              backgroundColor: "green",
              color: "white",
              border: "2px solid green",
            }}
          >
            Done
          </button>
        </div>
      </Modal>
    </>
  );
};

export default StatusModal;
