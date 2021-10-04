/**
 * The file is covered under Algoworks Work Product License for Design & Development of Mobile Application for “Hotspot”.
 * Please review the license for full details.
 * This program is not free software: You cannot redistribute it for any use under the terms of the Algoworks Work Product License for Design & Development of Mobile Application for “Hotspot”.
 * However the source can be modified and updated for the working of the application Design & Development of Mobile Application for “Hotspot” for which it was licensed.
*/

import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { withRouter } from 'react-router';

function NavBar(props) {
	const [dropdownlist, setDropdownlist] = useState(false);
	const adminDetails = useSelector((state) => state.auth.adminData);

	return (
		<nav className='bg-white h-auto w-full fixed top-0 z-20 py-3 px-4 shadow-2xl'>
			<div class="grid grid-cols-6">
				<div class="col-start-1 ...">
						<img
							src={require('../assets/img/hotspotLogo.png')}
							alt=''
							style={{								
								height: "52px",
								marginLeft: "15px"
							}}
						/>
				</div>
				<div class="col-end-8 ...">
					<button onClick={() => setDropdownlist(!dropdownlist)} className='flex items-center drop-button text-white focus:outline-none'>
						<p style={{marginTop:12}} className='text-gray-200'>{adminDetails && adminDetails.name}</p>
							<img className='w-10 h-10 rounded-full ml-2'
								src={ adminDetails && adminDetails.profile_picture_url != null
										? adminDetails.profile_picture_url
										: require('../assets/img/icon-user.png') }
								alt='Avatar of Jonathan Reinink' onClick={() => props.history.push('/profile')} />
					</button>
				</div>
			</div>
		</nav>
	);
}

export default withRouter(NavBar);
