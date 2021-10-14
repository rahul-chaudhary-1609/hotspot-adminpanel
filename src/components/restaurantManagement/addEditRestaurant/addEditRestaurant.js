import React, {useEffect,  useState } from 'react';

import { getRestaurant, editRestaurant, addRestaurant, uploadFile } from '../../../api';
import { useHistory, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Select from 'react-select';
import CustomTimePicker from '../../../globalComponent/layout/timePicker';
import moment from 'moment';
import PlacesAutocomplete, {
	geocodeByAddress,
	geocodeByPlaceId,
	getLatLng,
  } from 'react-places-autocomplete';

import Description from '@material-ui/icons/Description';
import CircularProgress from '@material-ui/core/CircularProgress';
import Loader from '../../../globalComponent/layout/loader';

const AddEditRestaurant = () => {
	const history = useHistory();
	const params=useParams();

	const token = useSelector((state) => state.auth.isSignedIn);

	const [restaurant,setRestaurant] = useState({
		address: null,
		// agreement_doc_url: null,
		agreement_documents: null,
		cut_off_time: null,
		deliveries_per_shift: null,
		location: null,
		order_type: null,
		owner_email: null,
		owner_name:null,
		owner_phone: null,
		restaurant_image_url: null,
		restaurant_name: null,
		role: null,
		stripe_publishable_key: null,
		stripe_secret_key: null,
		working_hours_from: null,
		working_hours_to: null,
	});

	let [error,setError]=useState(null);
	let [success,setSuccess]=useState(null);

	let [showLoader, setShowLoader] = useState(false);
	let [showImageLoader, setShowImageLoader] = useState(false);
	//let [address,setAddress]=useState('');

	let orderTypeOptions=[
		{
			label:"Hotspot Delivery",
			value:1,
		},
		{
			label:"Pickup",
			value:2,
		},
		{
			label:"Both Delivery and Pickup",
			value:3,
		}
	]

	const customStyles = {
		control: (provided, state) => ({
			...provided,
			width: '100%',
			backgroundColor: '#fafafa',
			borderColor: 'grey',height:"100%",
			minHeight:"50px",marginBottom:"12px",
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


	const handleInputChange = (e) => {
		console.log("restaurant",restaurant)
		setError(null);
		let updatedDetails = { ...restaurant };
		updatedDetails[e.target.id] = e.target.value;
		setRestaurant(updatedDetails);
	};

	useEffect(()=>{
		async function fetchData(){
			if(params.restaurantId){
				setShowLoader(true);
				setError(null);
				try {
					let data={
						params:{
							restaurantId:params.restaurantId
						}						
					}

					let res=await getRestaurant(token,data);
					let {
						address,
						// agreement_doc_url,
						agreement_documents,
						cut_off_time,
						deliveries_per_shift,
						location,
						order_type,
						owner_email,
						owner_name,
						owner_phone,
						restaurant_image_url,
						restaurant_name,
						role,
						stripe_publishable_key,
						stripe_secret_key,
						working_hours_from,
						working_hours_to,
					}=res.restaurant;
					setRestaurant({
						address,
						// agreement_doc_url,
						agreement_documents,
						cut_off_time,
						deliveries_per_shift,
						location,
						order_type,
						owner_email,
						owner_name,
						owner_phone,
						restaurant_image_url,
						restaurant_name,
						role,
						stripe_publishable_key,
						stripe_secret_key,
						working_hours_from,
						working_hours_to,
					})
					setShowLoader(false);
				} catch (error) {
					setShowLoader(false);
					setError(error);
				}							
			}
		}
		fetchData();
	},[])

	const normalizeInput = (value) => {
		if (!value) return '';
		let currentValue = value.replace(/[^\d]/g, '');

		let cvLength = currentValue.length;
		if(cvLength>10){
			currentValue=currentValue.slice(0,10);
		}
		if (cvLength < 4) return currentValue;
		if (cvLength < 7)
			return `(${currentValue.slice(0, 3)}) ${currentValue.slice(3)}`;

		return `(${currentValue.slice(0, 3)}) ${currentValue.slice(
			3,
			6
		)}-${currentValue.slice(6, 10)}`;
	};

	const handleImageChange=async(e)=>{
		setError(null);
		setShowImageLoader(true)
		if(e.target.files[0].type.search("image/")!==-1){
			if(!(e.target.files[0].size>5242880)){
				try {
					let formData=new FormData();
					formData.append("file",e.target.files[0])
					formData.append("mimeType",e.target.files[0].type)
					formData.append("folderName","restaurant")

					let data={
						form:formData
					}
					let res=await uploadFile(token,data);
					setRestaurant({
						...restaurant,
						restaurant_image_url:res.image_url
					});
					setShowImageLoader(false);
				} catch (error) {
					setShowImageLoader(false);
					setError(error)
				}			

			}else{
				setShowImageLoader(false);
				setError("Image file size should not exceed 5 MB")
			}
		}else{
			setShowImageLoader(false);
			setError("Only Image file is allowed")
		}
	}

	const handleDocumentChange=async(e)=>{
		setError(null);
		setShowImageLoader(true)
		if(!(e.target.files[0].size>5242880)){
			try {
				
				let formData=new FormData();
				formData.append("file",e.target.files[0])
				formData.append("mimeType",e.target.files[0].type)
				formData.append("folderName","agreement_doc")
				let fileName=e.target.files[0].name;

				let data={
					form:formData
				}
				let res=await uploadFile(token,data);
				
				setRestaurant({
					...restaurant,
					// agreement_doc_url:res.image_url,
					agreement_documents:[{
						name:fileName,
						url:res.image_url,
					}],
				});
				setShowImageLoader(false);
			} catch (error) {
				setShowImageLoader(false);
				setError(error)
			}			

		}else{
			setShowImageLoader(false);
			setError("Image file size should not exceed 5 MB")
		}
	}
	

	let handleGoogleSearchChange=async(value)=>{
		setError(null);
		restaurant.address=value;
		setRestaurant({...restaurant});
	}

	let handleGoogleSuggestionSelect=async(selectedResult)=>{
		let selectedPlace=await geocodeByAddress(selectedResult)
		restaurant.address=selectedResult;
		setRestaurant({...restaurant});
		let selectedLocation=await getLatLng(selectedPlace[0])
		restaurant.address=selectedResult;
		restaurant.location=[selectedLocation.lat,selectedLocation.lng]
		setRestaurant({...restaurant});
	}

	let validateData=()=>{
		let result=true;

		Object.keys(restaurant).forEach((key)=>{
			if(!['location','cut_off_time','deliveries_per_shift','order_type'].includes(key)){
				if(key=="agreement_documents"){
					if(!restaurant[key] || restaurant[key].length<=0){
						restaurant[key]=null;
					}
				}else{
					restaurant[key]=restaurant[key] && restaurant[key].trim();
					if(!restaurant[key] || restaurant[key]==""){
						restaurant[key]=null;
					}
				}				
			}
		})

		setRestaurant({...restaurant});


		if(!restaurant.restaurant_name || restaurant.restaurant_name.trim()==""){
			setError("Restaurant name is required")
			result=false;
		}else if(!restaurant.address || restaurant.address.trim()==""){
			setError("Address is required")
			result=false;
		}else if(!restaurant.cut_off_time){
			setError("Cut Off Time is required")
			result=false;
		}else if(!restaurant.deliveries_per_shift){
			setError("Deliveries per shift is required")
			result=false;
		}else if(!restaurant.owner_name || restaurant.owner_name.trim()==""){
			setError("Owner name is required")
			result=false;
		}else if(!restaurant.owner_email || restaurant.owner_email.trim()==""){
			setError("Owner email is required")
			result=false;
		}else if(!restaurant.owner_phone || restaurant.owner_phone.trim()==""){
			setError("Owner phone is required")
			result=false;
		}else if(!restaurant.order_type){
			setError("Order type is required")
			result=false;
		}else if(
			!restaurant.working_hours_from || !moment(restaurant.working_hours_from,"HH:mm:ss").isValid() ||
			!restaurant.working_hours_to || !moment(restaurant.working_hours_to,"HH:mm:ss").isValid()
			){
			setError("Working hours 'start' and 'to' values are required")
			result=false;
		}else if(!restaurant.location || restaurant.location?.length!==2){
			setError("Something went wrong")
			result=false;
		}

		return result;
	}

	const handleSubmit=async(e)=>{
		e.preventDefault();

		if(!validateData()) return;		

		if(params.restaurantId){
			setShowLoader(true);
			setError(null);
			try {
				let data={
					body:{
						restaurantId:params.restaurantId,
						...restaurant,
					}						
				}

				let res=await editRestaurant(token,data);
				setSuccess(res.message)
				setShowLoader(false);
				setTimeout(()=>{
					history.push(`/restaurant`)
				},1000)
			} catch (error) {
				setShowLoader(false);
				setError(error);
			}							
		}else{
			setShowLoader(true);
			setError(null);
			try {
				let data={
					body:{
						...restaurant,
					}						
				}

				let res=await addRestaurant(token,data);
				setSuccess(res.message)
				setShowLoader(false);
				setTimeout(()=>{
					history.push(`/restaurant/${res.restaurant_id}/addMenuCategory`)
				},1000)
			} catch (error) {
				setShowLoader(false);
				setError(error);
			}	
		}
	}
	

	return (
		<>
			<div
				className='main-content pb-16 md:pb-5 flex-1 pt-20 px-2'
				style={{ overflowY: 'scroll', height: '100vh' }}>
				<div className='p-4 md:p-8 mt-6 lg:mt-0 rounded shadow bg-white w-3/4 mx-auto'>
					<h3 className='text-lg font-bold mb-4'>{history.location.pathname.search("editRestaurant")==-1?"Add Restaurant":"Edit Restaurant"}</h3>

					<button
						style={{ height: '3rem' }}
						onClick={() => history.goBack()}
						className='shadow bg-blue-500 ml-3 hover:bg-blue-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded'
						type='button'>
						Back
					</button>
					
					<button
						style={{ height: '3rem' }}
						form='myForm'
						type='submit'
						className='shadow bg-red-500 ml-3 hover:bg-red-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded'>
						Save
					</button>
					

					<br />

					{error && (
						<p
							style={{
								color: 'red',
								fontSize: '20px',
								textAlign: 'center',
								width: '100%',
								marginTop: '12px',
							}}>
							{error}
						</p>
					)}
					{success && (
						<div
							style={{
								backgroundColor: '#9ACD32',
								padding: '10px',
								marginLeft: 'auto',
								marginRight: 'auto',
								marginTop: '24px',
								width: 'fit-content',
							}}>
							{success}
						</div>
					)}
					{showLoader ? (
						<Loader />
					) : (
						restaurant && (
							<form
								id='myForm'
								onSubmit={handleSubmit}
								className='w-full mt-50 max-w-full text-base text-gray-200'
								style={{
									marginTop: '40px',
								}}>
								<div className=' d-flex flex-column -mx-3 '>
									<div className='w-full flex px-3 mb-6 md:mb-0 d-inline-flex'>
										<label
											className='block w-1/2 tracking-wide text-gray-300 py-3 px-6 mb-3'
											for='restaurant_name'>
											Restaurant Name
										</label>
										<input
											className='appearance-none block w-1/2 bg-gray-100 border border-gray-200 rounded-half py-3 px-6 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-200'
											id='restaurant_name'
											type='text'
											required
											onChange={handleInputChange}
											value={restaurant.restaurant_name}
										/>
									</div>
									<div className='w-full flex px-3 mb-6 md:mb-0 d-inline-flex'>
										<label
											className='block w-1/2 tracking-wide text-gray-300 py-3 px-6 mb-3'
											for='owner_name'>
											Owner Name
										</label>
										<input
											className='appearance-none block w-1/2 bg-gray-100 border border-gray-200 rounded-half py-3 px-6 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-200'
											id='owner_name'
											type='text'
											required
											onChange={handleInputChange}
											value={restaurant.owner_name}
										/>
									</div>
									<div className='w-full flex px-3 mb-6 md:mb-0 d-inline-flex'>
										<label
											className='block w-1/2 tracking-wide text-gray-300 py-3 px-6 mb-3'
											for='role'>
											Owner Role
										</label>
										<input
											className='appearance-none block w-1/2 bg-gray-100 border border-gray-200 rounded-half py-3 px-6 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-200'
											id='role'
											type='text'
											onChange={handleInputChange}
											value={restaurant.role}
										/>
									</div>
									<div className='w-full flex px-3 mb-6 md:mb-0 d-inline-flex'>
										<label
											className='block w-1/2 tracking-wide text-gray-300 py-3 px-6 mb-3'
											for='owner_email'>
											Owner Email
										</label>
										<input
											className='appearance-none block w-1/2 bg-gray-100 border border-gray-200 rounded-half py-3 px-6 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-200'
											id='owner_email'
											type='text'
											required
											onChange={handleInputChange}
											value={restaurant.owner_email}
										/>
									</div>
									<div className='w-full flex px-3 mb-6 md:mb-0 d-inline-flex'>
										<label
											className='block w-1/2 tracking-wide text-gray-300 py-3 px-6 mb-3'
											for='owner_phone'>
											Owner Phone
										</label>
										<input
											className='appearance-none block w-1/2 bg-gray-100 border border-gray-200 rounded-half py-3 px-6 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-200'
											id='owner_phone'
											type='text'
											required
											onChange={(e)=>{
												setError(null);
												restaurant.owner_phone=e.target.value.replace(/[^\d]/g, '').slice(0,10)
												setRestaurant({...restaurant})
											}}
											value={restaurant.owner_phone && normalizeInput(restaurant.owner_phone)}
										/>
									</div>
									<div className='w-full flex px-3 mb-6 md:mb-0 d-inline-flex'>
										<label
											className='block w-1/2 tracking-wide text-gray-300 py-3 px-6 mb-3'
											for='address'>
											Restaurant Address
										</label>

										<div className='block w-1/2 mb-3'>
											<PlacesAutocomplete
												value={restaurant.address}
												onChange={handleGoogleSearchChange}
												onSelect={handleGoogleSuggestionSelect}
											>
												{({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
												<div style={{position:"relative"}}>
													<textarea
													{...getInputProps({
														placeholder: 'Search Places ...',
														className: 'location-search-input appearance-none block w-full bg-gray-100 border border-gray-200 rounded-half py-3 px-6 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-200',
													})}
													rows="3"
													required
													/>
													<div className="autocomplete-dropdown-container w-full" style={{ display:suggestions.length>0?"":"none", position:"absolute",maxHeight:"150px", overflow:"scroll"}}>
													{loading && <div>Loading...</div>}
													{suggestions.map(suggestion => {
														const className = suggestion.active
														? 'suggestion-item--active'
														: 'suggestion-item';
														// inline style for demonstration purpose
														const style = suggestion.active
														? { backgroundColor: '#f56565', color:"black", cursor: 'pointer' }
														: { backgroundColor: '#ffffff', cursor: 'pointer' };
														
														return (
														<div
															{...getSuggestionItemProps(suggestion, {
															className,
															style,															
															})}
														>
															<span>{suggestion.description}</span>
														</div>
														);
													})}
													</div>
												</div>
												)}
											</PlacesAutocomplete>
										</div>

									</div>
									<div className='w-full flex px-3 mb-6 md:mb-0 d-inline-flex'>
										<label
											className='block w-1/2 tracking-wide text-gray-300 py-3 px-6 mb-3'
											for='restaurant_image'>
											Restaurant Image
										</label>
										{
											showImageLoader?
											(
												<label
													className='block w-1/2 tracking-wide  mb-3 text-gray-300 h-50  w-1/2'
													for='upload_image'>
													<div
														style={{
															display:"flex",
															minHeight: '200px',
															minWidth: '100%',
															backgroundColor: 'lightgray',
															textAlign: 'center',
															lineHeight: '190px',
															alignItems:"center",
															justifyContent:"center"
														}}>
														{' '}
														<CircularProgress />
													</div>
												</label>
											):(
												<label 
													className='block w-1/2 tracking-wide  mb-3 text-gray-300 h-50'
													for="upload_image">
													{
														restaurant.restaurant_image_url?
														(<img													
															style={{
																minHeight: '200px',
																minWidth: '100%',
																backgroundColor: 'lightgray',
																textAlign: 'center',
																lineHeight: '190px',
																cursor:"pointer",
															}}
															src={restaurant.restaurant_image_url}
															alt="Restaurant"
															
														/>):
														(
															<div 		
																style={{
																		minHeight: '200px',
																		minWidth: '100%',
																		backgroundColor: 'lightgray',
																		textAlign: 'center',
																		lineHeight: '190px',
																		cursor:"pointer",
																	}}>
																Upload Restaurant Image
															</div>
														)
													}
												</label>
											)
										}
										<input
											style={{display:"none"}}
											className='appearance-none block w-1/2 bg-gray-100 border border-gray-200 rounded-half py-3 px-6 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-200'
											id='upload_image'
											type='file'
											onChange={handleImageChange}
											value={restaurant.restaurant_image }
										/>
									</div>									

									<div className='w-full flex px-3 mb-6 md:mb-0 d-inline-flex'>
										<label
											className='block w-1/2 tracking-wide text-gray-300 py-3 px-6 mb-3'
											for='deliveries_per_shift'>
											Deliveries Per Shift
										</label>
										<input
											className='appearance-none block w-1/2 bg-gray-100 border border-gray-200 rounded-half py-3 px-6 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-200'
											id='deliveries_per_shift'
											type='number'
											min="1"
											required
											onChange={handleInputChange}
											value={restaurant.deliveries_per_shift}
										/>
									</div>

									<div className='w-full flex px-3 mb-6 md:mb-0 d-inline-flex'>
										<label
											className='block w-1/2 tracking-wide text-gray-300 py-3 px-6 mb-3'
											for='cut_off_time'>
											Cut Off Time
										</label>
										<div className='block w-1/2 flex d-inline-flex mb-3' >
											<input
												className='appearance-none block w-1/4 bg-gray-100 border border-gray-200 rounded-half py-3 px-6 leading-tight focus:outline-none focus:bg-white focus:border-gray-200'
												id='cut_off_time'
												type='number'
												min="1"
												required
												onChange={handleInputChange}
												value={restaurant.cut_off_time}
											/>
											<label
												className='block tracking-wide text-gray-300 py-3 px-6'>
												minutes before shift ending
											</label>
										</div>
									</div>
									<div className='w-full flex px-3 mb-6 md:mb-0 d-inline-flex'>
										<label
											className='block w-1/2 tracking-wide text-gray-300 py-3 px-6 mb-3'
											for='order_type'>
											Available Order Type
										</label>
										<div style={{ width: '50%' }}>
											<Select
												styles={customStyles}
												options={orderTypeOptions}
												placeholder="Select order type"
												value={orderTypeOptions.find(type=>type.value==restaurant.order_type)}
												onChange={(selectedOrderType)=>{
													setError(null);
													setRestaurant({
														...restaurant,
														order_type:parseInt(selectedOrderType.value)
													})
												}}
												inputId="order_type"
												required
											/>
										</div>
									</div>
									<div className='w-full flex px-3 mb-6 md:mb-0 d-inline-flex'>		
										<label
											className='block w-1/2 tracking-wide text-gray-300 py-3 px-6 mb-3'
											for='working_hours'>
											Working Hours
										</label>
										<div className='block w-1/2 flex d-inline-flex mb-3'>
											<div className='flex d-inline-flex'>
												<label
													className='block w-1/2 tracking-wide text-gray-300 py-3'
													for='working_hours_from'>
													From:
												</label>
												<CustomTimePicker
													use12Hours
													format='h:mm A'
													value={
														restaurant.working_hours_from &&
														moment(restaurant.working_hours_from, 'HH:mm:ss')
													}
													onChange={(val) => {
														setError(null);			
														if (val == null) {
															restaurant.working_hours_from = '';
														} else {
															restaurant.working_hours_from =
																moment(val).format('HH:mm:ss');
														}
														setRestaurant({...restaurant})
														
													}}
													className='appearance-none block bg-gray-100 border border-gray-200 rounded-half py-3 px-6 leading-tight focus:outline-none focus:bg-white focus:border-gray-200'
													id='working_hours_from'
													required
												/>
											</div>
											<div className='flex d-inline-flex'>
												<label
													className='block w-1/2 tracking-wide text-gray-300 py-3 px-6'
													for='working_hours_to'>
													To:
												</label>
												<CustomTimePicker
													use12Hours
													format='h:mm A'
													value={
														restaurant.working_hours_to &&
														moment(restaurant.working_hours_to, 'HH:mm:ss')
													}
													onChange={(val) => {	
														setError(null);		
														if (val == null) {
															restaurant.working_hours_to = '';
														} else {
															restaurant.working_hours_to =
																moment(val).format('HH:mm:ss');
														}
														setRestaurant({...restaurant})
													}}
													className='appearance-none block bg-gray-100 border border-gray-200 rounded-half py-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-200'
													id='working_hours_to'
													required
												/>
											</div>
										</div>
										
									</div>

									<div className='w-full flex px-3 mb-6 md:mb-0 d-inline-flex'>
										<label
											className='block w-1/2 tracking-wide text-gray-300 py-3 px-6 mb-3'
											for='stripe_publishable_key'>
											Stripe Publishable Key
										</label>
										<textarea
											className='appearance-none block w-1/2 bg-gray-100 border border-gray-200 rounded-half py-3 px-6 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-200'
											id='stripe_publishable_key'
											type='text'
											rows="5"
											onChange={handleInputChange}
											value={restaurant.stripe_publishable_key}
										/>
									</div>
									<div className='w-full flex px-3 mb-6 md:mb-0 d-inline-flex'>
										<label
											className='block w-1/2 tracking-wide text-gray-300 py-3 px-6 mb-3'
											for='stripe_secret_key'>
											Stripe Secret Key
										</label>
										<textarea
											className='appearance-none block w-1/2 bg-gray-100 border border-gray-200 rounded-half py-3 px-6 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-200'
											id='stripe_secret_key'
											type='text'
											rows="5"
											onChange={handleInputChange}
											value={restaurant.stripe_secret_key}
										/>
									</div>

									{/* <div className='w-full flex px-3 mb-6 md:mb-0 d-inline-flex'>
										<label
											className='block w-1/2 tracking-wide text-gray-300 py-3 px-6 mb-3'
											>
											Agreement Document
										</label>
										{
											restaurant.agreement_doc_url?
											(
												<div style={{textAlign:"center",display:"flex", justifyContent:"space-between",width:"50%", alignItems:"center"}}>	
													<div  style={{textAlign:"center",display:"flex", justifyContent:"center", width:"50%"}}>										
														<button
															onClick={(e) => {e.stopPropagation(); window.open(restaurant.agreement_doc_url,'_blank')}}
															style={{cursor:"pointer"}}
														>
														<Description style={{ color: '#667eea',fontSize:"3rem" }} />
														</button>
													</div>
													<div  style={{display:"flex", justifyContent:"flex-end", width:"50%"}}>
														<label
															style={{backgroundColor:"#667eea",color:"#fff",fontWeight:"600",textAlign:"center",borderRadius:"5px",width:"100%",height:"75%",cursor:"pointer"}}
															className="h-50 py-3 px-3"
															for='upload_doc'>
															{ showImageLoader?<CircularProgress />: "Upload Doc"}
														</label>
														<input
															style={{display:"none"}}
															id='upload_doc'
															type='file'
															onChange={handleDocumentChange}
														/>
													</div>
												</div>
											):
											(
												<div style={{textAlign:"center",display:"flex", justifyContent:"space-between",width:"50%", alignItems:"center"}}>	
													
													<div  style={{display:"flex", justifyContent:"flex-end", width:"100%"}}>
														<label
															style={{backgroundColor:"#667eea",color:"#fff",fontWeight:"600",textAlign:"center",borderRadius:"5px",width:"100%",height:"75%",cursor:"pointer"}}
															className="h-50 py-3 px-3"
															for='upload_doc'>
															{ showImageLoader?(<CircularProgress size={20} sx={{color:"#fff"}} />): "Upload Doc"}
														</label>
														<input
															style={{display:"none"}}
															id='upload_doc'
															type='file'
															onChange={handleDocumentChange}
														/>
													</div>
												</div>
											)
										}
										
									</div> */}

									<div className='w-full flex px-3 mb-6 md:mb-0 d-inline-flex'>
										<label
											className='block w-1/2 tracking-wide text-gray-300 py-3 px-6 mb-3'
											>
											Agreement Document
										</label>
										{
											restaurant.agreement_documents?
											(
												<div style={{textAlign:"center",display:"flex", justifyContent:"space-between",width:"50%", alignItems:"center",flexDirection:"column"}}>	
													<div style={{textAlign:"center",display:"flex", justifyContent:"space-between",width:"100%", alignItems:"center",}}>	
														<div  style={{textAlign:"center",display:"flex", justifyContent:"center", width:"50%"}}>										
															
															<button
																onClick={(e) => {e.stopPropagation(); window.open(restaurant.agreement_documents[0].url,'_blank')}}
																style={{cursor:"pointer"}}
															>
															<Description style={{ color: '#667eea',fontSize:"3rem" }} />
															</button>
															
														</div>
														<div  style={{display:"flex", justifyContent:"flex-end", width:"50%"}}>
															<label
																style={{backgroundColor:"#667eea",color:"#fff",fontWeight:"600",textAlign:"center",borderRadius:"5px",width:"100%",height:"75%",cursor:"pointer"}}
																className="h-50 py-3 px-3"
																for='upload_doc'>
																{ showImageLoader?<CircularProgress />: "Upload Doc"}
															</label>
															<input
																style={{display:"none"}}
																id='upload_doc'
																type='file'
																onChange={handleDocumentChange}
															/>
														</div>
														
													</div>
													<div style={{display:"flex", justifyContent:"center",width:"100%", alignItems:"center"}}>
															<a href={restaurant.agreement_documents[0].url} target="_blank">{restaurant.agreement_documents[0].name}</a>
													</div>
												</div>
											):
											(
												<div style={{textAlign:"center",display:"flex", justifyContent:"space-between",width:"50%", alignItems:"center"}}>	
													
													<div  style={{display:"flex", justifyContent:"flex-end", width:"100%"}}>
														<label
															style={{backgroundColor:"#667eea",color:"#fff",fontWeight:"600",textAlign:"center",borderRadius:"5px",width:"100%",height:"75%",cursor:"pointer"}}
															className="h-50 py-3 px-3"
															for='upload_doc'>
															{ showImageLoader?(<CircularProgress size={20} sx={{color:"#fff"}} />): "Upload Doc"}
														</label>
														<input
															style={{display:"none"}}
															id='upload_doc'
															type='file'
															onChange={handleDocumentChange}
														/>
													</div>
												</div>
											)
										}
										
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

export default AddEditRestaurant;
