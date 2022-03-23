import React, {useEffect,  useState } from 'react';

import { getHotspot, editHotspot, addHotspot, listRestaurant,listDriver } from '../../../api';
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

import Loader from '../../../globalComponent/layout/loader';
import AddIcon from "@material-ui/icons/Add";
import ClearIcon from "@material-ui/icons/Clear";
const AddEditHotspot = () => {
	const history = useHistory();
	const params=useParams();

	const token = useSelector((state) => state.auth.isSignedIn);

	const [hotspot,setHotspot] = useState({
		name: null,
        location: null,
        location_detail: null,
        city: null,
        state: null,
        country: null,
        postal_code: null,
        dropoffs:[null],
        delivery_shifts:['12:00:00'],
        restaurant_ids: [],
        driver_ids:[],
	});

	let [restAvailableForShiftIndexList,setRestAvailableForShiftIndexList]=useState([
		{
			label:"12:00 PM",
			value:1,
			name:"Shift 1",
		}
	]);

	// let restAvailableForShiftIndexList=[
	// 	{
	// 		label:"Shift 1",
	// 		value:1,
	// 		name:"Shift 1",
	// 	},
	// 	{
	// 		label:"Shift 2",
	// 		value:2,
	// 		name:"Shift 2",
	// 	},
	// 	{
	// 		label:"Shift 3",
	// 		value:3,
	// 		name:"Shift 3",
	// 	}
	// ];

	useEffect(()=>{
		let updatedShifts=hotspot.delivery_shifts.filter(shift=>shift).map((shift,index)=>{
			return {
					label:moment(shift,"HH:mm:ss").format("h:mm A"),
					value:index+1,
					name:`Shift ${index+1}`,
			}
		})

		setRestAvailableForShiftIndexList([...updatedShifts])

	},[hotspot])
    
	let [error,setError]=useState(null);
	let [success,setSuccess]=useState(null);

	let [showLoader, setShowLoader] = useState(false);
	
    let [driverList,setDriverList]=useState([]);
    let [restaurantList,setRestaurantList]=useState([]);

	const customStyles = {
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


	const handleInputChange = (e) => {
		setError(null);
		let updatedDetails = { ...hotspot };
		updatedDetails[e.target.id] = e.target.value;
		setHotspot(updatedDetails);
	};

	useEffect(()=>{
		async function fetchData(){
			setShowLoader(true);
			setError(null);
			try {
				let data={
					query:{
						is_pagination:0,
					}
				}
	
				let res=await listRestaurant(token,data);
				setRestaurantList(res.restaurantList.rows.filter(restaurant=>restaurant.status===1).map((restaurant)=>{
					return {
						label:restaurant.restaurant_name,
						value:restaurant.id,
						name:restaurant.restaurant_name,
						id:restaurant.id,						
					}
				}));
				res=await listDriver(token,data);
				setDriverList(res.driverList.rows.filter(driver=>driver.status===1 && driver.approval_status===1).map((driver)=>{
					return {
						label:driver.name,
						value:driver.id,
						name:driver.name,
						first_name:driver.first_name,
						last_name:driver.last_name,
						id:driver.id,						
					}
				}));
				setShowLoader(false);
			} catch (error) {
				setShowLoader(false);
				setError(error);
			}

			if(params.id){
				setShowLoader(true);
				setError(null);
				try {
					let data={
						params:{
							hotspotLocationId:params.id
						}						
					}

					let res=await getHotspot(token,data);
					let {
						name,
                        location,
                        location_detail,
                        city,
                        state,
                        country,
                        postal_code,
                        dropoffs,
                        delivery_shifts,
					}=res.hotspotDetails;

					setHotspot({
                        ...hotspot,
						name,
                        location,
                        location_detail,
                        city,
                        state,
                        country,
                        postal_code,
                        dropoffs,
                        delivery_shifts,
						restaurant_ids:res.hotspotDetails.restaurants.map((restaurant)=>{
							return{
								restaurant_id:restaurant.restaurant.id,
								pickup_time:restaurant.pickup_time,
								available_for_shifts:restaurant.available_for_shifts
							}
						}),
						driver_ids:res.hotspotDetails.drivers.map(driver=>driver.id),
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

	let handleGoogleSearchChange=async(value)=>{
		setError(null);
		hotspot.location_detail=value;
		setHotspot({...hotspot});
	}

	let handleGoogleSuggestionSelect=async(selectedResult)=>{
		let selectedPlace=await geocodeByAddress(selectedResult)
		console.log("selectedPlace",selectedPlace)
		
		let selectedLocation=await getLatLng(selectedPlace[0])
		hotspot.location=[selectedLocation.lat,selectedLocation.lng]
		

		const findAddressType = (key) => {
		return selectedPlace[0].address_components.find(
			(val) => val.types[0] === key
		);
		};

		hotspot.location_detail = selectedPlace[0].formatted_address;

		const cityComponent =
			findAddressType("administrative_area_level_2") ||
			findAddressType("postal_town") ||
			findAddressType("locality");

	    hotspot.city = cityComponent ? cityComponent.long_name : null;
		hotspot.state = findAddressType("administrative_area_level_1")
			? findAddressType("administrative_area_level_1").long_name
			: null;

		hotspot.country = findAddressType("country")
			? findAddressType("country").long_name
			: null;

		hotspot.postal_code = findAddressType("postal_code")
			? findAddressType("postal_code").long_name
			: null;
  
		setHotspot({...hotspot});
	}

	const validateData=()=>{
		console.log("hotspot",hotspot)
		let result=true;
		if(!hotspot.name || hotspot.name?.trim()===""){
			setError("Name is required")
			result=false;
		}else if(!hotspot.location_detail || hotspot.location_detail?.trim()===""){
			setError("Address is required")
			result=false;
		}else if(
			!hotspot.location || hotspot.location?.length!==2 ||
			!hotspot.city || hotspot.city?.trim()==="" ||
			!hotspot.state || hotspot.state?.trim()==="" ||
			!hotspot.country|| hotspot.country?.trim()==="" ||
			!hotspot.postal_code || hotspot.postal_code?.trim()===""
		){
			setError("Something went wrong")
			result=false;
		}else{
			for(let dropoff of hotspot.dropoffs){
				if(!dropoff || dropoff.trim()===""){
					setError("Each dropoff field should have some value or remove that field")
					result=false;
					break;
				}
			}
	
			for(let delivery_shift of hotspot.delivery_shifts){
				if(!delivery_shift || !moment(delivery_shift,"HH:mm:ss").isValid()){
					setError("All 3 delivery shifts are required")
					result=false;
					break;
				}
			}
	
			let isSameRestaurant=true;
			let isEmptyRestaurant=true;
	
			if(hotspot.restaurant_ids.length>0){		
				hotspot.restaurant_ids.forEach((restaurant1,index1)=>{
					if(!restaurant1?.restaurant_id){
						isEmptyRestaurant=false;
					}else{
						hotspot.restaurant_ids.forEach((restaurant2,index2)=>{
							if(restaurant1?.restaurant_id==restaurant2?.restaurant_id && index1!=index2){
								isSameRestaurant=false;
							}
						})
					}				
				})
			}
	
			
	
			if(!isEmptyRestaurant){
				setError("Each restaurant field should have some value or remove that field")
				result=false;
			}
	
			if(!isSameRestaurant){
				setError("All restaurant restaurant selections should be unique")
				result=false;
			}
	
		}
		
		return result;
	}

	const handleSubmit=async(e)=>{
		e.preventDefault();
		setError(null);

		if(!validateData()) return;

		let data={
			body:{
				...hotspot,
			}						
		}

		if(params.id){
			setShowLoader(true);
			setError(null);
			try {
				data.body.hotspotLocationId=params.id;

				let res=await editHotspot(token,data);
				setSuccess(res.message)
				setShowLoader(false);
				setTimeout(()=>{
					history.push(`/hotspots/${params.id}`)
				},1000)
			} catch (error) {
				setShowLoader(false);
				setError(error);
			}							
		}else{
			setShowLoader(true);
			setError(null);
			try {
				let res=await addHotspot(token,data);
				setSuccess(res.message)
				setShowLoader(false);
				setTimeout(()=>{
					history.push(`/hotspots`)
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
					<h3 className='text-lg font-bold mb-4'>{history.location.pathname.search("editHotspot")==-1?"Add Hotspot":"Edit Hotspot"}</h3>

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
						hotspot && (
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
											for='name'>
											Name
										</label>
										<input
											className='appearance-none block w-1/2 bg-gray-100 border border-gray-200 rounded-half py-3 px-6 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-200'
											id='name'
											type='text'
											autoComplete="off"
											required
											onChange={handleInputChange}
											value={hotspot.name}
										/>
									</div>
									
									<div className='w-full flex px-3 mb-6 md:mb-0 d-inline-flex'>
										<label
											className='block w-1/2 tracking-wide text-gray-300 py-3 px-6 mb-3'
											for='address'>
											Address
										</label>

										<div className='block w-1/2 mb-5'>
											<PlacesAutocomplete
												value={hotspot.location_detail}
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
													<div className="autocomplete-dropdown-container w-full" style={{ display:suggestions?.length>0?"":"none", position:"absolute",maxHeight:"150px", overflow:"scroll", zIndex:"1000"}}>
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

									<div className='w-full flex px-3 mb-8 md:mb-0 d-inline-flex'>
										<label
											className='block w-1/2 tracking-wide text-gray-300 py-3 px-6 mb-3'
											for='dropoffs'>
											Restaurants
										</label>
                                        <div style={{width:"50%",display:"flex",justifyContent:"space-between",flexDirection:"column",alignItems:"start",marginBottom:"1rem",}}>
                                            {
                                                hotspot.restaurant_ids && hotspot.restaurant_ids.map((rest,index)=>{
                                                    return (
                                                        <div style={{width:"100%",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                                                            <div style={{width:"75%", marginTop:"1rem",display:"flex",justifyContent:"space-between",flexDirection:"column",alignItems:"start",border:"2px solid rgba(0,0,0,0.2)",padding:"5px",borderRadius:"5px"}}>
																<div style={{width:"100%", marginBottom:"1rem"}}>
																	<Select
																		styles={customStyles}
																		options={restaurantList}
																		placeholder="Select restaurant"
																		value={restaurantList.find(restaurant=>restaurant.id===rest.restaurant_id)}
																		onChange={(selectedRestaurant)=>{
																			setError(null);
																			hotspot.restaurant_ids[index].restaurant_id=selectedRestaurant.id;
																			setHotspot({...hotspot})
																		}}
																		inputId={`restaurant${index}`}
																		required
																	/>
																</div>
																<div style={{width:"100%"}}>
																	<input
																		className='appearance-none block bg-gray-100 border border-gray-200 rounded-half py-3 px-6 leading-tight focus:outline-none focus:bg-white focus:border-gray-200'
																		style={{width:"100%"}}
																		id={`dropoff${index}`}
																		autoComplete="off"
																		type='number'
																		min="1"
																		required
																		placeholder="Pickup time in minutes"
																		onChange={(e)=>{
																			setError(null);
																			hotspot.restaurant_ids[index].pickup_time=parseInt(e.target.value);
																			setHotspot({...hotspot})
																		}}
																		value={hotspot.restaurant_ids[index].pickup_time}
																	/>
																</div>
																<div style={{width:"100%",fontSize:"0.9rem", textAlign:"end"}}>in minutes</div>
																<div style={{width:"100%"}}>
																	<Select
																		menuPlacement="top"									
																		isMulti={true}
																		styles={customStyles}
																		options={restAvailableForShiftIndexList}
																		placeholder="Select slots"
																		value={restAvailableForShiftIndexList.filter(ele=>rest.available_for_shifts?.includes(ele.value))}
																		onChange={(selectedIndexes)=>{
																			setError(null);
																			hotspot.restaurant_ids[index].available_for_shifts=selectedIndexes?selectedIndexes.map(ele=>ele.value).sort():[1];
																			setHotspot({...hotspot})
																			console.log(selectedIndexes);
																		}}
																		inputId="restAvailableForShiftIndexes"
																		required
																	/>
																</div>

                                                            </div>
                                                            <div style={{width:"25%",marginBottom:"1rem",marginLeft:"1rem"}}>
                                                                <ClearIcon
                                                                    onClick={()=>{
                                                                        hotspot.restaurant_ids.splice(index,1);
                                                                        setHotspot({...hotspot})
                                                                    }}
                                                                />
                                                            </div>
                                                            
                                                        </div>
                                                    )
                                                })
                                            }
                                            <div style={{width:"25%",marginBottom:"1rem",}}>
                                                <AddIcon
                                                    onClick={()=>{
                                                        if(!hotspot.restaurant_ids) hotspot.restaurant_ids=[];
                                                        hotspot.restaurant_ids.push({
															restaurant_id:null,
															pickup_time:null,
															available_for_shifts:[1]
														});
														setHotspot({...hotspot})
                                                    }}
                                                />
                                            </div>
                                        </div>
										
									</div>

                                    <div className='w-full flex px-3 mb-6 md:mb-0 d-inline-flex'>
										<label
											className='block w-1/2 tracking-wide text-gray-300 py-3 px-6 mb-3'
											for='dropoffs'>
											Dropoffs
										</label>
                                        <div style={{width:"50%",display:"flex",justifyContent:"space-between",flexDirection:"column",alignItems:"start",marginBottom:"1rem",}}>
                                            {
                                                hotspot.dropoffs && hotspot.dropoffs.map((dropoff,index)=>{
                                                    return (
                                                        <div style={{width:"100%",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                                                            <div style={{width:"75%"}}>
                                                                <input
                                                                    className='appearance-none block bg-gray-100 border border-gray-200 rounded-half py-3 px-6 leading-tight focus:outline-none focus:bg-white focus:border-gray-200'
                                                                    style={{width:"100%"}}
                                                                    id={`dropoff${index}`}
                                                                    type='text'
																	autoComplete="off"
                                                                    required
                                                                    onChange={(e)=>{
																		setError(null);
                                                                        hotspot.dropoffs[index]=e.target.value;
                                                                        setHotspot({...hotspot});
                                                                    }}
                                                                    value={dropoff}
                                                                />
                                                            </div>
                                                            <div style={{width:"25%",marginBottom:"1rem",marginLeft:"1rem",display:hotspot.dropoffs?.length>1?"":"none"}}>
                                                                <ClearIcon
                                                                    onClick={()=>{
                                                                        hotspot.dropoffs.splice(index,1);
                                                                        setHotspot({...hotspot});
                                                                    }}
                                                                />
                                                            </div>
                                                            
                                                        </div>
                                                    )
                                                })
                                            }
                                            <div style={{width:"25%"}}>
                                                <AddIcon
                                                    onClick={()=>{
                                                        if(!hotspot.dropoffs) hotspot.dropoffs=[];
                                                        hotspot.dropoffs.push("");
                                                        setHotspot({...hotspot});
                                                    }}
                                                />
                                            </div>
                                        </div>
										
									</div>

                                    <div className='w-full flex px-3 mb-6 md:mb-0 d-inline-flex'>
										<label
											className='block w-1/2 tracking-wide text-gray-300 py-3 px-6 mb-3'
											for='dropoffs'>
											Delivery Shifts
										</label>
                                        <div style={{width:"50%",display:"flex",justifyContent:"space-between",flexDirection:"column",alignItems:"start",marginBottom:"1rem",}}>
                                            {
                                                hotspot.delivery_shifts && hotspot.delivery_shifts.map((delivery_shift,index)=>{
                                                    return (
                                                        <div style={{width:"100%",display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"1rem"}}>
                                                            <div style={{width:"75%"}}>
                                                            <CustomTimePicker
                                                                use12Hours
                                                                format='h:mm A'
                                                                value={
                                                                    delivery_shift &&
                                                                    moment(delivery_shift, 'HH:mm:ss')
                                                                }
                                                                onChange={(val) => {	
																	setError(null);		
                                                                    if (val == null) {
                                                                        hotspot.delivery_shifts[index] = '';
                                                                    } else {
                                                                        hotspot.delivery_shifts[index] =
                                                                            moment(val).format('HH:mm:ss');
                                                                    }
                                                                    setHotspot({...hotspot})
                                                                    
                                                                }}
                                                                style={{width:"100%"}}
                                                                className='appearance-none block bg-gray-100 border border-gray-200 rounded-half py-3 px-6 leading-tight focus:outline-none focus:bg-white focus:border-gray-200'
                                                                id={`delivery_shift${index}`}
                                                                required
                                                            />
                                                            </div>
                                                            <div style={{width:"25%",marginBottom:"1rem",marginLeft:"1rem",display:hotspot.delivery_shifts?.length<2?"none":""}}>
                                                                <ClearIcon
                                                                    onClick={()=>{
                                                                        hotspot.delivery_shifts.splice(index,1);
																		let currentSlots=[...hotspot.delivery_shifts].sort();
																		hotspot.delivery_shifts=[...currentSlots];
                                                                        setHotspot({...hotspot});
                                                                    }}
                                                                />
                                                            </div>
                                                            
                                                        </div>
                                                    )
                                                })
                                            }
                                            <div style={{width:"25%",}}>
                                                <AddIcon
                                                    onClick={()=>{
                                                        if(!hotspot.delivery_shifts) hotspot.delivery_shifts=[];
														let currentSlots=[...hotspot.delivery_shifts].sort();
														hotspot.delivery_shifts=[...currentSlots,null];
                                                        // hotspot.delivery_shifts.push(null);													
                                                        setHotspot({...hotspot});
                                                    }}
                                                />
                                            </div>
                                        </div>
										
									</div>
																	

									<div className='w-full flex px-3 mb-6 md:mb-0 d-inline-flex'>
										<label
											className='block w-1/2 tracking-wide text-gray-300 py-3 px-6 mb-3'
											for='drivers'>
											Drivers
										</label>
										<div style={{ width: '50%' }}>
											<Select
												menuPlacement="top"
												isMulti={true}
												styles={customStyles}
												options={driverList}
												placeholder="Select Driver"
												value={driverList.filter(driver=>hotspot.driver_ids?.includes(driver.value))}
												onChange={(selectedDrivers)=>{
													setError(null);
													if(selectedDrivers){
														if(Array.isArray(selectedDrivers)){
															hotspot.driver_ids=selectedDrivers.map(driver=>driver.id)
															setHotspot({...hotspot})
														}else{
															hotspot.driver_ids=[selectedDrivers.id];
															setHotspot({...hotspot})
														}
													}else{
														hotspot.driver_ids=[]
														setHotspot({...hotspot})
													}
												}}
												inputId="drivers"
												required
											/>
										</div>
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

export default AddEditHotspot;
