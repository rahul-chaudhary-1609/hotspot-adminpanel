import React, { useState } from 'react';
import BannerForm from '../editBanner/bannerForm';
import {addBanner} from '../../../api';
import { useHistory } from 'react-router';
import { useSelector } from 'react-redux';

const AddBanner = () => {
	const history = useHistory();
	const token = useSelector((state) => state.auth.isSignedIn);

	const [bannerData, setBannerData] = useState({
        name:'',
        image_url:''
    });
    const [successMsg, setSuccessMsg] = useState(null);
    const[error,setError] = useState(null);

	const handleValidation = () => {
	    let { image_url, order} = bannerData;
		let error = false;
		if (image_url == '') {
			setError('Please select the banner image');
			error = true;
		}
		// else if(order == ""){
		// 	setError("Please select the order");
		// 	error = true;
		// }
		return error;
	}
	const handleSubmit = (e) =>{
		e.preventDefault();
		if(!handleValidation()){
			let data = {...bannerData}
			//data['order'] = data.order.value;
			addBanner(token,data).then(res=>{
				setError(null);
				setSuccessMsg("Banner added successfully")
				setTimeout(() =>{
					history.push('/banners')
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
				title: 'Add New Banner',
				setBannerData,
				bannerData,
				successMsg,
				error,
				setError,
				handleSubmit
			}}
		/>
	);
};

export default AddBanner;
