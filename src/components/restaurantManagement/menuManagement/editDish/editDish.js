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

	useEffect(() => {
		getData();
	}, []);

	const getData = async () => {
		try {
			setLoading(true);
			let { dish } = await getDishById(token, id);
			setDish(dish);
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
			restaurant_id: dish.RestaurantId,
			image_url: dish.image_url,
			dish_category_id: category ? category.id : null,
			name: dish.name,
			price: dish.price,
			description: dish.description,
		};

		editDish(token, id, data)
			.then((res) => {
				setError(null);
				setSuccessMsg('Dish update successfully');

				setTimeout(() => {
					history.push(`/viewRestaurant/${restaurantId}/menu`);
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
			}}
		/>
	);
};

export default EditDish;
