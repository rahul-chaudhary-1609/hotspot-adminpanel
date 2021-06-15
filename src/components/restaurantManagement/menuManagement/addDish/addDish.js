import React, { useState, useEffect } from 'react';
import DishForm from '../editDish/dishForm';
import { useSelector } from 'react-redux';
import { addDish, getDishById,getCategoryList } from '../../../../api';
import { useHistory, useParams } from 'react-router-dom';

const AddDish = () => {
	const [category, setCategory] = useState(null);
	const { id } = useParams();
	const token = useSelector((state) => state.auth.isSignedIn);
	const history = useHistory();
	const [dish, setDish] = useState({
		name: '',
		price: '',
		description: '',
		image_url: ''
	});

	const [categoryLists, setCategoryLists] = useState([]);
	const [successMsg, setSuccessMsg] = useState(null);
	const [is_recommended, setIsrecommended] = useState(0);
	const [is_quick_filter, setIsquick_filter] = useState(1);
    const[error,setError] = useState(null);
	useEffect(() => {
		getData();
	}, []);

	const getData = async () => {
		try {
			let { dishCategories } = await getCategoryList(token);
			setCategoryLists(dishCategories);

			let category = dishCategories.filter(
				({ category }) => category.id === id
			)[0];
			setCategory(category);
		} catch (error) {
			console.log(error);
		}
	};

	const handleDishes = (e) => {
		e.preventDefault();
		let data = {
			restaurant_id: id,
			image_url: dish.image_url,
			name: dish.name,
			price: dish.price,
			description : dish.description,
			is_recommended : is_recommended,
			is_quick_filter :is_quick_filter
		
		};
		addDish(token,data).then(res => {
			setError(null);
			setSuccessMsg("Dish added successfully")
			setTimeout(() =>{
				history.push(`/viewRestaurant/${id}/menu`)
			},1200)
		     
		}).catch(error => {
			if(error == "image_url is not allowed to be empty"){
				setError("Please upload the image of dish")
			}else{
				let updatedError = 	error.charAt(0).toUpperCase() + error.slice(1);
				setError(updatedError);
			}
		   setSuccessMsg(null);
		})
	};
	return (
		<DishForm
			{...{
				title: 'Add New Dish',
				setCategory,
				dish,
				setDish,
				categoryLists,
				setCategoryLists,
				setIsrecommended,
				setIsquick_filter,
				is_recommended,
				is_quick_filter,
				successMsg,error,setError,
				handleDishes
			}}
		/>
	);
};

export default AddDish;
