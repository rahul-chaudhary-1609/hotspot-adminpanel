import React , { useEffect, useState } from 'react'
import CustomDatePicker from '../../globalComponent/layout/customDatePicker.js'
import { useSelector } from 'react-redux';
import moment from 'moment';
import { useHistory, useParams, useLocation } from 'react-router';
import { DatePicker } from 'antd';
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import { fetchDriverPaymentDetails, handleDriverPaymentDetails } from '../../api';
import { loadStripe } from '@stripe/stripe-js';
import Loader from "../../globalComponent/layout/loader";
import ToggleOffIcon from '@material-ui/icons/ToggleOff';
import ToggleOnIcon from '@material-ui/icons/ToggleOn';
import ConfirmationModal from '../confirmationModal/confirmationModal';


export default function DriverPayNow(props) {

	var visaPattern = /^(?:4[0-9]{12}(?:[0-9]{3})?)$/;
	var mastPattern = /^(?:5[1-5][0-9]{14})$/;
	var amexPattern = /^(?:3[47][0-9]{13})$/;
	var discPattern = /^(?:6(?:011|5[0-9][0-9])[0-9]{12})$/;


	function validateCreditCardNumber(ccNum) {

		var isVisa = visaPattern.test( ccNum ) === true;
		var isMast = mastPattern.test( ccNum ) === true;
		var isAmex = amexPattern.test( ccNum ) === true;
		var isDisc = discPattern.test( ccNum ) === true;
	
		if( isVisa || isMast || isAmex || isDisc ) {
			// at least one regex matches, so the card number is valid.
			return true
		}
		else {
			return false
		}
	}


	const history = useHistory();
	const { id } = useParams();
	const token = useSelector((state) => state.auth.isSignedIn);
	const { pathname } = useLocation();
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
	const [cardMonth, setCardMonth] = useState(0);
	const [cardYear, setCardYear] = useState(0);
	const [cardNo, setCardNo] = useState();
	const [showLoader, setShowLoader] = useState(false);
	const [paidOfflineToggle,setPaidOfflineToggle]=useState(false);
	const [confirmationModal, setConfirmationModal] = useState(false);
	const [payData,setPayData]=useState(null);



	const handleCardMonth = (date, dateString) => {
		setCardMonth(dateString)
	}
	const handleCardYear = (date, dateString) => {
		setCardYear(dateString)
	}
	const handleCardValue = (e) => {
		if (e.target.value.length > 0) {
			if (e.target.value.length % 4 == 0) {
				if(cardNo.length > e.target.value.length){
					setCardNo(e.target.value)
				}else{
					e.target.value += "  "
					setCardNo(e.target.value += "  ")
				}
			}
		}
		setCardNo(e.target.value)
	}

    const onSubmit = (data) => {
		if(!paidOfflineToggle){
			if(cardNo === '')
			{
				toast.error("Card No can not be blank.");
			}
			else if(data.cvv === '')
			{
				toast.error("CVV can not be blank.");
			}
			else if(cardMonth === 0 )
			{
				toast.error("Month can not be blank.")
			}
			else if(cardYear === 0 )
			{
				toast.error("Year can not be blank.")
			}
			else if(!validateCreditCardNumber(cardNo.replace(/ /g,'')))
			{
				toast.error("Please enter a valid card number.");
			}
			else if(data.cvv.length !== 3 || isNaN(data.cvv))
			{
				toast.error("Please enter a valid cvv.");
			}
			else{
				setShowLoader(true);
				const sendData = {
					payment_id: props.location.state.payment_id, // prefilled
					card_number: cardNo.replace(/ /g,''),
					card_exp_month: cardMonth,//two digit
					card_exp_year: cardYear,// fourDigit
					card_cvc: data.cvv,// three or four digit
					amount: parseFloat(props.location.state.driver_fee) // prefilled
				}
				getDriverPaymentDetails(sendData);
			}
		}else{
			const sendData ={
				payment_type:2,
				payment_id: props.location.state.payment_id,
			}
			setPayData(sendData);
			setConfirmationModal(!confirmationModal);
			// getPayhandler(sendData)
		}
	}
	
	const getDriverPaymentDetails = async (data) => {
		try {
			const res =  await fetchDriverPaymentDetails(token, data);
			if (res.status == 200) {
				
				let stripe = await loadStripe(res.paymentResponse.stripePublishableKey);
				stripe.confirmCardPayment(res.paymentResponse.stripePaymentIntent.client_secret, {
				payment_method: res.paymentResponse.stripePaymentMethod.id
				}).then(async function(result) {
					if (result.error) {
						toast.error(result.error.message);
						console.log(result.error.message);
						setShowLoader(false);
					} else {
					if (result.paymentIntent.status === 'succeeded') {
						// The payment is complete!
						const sendData ={
							payment_type:1,
							payment_id: res.paymentResponse.paymentId,
							payment_intent:result.paymentIntent,
						}
						console.log(sendData);
						getPayhandler(sendData)
					}
					}
				});
			}
		} catch (error) {
			setShowLoader(false);
			toast.error(error);
			console.log(error);
		}
	};

	  const getPayhandler = async (data) => {
		try {
			setShowLoader(true);
			const res = await handleDriverPaymentDetails(token,data);
			if (res.status == 200) {
				toast.success("Payment Success.");	
					setConfirmationModal(false);	
					history.push('/driverPayment')
					setShowLoader(false);
			}
		} catch (error) {
			setConfirmationModal(false);
			setShowLoader(false);
			console.log(error);			
			toast.error(error);
			
		}
	};

	const handlePaidOfflineMode=()=>{
		setPaidOfflineToggle(!paidOfflineToggle);
	}
	
    return (
        <>
			<div
				className='main-content pb-16 md:pb-5 flex-1 pt-20 px-2'
				style={{ overflowY: 'scroll', height: '100vh' }}>
				{showLoader? <Loader height="300px"/>:<>
				<div className='p-4 md:p-8 mt-6 lg:mt-0 rounded shadow bg-white w-3/4 mx-auto'>
					<div style={{display:"flex", justifyContent:"space-between"}}>
						<div>
							<h3 className='text-lg font-bold mb-4'>Make Your Payment to {props.location.state.restaurant_name}</h3>
						</div>						

						<div>
							<button
								style={{ height: '3rem' }}
								onClick={() => history.push('/driverPayment')}
								className='shadow bg-blue-500 ml-3 hover:bg-blue-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded'
								type='button'>
								Back
							</button>
						</div>
						
					</div>
                    

							<form
								id='myForm'
								autoComplete="off"
								onSubmit={handleSubmit(onSubmit)}
								className='w-full mt-50 max-w-full text-base text-gray-200'
								style={{
									marginTop: '40px',
								}}>
								<div className=' d-flex flex-column -mx-3 '>
									<div className='w-full flex px-3 mb-6 md:mb-0 d-inline-flex'>
										<label
											className='block w-1/2 tracking-wide text-gray-300 py-3 px-6 mb-3'
											for='restaurant_name'>
											Mark as paid offline:
										</label>
										<div style={{ padding: '6px', cursor: 'pointer',width:"50%" }}>
											{paidOfflineToggle? (
												<ToggleOnIcon
													onClick={() => handlePaidOfflineMode()}
													style={{ color: 'green', fontSize: '40' }}
												/>
											) : (
													<ToggleOffIcon
														onClick={() => handlePaidOfflineMode()}
														style={{ color: 'red', fontSize: '40' }}
													/>
											)}
										</div>
									</div>
									<div className='w-full flex px-3 mb-6 md:mb-0 d-inline-flex'>
										<label
											className='block w-1/2 tracking-wide text-gray-300 py-3 px-6 mb-3'
											for='restaurant_name'>
											Payment ID
										</label>
										<input
											className='appearance-none block w-1/2 bg-gray-100 border border-gray-200 rounded-half py-3 px-6 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-200'
											id='paymentId'
											type='text'
											disabled
                                            Value={props.location.state.payment_id} 
										/>
									</div>
									<div className='w-full flex px-3 mb-6 md:mb-0 d-inline-flex'>
										<label
											className='block w-1/2 tracking-wide text-gray-300 py-3 px-6 mb-3'
											for='restaurant_name'>
											Driver Fee
										</label>
										<input
											className='appearance-none block w-1/2 bg-gray-100 border border-gray-200 rounded-half py-3 px-6 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-200'
											id='paymentId'
											type='text'
											disabled
                                            Value={props.location.state.driver_fee} 
										/>
									</div>
									
								</div>

								<div style={{display:paidOfflineToggle?"none":""}} className=' d-flex flex-column -mx-3 '>
									<div className='w-full flex px-3 mb-6 md:mb-0'>
										<label
											className='block w-1/2 tracking-wide py-3 px-6 mb-3 text-gray-300'
											for='role'>
											Card No
										</label>
										<input
											className='appearance-none block w-1/2 bg-gray-100 border border-gray-200 rounded-half py-3 px-6 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-200'
											id='cardNo'
											type='text' 
											autoComplete='off'
											onChange={(e) => handleCardValue(e)}
											disabled={paidOfflineToggle}
										/>
									</div>

                                    <div className='w-full flex px-3 mb-6 md:mb-0'>
										<label
											className='block w-1/2 tracking-wide py-3 px-6 mb-3 text-gray-300'
											for='role'>
											CVV
										</label>
										<input
											className='appearance-none block w-1/2 bg-gray-100 border border-gray-200 rounded-half py-3 px-6 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-200'
											id='cvv'
											type='password'
                                            {...register("cvv")}
											disabled={paidOfflineToggle}
										/>
									</div>

									<div className='w-full flex px-3 mb-6 md:mb-0 d-inline-flex'>
										<label
											className='block w-1/2 tracking-wide text-gray-300 py-3 px-6 mb-3'
											for='restaurant_name'>
											Expiry
										</label>
										<div style={{ display: 'inline-flex' }}>
											<DatePicker 
												picker='month'
												format='MM'
												onChange={(date, dateString) => handleCardMonth(date, dateString)}
												className='appearance-none block w-1/2 bg-gray-100 border border-gray-200 rounded-half py-3 px-6 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-200'
												id='cardMonth'
												disabled={paidOfflineToggle}
											/>
											<DatePicker 
												picker='year'
												format='YYYY'
												id='cardYear'
												onChange={(date, dateString) => handleCardYear(date, dateString)}
												className='appearance-none block w-1/2 bg-gray-100 border border-gray-200 rounded-half py-3 px-6 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-200'
												disabled={paidOfflineToggle}
											/>
										</div>
									</div>

								</div>
								<div style={{ display: 'flex', justifyContent:"center", marginTop:"15px" }}>
									<button
										style={{ height: '3rem' }}
										className='shadow bg-blue-500 ml-3 hover:bg-blue-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded'
										type='submit'>
										Submit
									</button>
								</div>
								
						</form>
						{confirmationModal && <ConfirmationModal
								confirmationModal={confirmationModal}
								setConfirmationModal={setConfirmationModal}
								data={payData}
								handleConfirmation={getPayhandler}
							/>}
				</div></>}
			</div>
			
		</>
    )
}
