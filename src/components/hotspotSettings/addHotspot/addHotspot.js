import React, { useState } from 'react';
import EditForm from '../editHotspot/editForm';
import {addHotspot} from '../../../api';
import { useHistory, useParams } from 'react-router';
import { useSelector } from 'react-redux';

const AddHotspot = () => {
	const [scheduleDetails, setScheduleDetails] = useState({
		name: '',
		location_detail: '',
		dropoffs: [],
		delivery_shifts: [],
		restaurants: [],
		drivers: [],
		location: [],
		city: '',
		state: '',
		country: '',
		postal_code: '',
	});

	const token = useSelector((state) => state.auth.isSignedIn);
	const { id } = useParams();
	const history = useHistory();
	const [driverList, setDriverList] = useState(null);
	const [restaurantList, setRestaurantList] = useState(null);

	const[error,setError] = useState(null);
	const [successMsg, setSuccessMsg] = useState(null);
    
	
	const handleSchedule = (e) => {
		e.preventDefault();
		if(scheduleDetails.location_detail){
			let updatedScheduleDetails = { ...scheduleDetails };

			updatedScheduleDetails['delivery_shifts'] = updatedScheduleDetails[
				'delivery_shifts'
			].map((shifts) => shifts.value);
			updatedScheduleDetails['driver_ids'] = updatedScheduleDetails[
				'drivers'
			].map((driverId) => driverId.value);
			 updatedScheduleDetails['restaurant_ids'] = updatedScheduleDetails['restaurants'].map(restaurantId =>  restaurantId.id)
		
			delete updatedScheduleDetails['restaurants'];
			delete updatedScheduleDetails['drivers'];
		  	addHotspot(token, updatedScheduleDetails)
				.then((resp) => {
					setError(null);
				   setSuccessMsg("Hotspot added successfully");
					setTimeout(() => {
						history.push('/hotspots');
					}, 1200);
					
				})
				.catch((error) => {
					let updatedError = 	error.charAt(0).toUpperCase() + error.slice(1);
					if(updatedError === "Delivery_shifts must contain 3 items"){
						setError("Delivery shifts must contain 3 items");
					}else{
						setError(updatedError);
					}
					
					setSuccessMsg(null);
					
				});
		}else{
			setError("Please fill the hotspot address ")
		}
		
	};

	return (
		<EditForm
			{...{
				title: 'Add Hotspot ',
				scheduleDetails,
				setScheduleDetails,
				handleSchedule,driverList,
				setDriverList,
				restaurantList,
				setRestaurantList,error,successMsg
			}}
		/>
	);
};

export default AddHotspot;
