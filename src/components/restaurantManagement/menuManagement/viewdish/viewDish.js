/**
 * The file is covered under Algoworks Work Product License for Design & Development of Mobile Application for “Hotspot”.
 * Please review the license for full details.
 * This program is not free software: You cannot redistribute it for any use under the terms of the Algoworks Work Product License for Design & Development of Mobile Application for “Hotspot”.
 * However the source can be modified and updated for the working of the application Design & Development of Mobile Application for “Hotspot” for which it was licensed.
*/


import React, { useEffect, useState } from 'react';
import { getDishById, getCategoryList } from '../../../../api';
import { useSelector } from 'react-redux';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import Loader from '../../../../globalComponent/layout/loader';

const ViewDish = () => {
    const history = useHistory();
    const { id } = useParams();
    const { pathname } = useLocation();
    let path = pathname.split('/')[1];
    let menuId = pathname.split('/')[2];
    localStorage.setItem("dishId", "");
    localStorage.setItem("dishId", id);
    const token = useSelector((state) => state.auth.isSignedIn);

    const [categoryy, setCategory] = useState([]);
    const [dish, setDish] = useState(null);

    useEffect(() => {
        getData();
    }, []);

    const getData = async () => {
        try {
            let { dish } = await getDishById(token, id);
            setDish(dish);
            let { dishCategories } = await getCategoryList(token);
            let category = dishCategories.filter(
                ({ id }) => parseInt(id) == dish.dish_category_id
            )[0].name;
            setCategory(category);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className='main-content md:pb-5 flex-1 p-8 px-2' style={{ overflowY: 'auto', height: '100vh' }}>
				<div id='recipients' className='p-4 md:p-8 mt-6 lg:mt-0 rounded shadow bg-white'>
					<h1 className='text-xl'>Dish Details</h1>
                {!dish ?
                    <Loader />
                    : (
                        <>
                        <div className='flex flex-wrap -mx-3 mb-6 mt-5' style={{justifyContent: 'space-between' }}>
							<div style={{ marginTop: '-40px' }}>
                                    <button
                                        style={{ height: '3rem' }}
                                        className='shadow mt-10 bg-blue-500 ml-3 hover:bg-blue-400 focus:shadow-outline focus:outline-none text-white font-bold py-1 px-4 rounded'
                                        type='button'
                                        disabled>
                                        Dish Details
								</button>
                                    <button
                                        style={{ height: '3rem' }}
                                        onClick={() => history.push({
                                            pathname: `/restaurant/${menuId}/menu/${id}/dishAddOns`,
                                            state: { menuId: menuId, previousPath: path }
                                        })
                                        }
                                        className='shadow bg-500 mt-10 ml-3 hover:bg-white-400 focus:shadow-outline focus:outline-none text-black font-bold py-1 px-4 rounded'
                                        type='button'>
                                        Add-On Management
								</button>
                                </div>
                                <div>
                                    <button
                                        style={{ height: '3rem' }}
                                        onClick={() => {
                                            history.push(`/restaurant/${menuId}/menu`)
                                            }
                                        }
                                        className='shadow bg-blue-500 ml-3 hover:bg-blue-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded'
                                        type='button'>
                                        Back
								</button>
                                </div>
                            </div>
                            <div className='flex flex-wrap -mx-3 mt-10 justify-center'>
                                <div className='w-40 px-3 mb-6 flex justify-center flex-wrap'>
                                    <div className='border  overflow-hidden w-30 h-30'>
                                        <img
                                            id='avtar'
                                            className='h-full w-full'
                                            alt='profile-img'
                                            src={
                                                dish.image_url
                                                    ? dish.image_url
                                                    : require('../../../../assets/img/icon-user.png')
                                            }
                                            accept='image/*'
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className='form-layout text-base border border-gray-200'>
                                <div className='flex flex-row items-center '>
                                    <div className='bg-gray-100 font-semibold py-4 px-6 w-1/3 text-right'>
                                        Name
								</div>
                                    <div className='px-8' style={{ maxWidth: '50%' }}>
                                        {dish.name}
                                    </div>
                                </div>
                                <div className='flex flex-row items-center border-t border-gray-200'>
                                    <div className='bg-gray-100 font-semibold py-4 px-6 w-1/3 text-right'>
                                        Price
								</div>
                                    <div className='px-8'>{dish.price}</div>
                                </div>
                                <div className='flex flex-row items-center border-t border-gray-200'>
                                    <div className='bg-gray-100 font-semibold py-4 px-6 w-1/3 text-right'>
                                        Short Description
								</div>
                                    <div className='px-8' style={{ width: '65%' }}>{dish.description}</div>
                                </div>
                            </div>
                        </>
                    )}
            </div>
        </div>
    );
}

export default ViewDish;
