import React from 'react';
import { NavLink } from 'react-router-dom';
import { SidebarData } from './SidebarData';
import '../css/disableField.css';
import { useLocation } from 'react-router';
import { useDispatch } from 'react-redux';

function SideNavbar() {
	const dispatch = useDispatch();
	const handleSearch = () => {
		dispatch({
			type: 'SEARCH_TEXT',
			payload: null,
		});
	};

	const { pathname } = useLocation();
	console.log("pathname",pathname.split('/')[1])
	
	return (
		<div
			style={{marginRight: '10px' ,zIndex: 99, marginTop: "-80px",width: '23rem',height: "auto" ,overflow:'hidden',boxShadow: '0 1px 3px 0 rgb(0 0 0 / 10%), 0 1px 2px 0 rgb(0 0 0 / 6%)'}}
			// style={(pathname.split('/')[2]== 7 && pathname.split('/')[1] == 'viewStaticContent') || pathname.split('/')[1] == 'pickupEarning'|| pathname.split('/')[1] == 'hotspotEarning'|| pathname.split('/')[1] == 'viewRestaurant' || pathname.split('/')[1] == 'feesettings'?{ width: '23rem', height: 'calc(150vh - 68px)' }:pathname.split('/')[1] == 'restaurantPayment'?{ width: '23rem', height: 'calc(204vh - 68px)' }:
			// pathname.split('/')[1] == 'order'
			// ?{ width: '23rem', height: 'calc(131vh - 68px)' }:pathname.split('/')[1] == 'notification'?{ width: '23rem', height: 'calc(122vh - 68px)' }:{ width: '23rem', height: 'calc(100vh - 68px)' }}
			className='bg-gray-dark  fixed bottom-0 md:relative md:min-h-screen z-10 w-full md:w-64 md:pt-24 md:pb-5 md:mt-0 overflow-x-scroll md:overflow-x-hidden'>
			<div
				className='brand-logo justify-center md:flex'
				style={{ backgroundColor: 'white' , height:'120px', marginTop:'-36px'}}>
				<img
					src={require('../assets/img/hotspotLogo.png')}
					alt=''
					style={{
						maxWidth: '35%',
						// backgroundColor: 'white',
						height:'100px',
						marginTop:'20px',
						borderRadius: '.5rem',
						padding: '10px',
					}}
				/>
			</div>
			<ul style={{overflowY : 'scroll',width: '100%',height: "auto",boxSizing: "content-box"}} className='flex flex-row md:flex-col  md:mt-5'>
				{SidebarData.map((item, index) => {
					return (
						<li key={index} className='nav-link md:py-1' onClick={handleSearch}>
							<NavLink
								to={item.to}
								className={item.cName}
								activeClassName='md:border-l-2 border-b-2 md:border-b-0 active'>
								{item.icon}
								<span className='md:ml-3 whitespace-no-wrap block md:inline-block text-sm md:text-lg'>
									{' '}
									{item.label}
								</span>
							</NavLink>
						</li>
					);
				})}
			</ul>
		</div>
	);
}

export default SideNavbar;
