import React, { useEffect, useState } from 'react';
import AddOnsForm from './AddOnsForm';
import { useHistory, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getDishAddonById, editDishAddon } from '../../../../../api';

const EditAddOns = () => {
	const { id } = useParams();
	const token = useSelector((state) => state.auth.isSignedIn);
	const history = useHistory();

	const [dish, setDish] = useState(null);

	const [successMsg, setSuccessMsg] = useState(null);
	const [error, setError] = useState(null);

	const [loading, setLoading] = useState(false);

	const [restaurantId, setRestaurantId] = useState(null);

	useEffect(() => {
		getData();
	}, []);

	const getData = async () => {
		try {
            setLoading(true);
            
            let { dishAddon } = await getDishAddonById(token, id);
			setDish(dishAddon);
			setRestaurantId(dishAddon.restaurant_dish_id);
			setLoading(false);
		} catch (error) {
			setLoading(false);
			console.log(error);
		}
	};
	const handleDishes = (e) => {
		e.preventDefault();
		let data = {
			dish_addon_id: id,
			image_url: dish.image_url,
			restaurant_dish_id: dish.restaurant_dish_id ,
			name: dish.name,
			price: dish.price
		};
		console.log(restaurantId);
		editDishAddon(token, data)
			.then((res) => {
				setError(null);
				setSuccessMsg('Dish update successfully');

				setTimeout(() => {
                    history.push(`/${'viewRestaurant'}/${window.localStorage.getItem('menuId')}/viewDish/${window.localStorage.getItem('dishId')}/addOns`)
                }, 1200)
			})
			.catch((error) => {
				setError(error);

				setSuccessMsg(null);
			});
	};
	return (
		<AddOnsForm
			{...{
				title: 'Edit Dish Add-On',
				dish,
				handleDishes,
				setDish,
				successMsg,
				error,
				loading,
				setLoading,
				restaurantId,
				setError,
			}}
		/>
	);
};

export default EditAddOns;
