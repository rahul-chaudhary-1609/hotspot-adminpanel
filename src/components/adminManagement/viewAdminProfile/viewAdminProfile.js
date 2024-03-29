/**
 * The file is covered under Algoworks Work Product License for Design & Development of Mobile Application for “Hotspot”.
 * Please review the license for full details.
 * This program is not free software: You cannot redistribute it for any use under the terms of the Algoworks Work Product License for Design & Development of Mobile Application for “Hotspot”.
 * However the source can be modified and updated for the working of the application Design & Development of Mobile Application for “Hotspot” for which it was licensed.
*/

import React,{useState} from 'react';
import Loader from "../../../globalComponent/layout/loader";

const ViewAdminProfile = ({ adminDetails }) => {
	const [loader,setLoader]=useState(false);

	return (
		<>
			{adminDetails && !loader ? (
				<>
					<div className='flex flex-wrap -mx-3 justify-center '>
						<div className='w-40 px-3 mb-6 flex justify-center flex-wrap'>
							<div class='border rounded-full overflow-hidden w-24 h-24'>
								<img
									id='avtar'
									class='rounded-full h-full w-full'
									alt='profile-img'
									src={
										adminDetails.profile_picture_url
											? adminDetails.profile_picture_url
											: require('../../../assets/img/icon-user.png')
									}
									accept='image/*'
								/>
							</div>
						</div>
					</div>
					<div className='form-layout text-base  border-gray-200'>
						<div className='flex flex-row items-center '>
							<div className=' font-semibold py-4 px-6 w-1/2 text-right'>
								Name
							</div>
							<div className='px-8'>{adminDetails.name}</div>
						</div>
						<div className='flex flex-row items-center  border-gray-200'>
							<div className=' font-semibold py-4 px-6 w-1/2 text-right'>
								Email Address
							</div>
							<div className='px-8'>{adminDetails.email}</div>
						</div>
						<div className='flex flex-row items-center  border-gray-200'>
							<div className=' font-semibold py-4 px-6 w-1/2 text-right'>
								Phone Number
							</div>
							<div className='px-8'>{adminDetails.phone}</div>
						</div>
					</div>
				</>
			):<Loader/>}
		</>
	);
};

export default ViewAdminProfile;
