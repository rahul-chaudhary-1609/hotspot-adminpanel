import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { withRouter } from 'react-router';

function NavBar(props) {
	const [dropdownlist, setDropdownlist] = useState(false);
	const adminDetails = useSelector((state) => state.auth.adminData);

	return (
		<nav
			className='bg-white h-auto w-full fixed top-0 z-20 py-3 px-4 shadow'
			style={{ height: '68px' }}>
			<div className='flex items-center justify-end'>
				{/* <div>
					<h1 className='text-lg  md:text-3xl flex '>
						<p style={{ color: '#B60203', fontWeight: 'bold' }}> HOT</p>
						<p style={{ fontWeight: 'bold' }}>SPOT</p>
					</h1>
				</div> */}
				<div>
					<div className='relative inline-block'>
						<button
							onClick={() => setDropdownlist(!dropdownlist)}
							className='flex items-center drop-button text-white focus:outline-none'>
							<p className='text-gray-200'>
								{adminDetails && adminDetails.name}
							</p>
							<img
								className='w-10 h-10 rounded-full ml-2'
								src={
									adminDetails && adminDetails.profile_picture_url != null
										? adminDetails.profile_picture_url
										: require('../assets/img/icon-user.png')
								}
								alt='Avatar of Jonathan Reinink'
								onClick={() => props.history.push('/profile')}
							/>
						</button>
					</div>
				</div>
			</div>
		</nav>
	);
}

export default withRouter(NavBar);
