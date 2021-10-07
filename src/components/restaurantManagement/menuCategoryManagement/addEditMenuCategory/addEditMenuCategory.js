import React, {useEffect,  useState } from 'react';

import { getMenuCategory, editMenuCategory, addMenuCategory } from '../../../../api';
import { useHistory, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

//import './restaurantForm.css';
import Loader from '../../../../globalComponent/layout/loader';

const AddEditMenuCategory = () => {
	const history = useHistory();
	const params=useParams();

	const token = useSelector((state) => state.auth.isSignedIn);

	const [menuCategory,setMenuCategory] = useState({
		name:null,
	});

	let [error,setError]=useState(null);
	let [success,setSuccess]=useState(null);

	const [showLoader, setShowLoader] = useState(false);


	const handleInputChange = (e) => {
		let updatedDetails = { ...menuCategory };
		updatedDetails[e.target.id] = e.target.value;
		setMenuCategory(updatedDetails);
	};

	useEffect(()=>{
		async function fetchData(){
			if(params.menuCategoryId){
				setShowLoader(true);
				setError(null);
				try {
					let data={
						params:{
							category_id:params.menuCategoryId
						}						
					}

					let res=await getMenuCategory(token,data);
					setMenuCategory(res.category)
					setShowLoader(false);
				} catch (error) {
					setShowLoader(false);
					setError(error);
				}							
			}
		}
		fetchData();
	},[])

	const handleSubmit=async(e)=>{
		e.preventDefault();
		if(params.menuCategoryId){
			setShowLoader(true);
			setError(null);
			try {
				let data={
					body:{
						category_id:params.menuCategoryId,
						name:menuCategory.name,
					}						
				}

				let res=await editMenuCategory(token,data);
				setSuccess(res.message)
				setShowLoader(false);
				setTimeout(()=>{
					history.push(`/restaurant/${params.restaurantId}/menuCategory`)
				},1000)
			} catch (error) {
				setShowLoader(false);
				setError(error);
			}							
		}else{
			setShowLoader(true);
			setError(null);
			try {
				let data={
					body:{
						restaurant_id:params.restaurantId,
						name:menuCategory.name,
					}						
				}

				let res=await addMenuCategory(token,data);
				setSuccess(res.message)
				setShowLoader(false);
				setTimeout(()=>{
					history.push(`/restaurant/${params.restaurantId}/menuCategory`)
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
					<h3 className='text-lg font-bold mb-4'>{history.location.pathname.search("editMenuCategory")==-1?"Add Menu Category":"Edit Menu Category"}</h3>

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
						menuCategory && (
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
											value={menuCategory.name}
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

export default AddEditMenuCategory;
