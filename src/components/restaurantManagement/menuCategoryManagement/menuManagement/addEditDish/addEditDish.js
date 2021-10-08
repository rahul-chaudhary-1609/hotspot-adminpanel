import React, {useEffect,  useState } from 'react';
import ToggleOffIcon from '@material-ui/icons/ToggleOff';
import ToggleOnIcon from '@material-ui/icons/ToggleOn';
import { getDish, editDish, addDish } from '../../../../../api';
import { useHistory, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

//import './restaurantForm.css';
import Loader from '../../../../../globalComponent/layout/loader';

const AddEditDish = () => {
	const history = useHistory();
	const params=useParams();

	const token = useSelector((state) => state.auth.isSignedIn);

	const [dish,setDish] = useState({
		name:null,
        price:null,
        markup_price:null,
        is_quick_filter:false,
        description:null,
	});

	let [error,setError]=useState(null);
	let [success,setSuccess]=useState(null);

	const [showLoader, setShowLoader] = useState(false);


	const handleInputChange = (e) => {
		let updatedDetails = { ...dish };
		if(e.target.id=="price" || e.target.id=="markup_price"){
			updatedDetails[e.target.id] = isNaN(e.target.value)?null:e.target.value;
		}else{
			updatedDetails[e.target.id] = e.target.value;
		}
		
		setDish(updatedDetails);
	};

	useEffect(()=>{
		async function fetchData(){
			if(params.dishId){
				setShowLoader(true);
				setError(null);
				try {
					let data={
						params:{
							dishId:params.dishId
						}						
					}

					let res=await getDish(token,data);
					setDish({
						name:res.dish.name,
						price:parseFloat(res.dish.price),
						markup_price:res.dish.markup_price && parseFloat(res.dish.markup_price),
						is_quick_filter:res.dish.is_quick_filter==1?true:false,
						description:res.dish.description,
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

    const handleQuickFilterStatus=()=>{
        setDish({...dish, is_quick_filter:!dish.is_quick_filter})
    }

    const validateData=()=>{
		let result=true;
		if(!dish.price || isNaN(parseFloat(dish.price))){
			setError("Actual price should be numeric")
			result=false
		}else if(dish.markup_price && isNaN(parseFloat(dish.price))){
			setError("Markup price should be numeric")
			result=false
		}

		return result;

		
    }

	const handleSubmit=async(e)=>{
		e.preventDefault();

        if(!validateData) return;

		let data={
			body:{
				name:dish.name,
				price:parseFloat(dish.price),
				is_quick_filter:dish.is_quick_filter?1:0,
				description:dish.description,
			}						
		}

		if(dish.markup_price){
			data.body.markup_price=parseFloat(dish.markup_price);
		}

		if(params.dishId){
			setShowLoader(true);
			setError(null);
			try {
				
				data.body.dishId=parseInt(params.dishId);

				let res=await editDish(token,data);
				setSuccess(res.message)
				setShowLoader(false);
				setTimeout(()=>{
					history.push(`/restaurant/${params.restaurantId}/menuCategory/${params.menuCategoryId}/menu/${params.dishId}`)
				},1000)
			} catch (error) {
				setShowLoader(false);
				setError(error);
			}							
		}else{
			setShowLoader(true);
			setError(null);
			try {

				data.body.restaurant_dish_category_id=parseInt(params.menuCategoryId);

				let res=await addDish(token,data);
				setSuccess(res.message)
				setShowLoader(false);
				setTimeout(()=>{
					history.push(`/restaurant/${params.restaurantId}/menuCategory/${params.menuCategoryId}/menu`)
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
					<h3 className='text-lg font-bold mb-4'>{history.location.pathname.search("editDish")==-1?"Add Dish":"Edit Dish"}</h3>

					<button
						style={{ height: '3rem' }}
						onClick={() => history.goBack()}
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
						dish && (
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
											value={dish.name}
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
											value={dish.price}
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
											value={dish.markup_price}
										/>
									</div>
								</div>

                                <div className=' d-flex flex-column -mx-3 '>
									<div className='w-full flex px-3 mb-6 md:mb-0 d-inline-flex'>
										<label
											className='block w-1/2 tracking-wide text-gray-300 py-3 px-6 mb-3'
											for='is_quick_filter'>
											Quick Filter
										</label>
										{dish.is_quick_filter? (
										<ToggleOnIcon
                                            onClick={handleQuickFilterStatus}
											style={{ color: 'green', fontSize: '35' }}
										/>
										) : (
											<ToggleOffIcon
                                                onClick={handleQuickFilterStatus}
												style={{ color: 'red', fontSize: '35' }}
											/>
									)}
									</div>
								</div>

                                <div className=' d-flex flex-column -mx-3 '>
									<div className='w-full flex px-3 mb-6 md:mb-0 d-inline-flex'>
										<label
											className='block w-1/2 tracking-wide text-gray-300 py-3 px-6 mb-3'
											for='description'>
											Description
										</label>
										<textarea
											className='appearance-none block w-1/2 bg-gray-100 border border-gray-200 rounded-half py-3 px-6 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-200'
											id='description'
											type='text'
											required
											onChange={handleInputChange}
											value={dish.description}
											rows="5"
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

export default AddEditDish;
