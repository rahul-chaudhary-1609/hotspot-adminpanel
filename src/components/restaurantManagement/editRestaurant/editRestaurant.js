import React, { useEffect, useState } from 'react';
import RestaurantForm from './restaurantForm';
import { getRestaurantById, editRestaurant } from '../../../api';
import { useHistory, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

const EditRestaurent = () => {
	const { id } = useParams();
	const history = useHistory();
	const token = useSelector((state) => state.auth.isSignedIn);

	const [restaurantCategoryList, setRestaurantCategoryList] = useState([]);
	const [restaurantDetails, setRestaurantDetails] = useState(null);

	const [category, setCategory] = useState();
	const [hotspotList, setHotspotList] = useState([]);
	const [hotspot, setHotspot] = useState([]);
	const [orderType, setOrderType] = useState('');
	const [location, setLocation] = useState({ lat: '', long: '' });

	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	
	const [successMsg, setSuccessMsg] = useState(null);

	useEffect(() => {
		if (restaurantCategoryList.length && hotspotList.length) {
			getData();
		}
	}, [restaurantCategoryList, hotspotList]);

	const getData = async () => {
		try {
			setLoading(true);
			let { restaurant, coveringHotspots } = await getRestaurantById(token, id);
			
			setRestaurantDetails(restaurant);

			coveringHotspots = coveringHotspots.map((hotspot) => {
				let hs = hotspotList.filter((h) => {
					if (h.name === hotspot) {
						return true;
					}
				})[0];
				// return {label: hs.name ,value: hs.id}
				return hs;
			});

			setHotspot(coveringHotspots);

			if (restaurant.order_type == 1) {
				setOrderType(
					{
						label: 'Hotspot Delivery ',
						value: 1,
					},
				);
			} else if (restaurant.order_type == 2) {
				setOrderType({ label: 'Pickup ', value: 2 });
			} else {
				setOrderType(
					{
						label: 'Both Delivery and Pickup ',
						value: 3,
					},
				);
			}
			// let category = restaurantCategoryList.filter(
			// 	({ id }) => id === restaurant.RestaurantCategoryId
			// )[0];
			let category = restaurant.restaurant_category_ids.map((restaurantId) => {
				let rs = restaurantCategoryList.filter((h) => {
					if (h.id === restaurantId) {
						return true;
					}
				})[0];
				return rs;
			});
			setCategory(category);
			// setLoading(false);
		} catch (error) {
			setLoading(false);
			console.error(error);
		}
	};

	const handleValidation = () => {
		let error = false;
		if (
			restaurantDetails.working_hours_from == '' ||
			restaurantDetails.working_hours_to == ''
		) {
			setError('Please fill the working hours ');
			error = true;
		} else if (restaurantDetails.owner_phone == '') {
			setError('Please fill the phone number');
			error = true;
		}else if (category == null) {
			setError('Please select the category');
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
				deliveries_per_shift: restaurantDetails.deliveries_per_shift,
				cut_off_time: restaurantDetails.cut_off_time,
				working_hours_from: restaurantDetails.working_hours_from,
				working_hours_to: restaurantDetails.working_hours_to,
				order_type: orderType.value,
				restaurant_category_ids : categoryIds,
				role: restaurantDetails.role,
				agreement_doc_url : !restaurantDetails.agreement_doc_url ? '' : restaurantDetails.agreement_doc_url,			
				stripe_publishable_key: restaurantDetails.stripe_publishable_key,
				stripe_secret_key:restaurantDetails.stripe_secret_key,
			};
			debugger
			try {
				let resp = await editRestaurant(token, id, data);
				if (resp.success) {
					setError(null);
					setSuccessMsg('Restaurant updated successfully');
					setTimeout(() => {
						history.push(`/restaurant/${id}`);
					}, 1000);
				
				}
			} catch (error) {
				setError(error);
			}
		}
	};
	return (
		<>
			<RestaurantForm
				{...{
					title: 'Edit Restaurant Details',
					restaurantCategoryList,
					setRestaurantCategoryList,
					restaurantDetails,
					category,
					orderType,
					setOrderType,
					setCategory,
					handleRestaurant,
					hotspotList,
					hotspot,
					setHotspot,
					setHotspotList,
					setRestaurantDetails,
					location,
					setLocation,
					loading,
					setLoading,
					error,successMsg,setError,
				}}
			/>
		</>
	);
};
export default EditRestaurent;
