import React, { useState, useEffect } from 'react';
import AddOnsForm from '../editForm/AddOnsForm';
import { useSelector } from 'react-redux';
import { addDishAddon } from '../../../../../api';
import { useHistory, useParams } from 'react-router-dom';

const AddAddOns = () => {
    const { id } = useParams();
    const token = useSelector((state) => state.auth.isSignedIn);
    const history = useHistory();
    const [dish, setDish] = useState({
        name: '',
        price: '',
        image_url: ''
    });

    const [successMsg, setSuccessMsg] = useState(null);
    const [error, setError] = useState(null);



    const handleDishes = (e) => {
        debugger
        e.preventDefault();
        let data = {
            restaurant_dish_id: id,
            image_url: dish.image_url,
            name: dish.name,
            price: dish.price

        };
        addDishAddon(token, data).then(res => {
            setError(null);
            setSuccessMsg("DishAddon added successfully")
            setTimeout(() => {
                history.push(`/${'viewRestaurant'}/${window.localStorage.getItem('menuId')}/viewDish/${window.localStorage.getItem('dishId')}/addOns`)
            }, 1200)

        }).catch(error => {
            if (error == "image_url is not allowed to be empty") {
                setError("Please upload the image of dish Addon")
            } else {
                let updatedError = error.charAt(0).toUpperCase() + error.slice(1);
                setError(updatedError);
            }
            setSuccessMsg(null);
        })
    };
    return (
        <AddOnsForm
            {...{
                title: 'Add New Dish Add-On',
                handleDishes,
                dish,
                setDish,
                successMsg, error, setError
            }}
        />
    );
};

export default AddAddOns;
