import React, { useEffect, useState } from "react";
import { useHistory, useLocation, useParams } from "react-router";
import { Link } from 'react-router-dom';
import Select from "react-select";
import {
    getOrderPaymentDetails,
    refund
} from "../../../../api";
import { useSelector } from "react-redux";
import moment from "moment";
import Loader from "../../../../globalComponent/layout/loader";

import {formatDateWithTime} from '../../../../utils/redableDateTime';

import RefundModal from "./refundModal";

const PaymentDetails = () => {
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

  const [paymentDetails, setPaymentDetails] = useState(null);
  let [refundModal,setRefundModal]=useState(false);
  // let [refundProcessingFee,setRefundProcessingFee]=useState(0.00);
  let [refundSalesFee,setRefundSalesFee]=useState(0.00);
  let [refundSubtotal,setRefundSubtotal]=useState(0.00);
  let [refundAmount,setRefundAmount]=useState(0.00);
  let [refundObj,setRefundObj]=useState({
    type:1,
    order_details:null,
    refund_amount:0,
    transaction_reference_id:null,
    payment_id:null,
    dispute_id:null,
    driver_id:null,
    datetime:null,
    admin_comment:null,
    refund_type:1,
  });
  let [showLoader, setShowLoader] = useState(false);

  useEffect(() => {
    getPaymentDetails();
  }, []);

  useEffect(() => {
    
    if(refundSubtotal)
    {
      // let stripeFeeAmount=0.00;
      // if(paymentDetails?.order_details.amount_details.processing_fee_variable_percentage && paymentDetails.order_details.amount_details.processing_fee_fixed_amount){
      //   stripeFeeAmount=parseFloat((((refundSubtotal*paymentDetails.order_details.amount_details.processing_fee_variable_percentage)/100)+(paymentDetails.order_details.amount_details.processing_fee_fixed_amount/100)).toFixed(2));
      // }else if(paymentDetails?.order_details.amount_details.processing_fee_variable_percentage){
      //     stripeFeeAmount=parseFloat(((refundSubtotal*paymentDetails.order_details.amount_details.processing_fee_variable_percentage)/100).toFixed(2));
      // }else if(paymentDetails?.order_details.amount_details.processing_fee_fixed_amount){
      //     stripeFeeAmount=parseFloat((paymentDetails.order_details.amount_details.processing_fee_fixed_amount/100).toFixed(2));
      // }else{
      //     stripeFeeAmount=0.00;
      // }
      
      // setRefundProcessingFee(stripeFeeAmount);
      
      let salesTaxAmount=0.00;

      if(paymentDetails?.order_details.amount_details.taxes_variable_percentage && paymentDetails.order_details.amount_details.taxes_fixed_amount){
          salesTaxAmount=parseFloat((((refundSubtotal*paymentDetails.order_details.amount_details.taxes_variable_percentage)/100)+(paymentDetails.order_details.amount_details.taxes_fixed_amount/100)).toFixed(2));
      }else if(paymentDetails?.order_details.amount_details.taxes_variable_percentage){
          salesTaxAmount=parseFloat(((refundSubtotal*paymentDetails.order_details.amount_details.taxes_variable_percentage)/100).toFixed(2));
      }else if(paymentDetails?.order_details.amount_details.taxes_fixed_amount){
          salesTaxAmount=parseFloat((paymentDetails.order_details.amount_details.taxes_fixed_amount/100).toFixed(2));
      }else{
          salesTaxAmount=0.00;
      }

      setRefundSalesFee(salesTaxAmount);
      // setRefundAmount(parseFloat((refundSubtotal+stripeFeeAmount+salesTaxAmount).toFixed(2)))
      setRefundAmount(parseFloat((refundSubtotal+salesTaxAmount).toFixed(2)))
    }else{
      // setRefundProcessingFee(0.00);
      setRefundSalesFee(0.00);
      setRefundAmount(0.00)
    }
    
  }, [refundSubtotal]);

  let calculateSubtotal=()=>{
    let amount=0.00;
    paymentDetails.order_details.ordered_items.forEach((item)=>{
      if(item.is_refunded){
        amount=amount+parseFloat(item.price)*item.refund_count
      }
      item.itemAddOn.forEach((addon)=>{
        if(addon.is_refunded){
          amount=amount+parseFloat(addon.price)*addon.refund_count
        }
      })
    })
    setRefundSubtotal(parseFloat(amount.toFixed(2)))
  }

  let handleItemCheckboxChange=(flag,itemIndex)=>{
    console.log(paymentDetails.order_details.ordered_items)
    let currentPaymentDetails={...paymentDetails};
    currentPaymentDetails.order_details.ordered_items[itemIndex].is_refunded=flag;
    if(flag){
      currentPaymentDetails.order_details.ordered_items[itemIndex].refund_count=currentPaymentDetails.order_details.ordered_items[itemIndex].itemCount;
      currentPaymentDetails.order_details.ordered_items[itemIndex].refund_amount=parseFloat(currentPaymentDetails.order_details.ordered_items[itemIndex].price)*currentPaymentDetails.order_details.ordered_items[itemIndex].itemCount;
    }else{
      delete currentPaymentDetails.order_details.ordered_items[itemIndex].refund_count
      delete currentPaymentDetails.order_details.ordered_items[itemIndex].refund_amount
    }
    for(let addon of currentPaymentDetails.order_details.ordered_items[itemIndex].itemAddOn){
      addon.is_refunded=flag;
      if(flag){
        addon.refund_count=currentPaymentDetails.order_details.ordered_items[itemIndex].itemCount;
        addon.refund_amount=parseFloat(addon.price)*currentPaymentDetails.order_details.ordered_items[itemIndex].itemCount;
      }else{
        delete addon.refund_count
        delete addon.refund_amount
      }
    }
    setPaymentDetails({...currentPaymentDetails});
    calculateSubtotal();
  }

  let handleAddonCheckboxChange=(flag,itemIndex, addonIndex)=>{
    console.log(paymentDetails.order_details.ordered_items)
    let currentPaymentDetails={...paymentDetails};
    currentPaymentDetails.order_details.ordered_items[itemIndex].itemAddOn[addonIndex].is_refunded=flag;
    if(flag){
      currentPaymentDetails.order_details.ordered_items[itemIndex].itemAddOn[addonIndex].refund_count=currentPaymentDetails.order_details.ordered_items[itemIndex].itemCount;
      currentPaymentDetails.order_details.ordered_items[itemIndex].itemAddOn[addonIndex].refund_amount=parseFloat(currentPaymentDetails.order_details.ordered_items[itemIndex].itemAddOn[addonIndex].price)*currentPaymentDetails.order_details.ordered_items[itemIndex].itemCount;
    }else{
      delete currentPaymentDetails.order_details.ordered_items[itemIndex].itemAddOn[addonIndex].refund_count
      delete currentPaymentDetails.order_details.ordered_items[itemIndex].itemAddOn[addonIndex].refund_amount
    }
    setPaymentDetails({...currentPaymentDetails});
    calculateSubtotal();
  }

  let handleItemRefundValueInputChange=(e,itemIndex)=>{
    console.log(paymentDetails.order_details.ordered_items)
    let currentPaymentDetails={...paymentDetails};
    if(e.target.value>=1 && e.target.value<=currentPaymentDetails.order_details.ordered_items[itemIndex].itemCount){
      currentPaymentDetails.order_details.ordered_items[itemIndex].refund_count=e.target.value;
      currentPaymentDetails.order_details.ordered_items[itemIndex].refund_amount=parseFloat(currentPaymentDetails.order_details.ordered_items[itemIndex].price)*parseInt(e.target.value);
    
      for(let addon of currentPaymentDetails.order_details.ordered_items[itemIndex].itemAddOn){
        addon.refund_count=e.target.value;
        addon.refund_amount=parseFloat(addon.price)*parseInt(e.target.value);
      }
    }
    setPaymentDetails({...currentPaymentDetails});
    calculateSubtotal();
  }

  let handleAddonRefundValueInputChange=(e,itemIndex, addonIndex)=>{
    console.log(paymentDetails.order_details.ordered_items)
    let currentPaymentDetails={...paymentDetails};
    if(e.target.value>=1 && e.target.value<=currentPaymentDetails.order_details.ordered_items[itemIndex].itemCount){
      currentPaymentDetails.order_details.ordered_items[itemIndex].itemAddOn[addonIndex].refund_count=e.target.value;
      currentPaymentDetails.order_details.ordered_items[itemIndex].itemAddOn[addonIndex].refund_amount=parseFloat(currentPaymentDetails.order_details.ordered_items[itemIndex].itemAddOn[addonIndex].price)*parseInt(e.target.value);
    }
    setPaymentDetails({...currentPaymentDetails});
    calculateSubtotal();
  }

  let handleIntiateRefund=()=>{
    // setRefundAmount(parseFloat((refundSubtotal+refundProcessingFee+refundSalesFee).toFixed(2)))
    setRefundAmount(parseFloat((refundSubtotal+refundSalesFee).toFixed(2)))
    let orderCost=parseFloat((parseFloat(paymentDetails.order_details.amount_details.totalCost)-parseFloat(paymentDetails.Order.tip_amount)-parseFloat(paymentDetails.order_details.amount_details.processing_fee)).toFixed(2))
    if(orderCost<=refundAmount){
      console.log("complete",refundAmount,orderCost)
      setRefundObj({
        ...refundObj,
        type:1,
        refund_type:2,
      })
    }else{
      console.log("partial",refundAmount,orderCost)
      setRefundObj({
        ...refundObj,
        type:1,
        refund_type:1,
      })
    }
    setRefundModal(true);
  }

  let handleRefund=()=>{
    setShowLoader(true);
				let data={
					body:{
						...refundObj,
            order_details:{
              ...paymentDetails.order_details,
              amount_details:{
                ...paymentDetails.order_details.amount_details,
                refundSalesFee:refundSalesFee,
                refundSubtotal:refundSubtotal,
                refundTotal:refundAmount,
              }
            },
            refund_amount:refundAmount,
            datetime:moment(new Date()).format("YYYY-MM-DD"),
					}						
				}

				refund(token,data)
        .then((response) => {
          setShowLoader(false);
          setRefundModal(false);
          setTimeout(()=>{
            history.push(`/refunds`)
          },1000)
			}).catch((error) => { 
				setShowLoader(false);
			}	)
  }

  const getPaymentDetails = () => {
    let data={
      params:{
        payment_id:params.payment_id,
      }
    }
    getOrderPaymentDetails(token, data)
      .then((response) => {
          console.log("response",response)
        setPaymentDetails(response.payment);
        if(response.payment.order_details.amount_details.refundSubtotal){
          setRefundSubtotal(response.payment.order_details.amount_details.refundSubtotal)
        }
        setRefundObj({
          ...refundObj,
          order_details:response.payment.order_details,
          transaction_reference_id:response.payment.transaction_reference_id,
          payment_id:response.payment.payment_id,
        })
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
    <RefundModal
      refundModal={refundModal}
      setRefundModal={setRefundModal}
      refundDetails={paymentDetails}
      refundAmount={refundAmount}
      refundObj={refundObj}
      setRefundObj={setRefundObj}
      handleRefund={handleRefund}
    />
    <div
      className="main-content pb-16 md:pb-5 flex-1 pt-20 px-2"
      style={{ overflowY: "scroll", height: "100vh" }}
    >
        {!paymentDetails || showLoader ? (
            <Loader />
        ) : (
                <div className="p-4 md:p-8 mt-6 lg:mt-0 rounded shadow bg-white">
                    <div className="flex">
                        <h3 className="text-2xl text-gray-400 font-bold mb-6">
                            Payment Id #{paymentDetails.payment_id}
                        </h3>
                        <button
                            style={{ height: "3rem", marginLeft: "45%" }}
                            onClick={() => history.push("/payments")}
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
                                to={`/orderDetails/${paymentDetails.order_id}`}
                                style={{color:'#39B7CD	'}}>
                                {paymentDetails.order_id}
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
                        <div className="px-8 text-lg">{paymentDetails.order_details.customer.name}</div>
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
                        <div className="px-8 text-lg">{paymentDetails.order_details.restaurant.restaurant_name}</div>
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
                        <div className="px-8 text-lg">{paymentDetails.order_details.hotspot.name}</div>
                      </div>
                    </div>
                    <div className="form-layout text-base" style={{ marginTop: "-20px" }}>
                      <div className="flex flex-row items-center ">
                        <div
                          className="font-semibold py-4 px-6 text-left text-lg"
                          style={{ width: "21%" }}
                        >
                          Amount($)
                        </div>
                        <div className="px-8 text-lg">${paymentDetails.order_details.amount_details.totalCost}</div>
                      </div>
                    </div>       

                    <div className="px-8 text-base" style={{marginTop: "10px"}}>
                      <table style={{width: "100%"}}>

                      {paymentDetails.order_details.ordered_items.map((ordered_item,itemIndex)=> {
                        return (
                            <tr style={{verticalAlign: "top"}}>
                                <td style={{textAlign: "left"}}>
                                    <div>
                                        {ordered_item.itemCount}x
                                    </div>
                                </td>
                                <td>
                                    <div>
                                      <input  
                                        style={{marginRight:"5px",height:"15px",width:"15px",border:"2px solid black", borderRadius:"5px"}}
                                        type="checkbox" 
                                        checked={ordered_item.is_refunded} 
                                        onChange={()=>paymentDetails.refund_type==0?handleItemCheckboxChange(!ordered_item.is_refunded,itemIndex):""}                                           
                                      />
                                          {ordered_item.is_refunded?
                                            <input 
                                              style={{marginRight:"5px",textAlign:"center",height:"20px",width:"40px",paddingLeft:"2px" ,border:"1px solid rgba(0,0,0,0.5)", borderRadius:"5px"}}
                                              type="number" 
                                              value={ordered_item.refund_count} 
                                              min={1} 
                                              max={ordered_item.itemCount} 
                                              onChange={(e)=>paymentDetails.refund_type==0?handleItemRefundValueInputChange(e,itemIndex):""}                
                                            />:""
                                          } 
                                      {ordered_item.itemName} (${(parseFloat(ordered_item.price)*ordered_item.itemCount).toFixed(2)}) {ordered_item.is_refunded?(<span style={{color:"red",marginRight:"10px"}}>(- ${(parseFloat(ordered_item.refund_amount)).toFixed(2)})</span>):""}
                                  
                          {ordered_item.itemAddOn.map((addOn,addonIndex)=> {
                              return <li style={{/*fontSize: "13px"*/}}>
                                <input
                                style={{marginRight:"5px",height:"15px",width:"15px",border:"2px solid black", borderRadius:"5px"}}
                                 type="checkbox" 
                                 checked={addOn.is_refunded} 
                                 onChange={()=>paymentDetails.refund_type==0?handleAddonCheckboxChange(!addOn.is_refunded,itemIndex,addonIndex):""}                                    
                                 />
                                {addOn.is_refunded?
                                  <input 
                                    style={{marginRight:"5px",textAlign:"center",marginLeft:"5px",height:"20px",width:"40px",paddingLeft:"2px" ,border:"1px solid rgba(0,0,0,0.5)", borderRadius:"5px"}}
                                    type="number" 
                                    value={addOn.refund_count} 
                                    min={1} 
                                    max={ordered_item.itemCount} 
                                    onChange={(e)=>paymentDetails.refund_type==0?handleAddonRefundValueInputChange(e,itemIndex,addonIndex):""}                
                                />:""} 
                                {addOn.name} (${(parseFloat(addOn.price)*ordered_item.itemCount).toFixed(2)}) {addOn.is_refunded?(<span style={{color:"red",marginRight:"10px"}}>(- ${(parseFloat(addOn.refund_amount)).toFixed(2)})</span>):""}
                              </li>
                          })}

                         { ordered_item.preference && ordered_item.preference.trim()!==""?(
                              <div>
                                  <i>Preference: </i>
                                      <span style={{/*fontSize: "13px"*/}}>
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
                                  {refundSubtotal?(<span style={{color:"red",marginLeft:"10px"}}>(- ${(parseFloat(refundSubtotal)).toFixed(2)})</span>):""}  ${paymentDetails.order_details.amount_details.subtotal.toFixed(2)}
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
                                      {paymentDetails.order_details.amount_details.regulatory_response_fee?`$${paymentDetails.order_details.amount_details.regulatory_response_fee.toFixed(2)}`:`Free`}
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
                                      {paymentDetails.order_details.amount_details.delivery_fee?`$${paymentDetails.order_details.amount_details.delivery_fee.toFixed(2)}`:`Free`}
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
                                      {paymentDetails.order_details.amount_details.service_fee?`$${paymentDetails.order_details.amount_details.service_fee.toFixed(2)}`:`Free`}
                                  </div>
                              </td>
                          </tr>
                          <tr style={{textAlign: "right"}}>
                              <td style={{textAlign: "left"}}>
                                  <div>
                                      Processing Fee ({paymentDetails.order_details.amount_details.processing_fee_variable_percentage}%{paymentDetails.order_details.amount_details.processing_fee_fixed_amount?` + ¢${paymentDetails.order_details.amount_details.processing_fee_fixed_amount}`:``})
                                  </div>
                              </td>
                              <td style={{textAlign: "right"}}>
                                  <div>
                                  {/* {refundProcessingFee?(<span style={{color:"red",marginLeft:"10px"}}>(- ${(parseFloat(refundProcessingFee)).toFixed(2)})</span>):""}  */}
                                   ${paymentDetails.order_details.amount_details.processing_fee.toFixed(2)}
                                  </div>
                              </td>
                          </tr>
                          <tr style={{textAlign: "left", verticalAlign: "top"}}>
                              <td style={{textAlign: "left"}}>
                                  <div>
                                      Taxes ({paymentDetails.order_details.amount_details.taxes_variable_percentage}%{paymentDetails.order_details.amount_details.taxes_fixed_amount?` + ¢${paymentDetails.order_details.amount_details.taxes_fixed_amount}`:``})
                                  </div>
                              </td>
                              <td style={{textAlign: "right"}}>
                                  <div>
                                  {refundSalesFee?(<span style={{color:"red",marginLeft:"10px"}}>(- ${(parseFloat(refundSalesFee)).toFixed(2)})</span>):""}  ${paymentDetails.order_details.amount_details.taxes.toFixed(2)}
                                  </div>
                              </td>
                          </tr>
                          { paymentDetails.order_details.amount_details.credits_applied>0 && (<tr style={{textAlign: "left", verticalAlign: "top"}}>
                              <td style={{textAlign: "left"}}>
                                  <div>
                                      Credits Applied
                                  </div>
                              </td>
                              <td style={{textAlign: "right"}}>
                                  <div>
                                      -${paymentDetails.order_details.amount_details.credits_applied.toFixed(2)}
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
                                      ${paymentDetails.Order.tip_amount || "0.00"}
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
                                    <strong>${paymentDetails.order_details.amount_details.grandTotal.toFixed(2)}</strong>
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
                                    <strong>${paymentDetails.order_details.amount_details.totalCost.toFixed(2)}</strong>
                                  </div>
                              </td>
                          </tr>
                      </table>                        
                  </div>
                  {refundAmount?
                    <div className="px-8" style={{marginTop: "5px"}}>
                      <table style={{width: "100%"}}>
                          <tr style={{textAlign: "left", verticalAlign: "top"}}>
                              <td style={{textAlign: "left", color:"red" }}>
                                  <div>
                                      Total Refund
                                  </div>
                              </td>
                              <td style={{textAlign: "right", color:"red"}}>
                                <div>
                                    - ${refundAmount}
                                  </div>
                              </td>
                          </tr>
                      </table>                        
                  </div>:""} 
                  {paymentDetails.refund_type==0?<div className="px-8" style={{display:"flex", marginTop: "10px", justifyContent:"center"}}>
                      <div>
                        <button 
                          style={{backgroundColor:refundSubtotal?"rgb(50,120,50)":"rgba(50,120,50,0.5)"}}
                          className='shadow bg-red-500 ml-3 hover:bg-red-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded'
                          onClick={handleIntiateRefund}
                          disabled={refundSubtotal?false:true}>
                          Initiate Refund
                        </button>
                      </div>
                  </div>:""}
                </div>
        )}
    </div>
    </>
  );
};

export default PaymentDetails;
