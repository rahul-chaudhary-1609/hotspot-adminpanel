import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import BannerForm from './bannerForm';
import {getBannerById, editBanner} from '../../../api';
import { useSelector } from 'react-redux';

const EditBanner = () => {
    const {id} = useParams();
     const history = useHistory();
	const token = useSelector((state) => state.auth.isSignedIn);

    const [bannerData, setBannerData] = useState(null);

	const [successMsg, setSuccessMsg] = useState(null);
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(false);
	
	useEffect(() =>{
		setLoading(true);
		getBannerById(token,id).then(res =>{
			let updatedData = {...res};
			updatedData['order'] = {label: res.order, value: res.order};
			setBannerData(updatedData);
			setLoading(false);
			setError(null);
		}).catch(error => {
			setError(error);
			setLoading(false);
		})
	},[])

	const handleValidation = () => {
	    let { image_url, order} = bannerData;
		let error = false;
		if (image_url == '') {
			setError('Please select the banner image');
			error = true;
		}else if(order == ""){
			setError("Please select the order");
			error = true;
		}
		return error;
	}

	const handleSubmit = (e) =>{
		e.preventDefault();
		if(!handleValidation()){
			let data ={
				name: bannerData.name,
				image_url: bannerData.image_url,
				order: bannerData.order.value,
			}
			editBanner(token,data,id).then(res=>{
				setError(null);
				setSuccessMsg("Banner updated successfully")
				setTimeout(() =>{
					history.push('/banner')
				},1200)
			}).catch(error =>{
				setError(error);
				setSuccessMsg(null);
			})
		}
		
	}

	return (
		<BannerForm
			{...{
				title: 'Edit Banner',
				successMsg,
                bannerData,
				setBannerData,
				error,
				loading,
				setLoading,
				handleSubmit
			}}
		/>
	);
};

export default EditBanner;
