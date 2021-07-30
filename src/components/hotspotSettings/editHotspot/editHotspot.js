import React, { useState, useEffect } from 'react';
import EditForm from './editForm';
import { getHotspotDetails } from '../../../api';
import { useHistory, useParams } from 'react-router';
import { useSelector } from 'react-redux';
import { editHotspot } from '../../../api';

const EditHotspot = () => {
	const token = useSelector((state) => state.auth.isSignedIn);
	const { id } = useParams();
	const history = useHistory();
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

	const [driverList, setDriverList] = useState(null);
	const [restaurantList, setRestaurantList] = useState(null);

	const [error, setError] = useState(null);
	const [successMsg, setSuccessMsg] = useState(null);

	const[showLoader, setShowLoader] = useState(false);

	useEffect(() => {
		setShowLoader(true);
		getHotspotDetails(token, id)
			.then((hotspot) => {
				let updatedDetails = hotspot.hotspotDetails;
				updatedDetails['delivery_shifts'] = updatedDetails[
					'delivery_shifts'
				].map((shifts) => ({
					id: new Date().getTime(),
					value: shifts,
				}));
				if (updatedDetails['dropoffs'] == null) {
					updatedDetails['dropoffs'] = [];
				}
				
				updatedDetails['drivers'] = updatedDetails['drivers'].reduce((acc,curr) =>{
					return acc.concat({ label: `${curr.first_name} ${curr.last_name}`, value: curr.id });
				},[])
				// updatedDetails['restaurantIds'] = updatedDetails['restaurantIds']&& updatedDetails['restaurantIds'].map(restaurant => restaurantList.filter(restaurent=> restaurent.label === restaurant )  )

				setScheduleDetails(updatedDetails);
				setShowLoader(false);
			})
			.catch((error) => {
				setShowLoader(false);
				console.log(error);
			});
	}, []);

	const handleSchedule = (e) => {
		e.preventDefault();
		let updatedScheduleDetails = { ...scheduleDetails };

		updatedScheduleDetails['delivery_shifts'] = updatedScheduleDetails[
			'delivery_shifts'
		].map((shifts) => shifts.value);
		updatedScheduleDetails['driver_ids'] = updatedScheduleDetails[
			'drivers'
		].map((driverId) => driverId.value);
		updatedScheduleDetails['restaurant_ids'] = updatedScheduleDetails[
			'restaurants'
		].map((restaurantId) => restaurantId.id);

		delete updatedScheduleDetails['restaurants'];
		delete updatedScheduleDetails['drivers'];

		editHotspot(token, id, updatedScheduleDetails)
			.then((resp) => {
				setError(null);
				setSuccessMsg('Hotspot updated successfully');
				setTimeout(() => {
					history.push(`/hotspots/${id}`);
				}, 1200);
			})
			.catch((error) => {
				let updatedError = error.charAt(0).toUpperCase() + error.slice(1);
				if(updatedError === "Delivery_shifts must contain 3 items"){
					setError("Delivery_shifts must contain 3 items");
				}else{
					setError(updatedError);
				}
				setSuccessMsg(null);
			});
	};

	return (
		<EditForm
			{...{
				title: 'Edit Hotspot Details',
				scheduleDetails,
				setScheduleDetails,
				handleSchedule,
				driverList,
				setDriverList,
				restaurantList,
				setRestaurantList,error, successMsg, showLoader, id
			}}
		/>
	);
};

export default EditHotspot;
