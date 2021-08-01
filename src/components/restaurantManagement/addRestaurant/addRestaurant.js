import React, { useState } from 'react';
import RestaurantForm from '../editRestaurant/restaurantForm';
import { addRestaurant } from '../../../api';
import { useSelector } from 'react-redux';

function AddRestaurent({ history, ...props }) {
	const token = useSelector((state) => state.auth.isSignedIn);
	const [restaurantDetails, setRestaurantDetails] = useState({
		owner_email: '',
		owner_name: '',
		owner_phone: null,
		restaurant_image_url: '',
		restaurant_name: '',
		working_hours_from: '',
		working_hours_to: '',
		order_type: 0,
		cut_off_time: null,
		address: '',
		deliveries_per_shift: null,
		working_hours_from: null,
		working_hours_to: null,
		location: [],
		hotspot_location_ids: [],
		stripe_publishable_key: '',
      	stripe_secret_key:'',
	});
	const [hotspotList, setHotspotList] = useState([]);
	const [restaurantCategoryList, setRestaurantCategoryList] = useState([]);

	const [hotspot, setHotspot] = useState([]);
	const [orderType, setOrderType] = useState('');
	const [category, setCategory] = useState(null);

	const [error, setError] = useState(null);
	const [successMsg, setSuccessMsg] = useState(null);

	const handleValidation = () => {
		let error = false;
		if (orderType == '') {
			setError('Please select the order type');
			error = true;
		} else if (category == null) {
			setError('Please select the category');
			error = true;
		} else if (
			restaurantDetails.working_hours_from == null ||
			restaurantDetails.working_hours_to == null
		) {
			setError('Please fill the working hours ');
			error = true;
		} else if (
			restaurantDetails.address == '' ||
			restaurantDetails.location.length == 0
		) {
			setError('Please fill the restaurant address ');
			error = true;
		} else if (restaurantDetails.owner_phone == null) {
			setError('Please fill the phone number');
			error = true;
		} else if (restaurantDetails.restaurant_image_url == '') {
			setError('Please upload restaurant image');
			error = true;
		} else {
			setError(null);
		}

		return error;
	};
	const handleRestaurant = async (e) => {
		
		e.preventDefault();

		if (!handleValidation()) {
			let hotspotIds = [];
			hotspot.map(({ id }) => {
				hotspotIds.push(id);
			});
			let categoryIds = [];
			category.map(({ id }) => {
				categoryIds.push(id);
			});

			let data = {
				restaurant_name: restaurantDetails.restaurant_name,
				restaurant_image_url: restaurantDetails.restaurant_image_url,
				owner_name: restaurantDetails.owner_name,
				owner_email: restaurantDetails.owner_email,
				owner_phone: restaurantDetails.owner_phone.replace(/[^\d]/g, ''),
				lat: restaurantDetails.location[0],
				long: restaurantDetails.location[1],
				address: restaurantDetails.address,
				hotspot_location_ids: hotspotIds,
				role: restaurantDetails.role,
				deliveries_per_shift: restaurantDetails.deliveries_per_shift,
				cut_off_time: restaurantDetails.cut_off_time,
				working_hours_from: restaurantDetails.working_hours_from,
				working_hours_to: restaurantDetails.working_hours_to,
				order_type: orderType.value,
				restaurant_category_ids : categoryIds,
				agreement_doc_url : restaurantDetails.agreement_doc_url,
				stripe_publishable_key: restaurantDetails.stripe_publishable_key,
				stripe_secret_key:restaurantDetails.stripe_secret_key,
			};
debugger
			try {
				const response = await addRestaurant(token, data);
				if (response.success) {
					setError(null);
					let restaurantId = response.restaurant_id;
					setSuccessMsg('Restaurant added successfully');
					setTimeout(() => {
						history.push(`/restaurant`);
					}, 1000);
				}
			} catch (error) {
				setError(error);
				setSuccessMsg(null);
			}
		}
	};
	return (
		<>
			<RestaurantForm
				{...{
					title: 'Add New Restaurant',
					restaurantDetails,
					setRestaurantDetails,
					handleRestaurant,
					hotspotList,
					setHotspotList,
					hotspot,
					setHotspot,
					orderType,setError,
					setOrderType,
					restaurantCategoryList,
					setRestaurantCategoryList,
					category,
					setCategory,
					error,
					successMsg,
				}}
			/>
		</>
	);
}
export default AddRestaurent;
