import React, { useEffect, useState } from 'react';
import DishForm from './dishForm';
import { useHistory, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getDishById, editDish, getCategoryList } from '../../../../api';

const EditDish = () => {
	const { id } = useParams();
	console.log(id);
	const token = useSelector((state) => state.auth.isSignedIn);
	const history = useHistory();

	const [dish, setDish] = useState(null);
	const [category, setCategory] = useState([]);
	const [categoryLists, setCategoryLists] = useState([]);

	const [successMsg, setSuccessMsg] = useState(null);
	const [error, setError] = useState(null);

	const [loading, setLoading] = useState(false);

	const [restaurantId, setRestaurantId] = useState(null);
	const [is_recommended, setIsrecommended] = useState(0);
	const [is_quick_filter, setIsquick_filter] = useState(1);

	useEffect(() => {
		getData();
	}, []);

	const getData = async () => {
		try {
			setLoading(true);
			let { dish } = await getDishById(token, id);
			setDish(dish);
			setIsrecommended(dish.is_recommended);
			setIsquick_filter(dish.is_quick_filter);
			setRestaurantId(dish.restaurant_id);
			let { dishCategories } = await getCategoryList(token);
			setCategoryLists(dishCategories);

			let category = dishCategories.filter(
				({ id }) => id === dish.dish_category_id
			)[0];
			setCategory(category);
			setLoading(false);
		} catch (error) {
			setLoading(false);
			console.log(error);
		}
	};
	const handleDishes = (e) => {
		e.preventDefault();
		let data = {
			restaurant_id: dish.restaurant_id,
			image_url: dish.image_url,
			name: dish.name,
			price: dish.price,
			description: dish.description,
			is_recommended : parseInt(is_recommended),
			is_quick_filter :parseInt(is_quick_filter)
		};
		editDish(token, id, data)
			.then((res) => {
				setError(null);
				setSuccessMsg('Dish update successfully');

				setTimeout(() => {
					history.push(`/restaurant/${restaurantId}/menu`);
				}, 1200);
			})
			.catch((error) => {
				setError(error);

				setSuccessMsg(null);
			});
	};
	return (
		<DishForm
			{...{
				title: 'Edit Dish',
				dish,
				handleDishes,
				setDish,
				setCategory,
				category,
				categoryLists,
				successMsg,
				error,
				loading,
				setLoading,
				restaurantId,
				setIsquick_filter,
				setIsrecommended,
				is_recommended,
				is_quick_filter,setError
			}}
		/>
	);
};

export default EditDish;
