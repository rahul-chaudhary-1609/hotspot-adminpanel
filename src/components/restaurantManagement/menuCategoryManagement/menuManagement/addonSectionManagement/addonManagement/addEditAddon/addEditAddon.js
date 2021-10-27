import React, {useEffect,  useState } from 'react';
import { getAddon, editAddon, addAddon } from '../../../../../../../api';
import { useHistory, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

//import './restaurantForm.css';
import Loader from '../../../../../../../globalComponent/layout/loader';

const AddEditAddon = () => {
    const history = useHistory();
	const params=useParams();

	const token = useSelector((state) => state.auth.isSignedIn);

	const [addon,setAddon] = useState({
		name:null,
        price:null,
        markup_price:null,
	});

	let [error,setError]=useState(null);
	let [success,setSuccess]=useState(null);

	const [showLoader, setShowLoader] = useState(false);


	const handleInputChange = (e) => {
		let updatedDetails = { ...addon };
		if(e.target.id=="price" || e.target.id=="markup_price"){
			updatedDetails[e.target.id] = isNaN(e.target.value)?null:e.target.value;
		}else{
			updatedDetails[e.target.id] = e.target.value;
		}
		
		setAddon(updatedDetails);
	};

	useEffect(()=>{
		async function fetchData(){
			if(params.addonId){
				setShowLoader(true);
				setError(null);
				try {
					let data={
						params:{
							dish_addon_id:params.addonId
						}						
					}

					let res=await getAddon(token,data);
					setAddon({
						name:res.dishAddon.name,
						price:parseFloat(res.dishAddon.price),
						markup_price:res.dishAddon.markup_price && parseFloat(res.dishAddon.markup_price),
					})
					setShowLoader(false);
				} catch (error) {
					setShowLoader(false);
					setError(error);
				}							
			}
		}
		fetchData();
	},[])

    const validateData=()=>{
		let result=true;
		if(!addon.price || isNaN(parseFloat(addon.price))){
			setError("Actual price should be numeric")
			result=false
		}else if(addon.markup_price && isNaN(parseFloat(addon.markup_price))){
			setError("Markup price should be numeric")
			result=false
		}

		return result;

		
    }

	const handleSubmit=async(e)=>{
		e.preventDefault();

        if(!validateData()) return;

		let data={
			body:{
				dish_add_on_section_id:parseInt(params.sectionId),
				name:addon.name,
				price:parseFloat(addon.price),
			}						
		}

		if(addon.markup_price){
			data.body.markup_price=parseFloat(addon.markup_price);
		}

		if(params.addonId){
			setShowLoader(true);
			setError(null);
			try {
				
				data.body.dish_addon_id=parseInt(params.addonId);

				let res=await editAddon(token,data);
				setSuccess(res.message)
				setShowLoader(false);
				setTimeout(()=>{
					history.push(`/restaurant/${params.restaurantId}/menuCategory/${params.menuCategoryId}/menu/${params.dishId}/addonSection/${params.sectionId}/addon`)
				},1000)
			} catch (error) {
				setShowLoader(false);
				setError(error);
			}							
		}else{
			setShowLoader(true);
			setError(null);
			try {

				data.body.dish_add_on_section_id=parseInt(params.sectionId);

				let res=await addAddon(token,data);
				setSuccess(res.message)
				setShowLoader(false);
				setTimeout(()=>{
					history.push(`/restaurant/${params.restaurantId}/menuCategory/${params.menuCategoryId}/menu/${params.dishId}/addonSection/${params.sectionId}/addon`)
				},1000)
			} catch (error) {
				setShowLoader(false);
				setError(error);
			}	
		}
	}
	

	return (
		<>
			<div
				className='main-content pb-16 md:pb-5 flex-1 pt-20 px-2'
				style={{ overflowY: 'scroll', height: '100vh' }}>
				<div className='p-4 md:p-8 mt-6 lg:mt-0 rounded shadow bg-white w-3/4 mx-auto'>
					<h3 className='text-lg font-bold mb-4'>{history.location.pathname.search("editAddon")==-1?"Add Addon":"Edit Addon"}</h3>

					<button
						style={{ height: '3rem' }}
						onClick={() => history.push(`/restaurant/${params.restaurantId}/menuCategory/${params.menuCategoryId}/menu/${params.dishId}/addonSection/${params.sectionId}/addon`)}
						className='shadow bg-blue-500 ml-3 hover:bg-blue-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded'
						type='button'>
						Back
					</button>
					
					<button
						style={{ height: '3rem' }}
						form='myForm'
						type='submit'
						className='shadow bg-red-500 ml-3 hover:bg-red-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded'>
						Save
					</button>
					

					<br />

					{error && (
						<p
							style={{
								color: 'red',
								fontSize: '20px',
								textAlign: 'center',
								width: '100%',
								marginTop: '12px',
							}}>
							{error}
						</p>
					)}
					{success && (
						<div
							style={{
								backgroundColor: '#9ACD32',
								padding: '10px',
								marginLeft: 'auto',
								marginRight: 'auto',
								marginTop: '24px',
								width: 'fit-content',
							}}>
							{success}
						</div>
					)}
					{showLoader ? (
						<Loader />
					) : (
						addon && (
							<form
								id='myForm'
								onSubmit={handleSubmit}
								className='w-full mt-50 max-w-full text-base text-gray-200'
								style={{
									marginTop: '40px',
								}}>
								<div className=' d-flex flex-column -mx-3 '>
									<div className='w-full flex px-3 mb-6 md:mb-0 d-inline-flex'>
										<label
											className='block w-1/2 tracking-wide text-gray-300 py-3 px-6 mb-3'
											for='name'>
											Name
										</label>
										<input
											className='appearance-none block w-1/2 bg-gray-100 border border-gray-200 rounded-half py-3 px-6 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-200'
											id='name'
											type='text'
											required
											onChange={handleInputChange}
											value={addon.name}
										/>
									</div>
								</div>

                                <div className=' d-flex flex-column -mx-3 '>
									<div className='w-full flex px-3 mb-6 md:mb-0 d-inline-flex'>
										<label
											className='block w-1/2 tracking-wide text-gray-300 py-3 px-6 mb-3'
											for='price'>
											Actual Price ($)
										</label>
										<input
											className='appearance-none block w-1/2 bg-gray-100 border border-gray-200 rounded-half py-3 px-6 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-200'
											id='price'
											type='text'
											pattern="^[+-]?([0-9]+([.][0-9]*)?|[.][0-9]+)$"
											required
											title="Only numeric value allowed"
											onChange={handleInputChange}
											value={addon.price}
										/>
									</div>
								</div>

                                <div className=' d-flex flex-column -mx-3 '>
									<div className='w-full flex px-3 mb-6 md:mb-0 d-inline-flex'>
										<label
											className='block w-1/2 tracking-wide text-gray-300 py-3 px-6 mb-3'
											for='markup_price'>
											Markup Price ($)
										</label>
										<input
											className='appearance-none block w-1/2 bg-gray-100 border border-gray-200 rounded-half py-3 px-6 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-200'
											id='markup_price'
											type='text'
											pattern="^[+-]?([0-9]+([.][0-9]*)?|[.][0-9]+)$"
											title="Only numeric value allowed"
											onChange={handleInputChange}
											value={addon.markup_price}
										/>
									</div>
								</div>
							</form>
						)
					)}
				</div>
			</div>
		</>
	);
};

export default AddEditAddon;
