import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import Navbar from '../Layout/Navbar';
import SideNavbar from '../Layout/SideNavbar';
export default ({ component: Component, ...rest }) => {
	const auth = useSelector((state) => state.auth.isSignedIn);
	return (
		<Route
			{...rest}
			render={(props) => {
				if (auth) {
					return (
						<div className='font-body tracking-normal leading-normal'>
							<Navbar />
							<div style={{overflow : 'hidden'}} className='flex flex-col md:flex-row'>
								<SideNavbar />
								<Component {...props} />
							</div>
						</div>
					);
				} else {
					return (
						<Redirect
							to={{
								pathname: '/login',
								state: {
									from: props.location,
								},
							}}
						/>
					);
				}
			}}
		/>
	);
};
