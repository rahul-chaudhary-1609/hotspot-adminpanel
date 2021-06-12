import React, { Fragment, useEffect } from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getAdminProfile } from '../api';
import '../../src/assets/styles/algowind.css';
import ProtectedRoutes from './protectedRoutes';

import Login from './onBoarding/login.js';
import ForgotPassword from './onBoarding/forgotPassword.js';
import ResetPassword from './onBoarding/resetPassword.js';

import Dashboard from './dashboard/dashboard';

import RestaurantManagement from './restaurantManagement/restaurantManagement';
import EditRestaurant from './restaurantManagement/editRestaurant/editRestaurant';
import AddRestaurent from './restaurantManagement/addRestaurant/addRestaurant';
import ViewRestaurant from './restaurantManagement/viewRestaurant/viewRestaurant.js';

import Menumanagement from './restaurantManagement/menuManagement/menuManagement';
import AddDish from './restaurantManagement/menuManagement/addDish/addDish.js';
import EditDish from './restaurantManagement/menuManagement/editDish/editDish.js';
import ViewDish from './restaurantManagement/menuManagement/viewdish/viewDish.js';

import CustomerManagement from './customerManagement/customerManagement.js';
import ViewCustomerDetails from './customerManagement/viewCustomerDetails/viewCustomerDetails.js';

import DriverManagement from './driverManagement/driverManagement';
import ViewDriverDetails from './driverManagement/viewDriverDetails/viewDriverDetails.js';

import FeeSettings from './feeSettings/feeSetting.js';

import HotspotSettings from './hotspotSettings/hotspotSettings.js';
import ViewHotspotDetails from './hotspotSettings/viewHotspotDetails/viewHotspotDetails';
import EditHotspot from './hotspotSettings/editHotspot/editHotspot';
import AddHotspot from './hotspotSettings/addHotspot/addHotspot.js';

import DriverPayment from './driverPaymentManagement/driverPayment.js';
import DriverPaymentDetails from './driverPaymentManagement/viewDriverPaymentDetails/driverPaymentDetails.js';

import NotificationManagement from './notificationManagement/notificationManagement.js';
import ViewNotification from './notificationManagement/viewNotification/viewNotification.js';
import AddNotification from './notificationManagement/addNotification/addNotification.js';

import AdminManagement from './adminManagement/adminManagement.js';
import EditAdminProfile from './adminManagement/editAdminProfile/editAdminProfile.js';
import ChangePassword from './adminManagement/changePassword/changePassword.js';
import Logout from './Logout/logout.js';

import StaticContent from './staticContentManagement/staticContent.js';
import ViewStaticContent from './staticContentManagement/viewStaticContent/viewStaticContent.js';
import EditStaticContent from './staticContentManagement/editStaticContent/editStaticContent.js';

import AddFaqs from './staticContentManagement/Faqs/addFqs/addFaqs';
import EditFqs from './staticContentManagement/Faqs/editFaqs/editFaqs.js';

import BannerManagement from './bannerManagement/bannerManagement.js';
import AddBanner from './bannerManagement/addBanner/addBanner.js';
import EditBanner from './bannerManagement/editBanner/editBanner.js';

import RestaurantPayment from './restaurantPayment/restaurantPayment.js';

import CompletedOrder from './orderManagement/completedOrders/completedOrders.js';
import ScheduledOrder from './orderManagement/scheduledOrder/scheduledOrder.js';
import newOrders from './orderManagement/newOrders/newOrders.js';
import OrderDetails from './orderManagement/orderDetails/orderDetails.js';

import HotspotEarning from './adminEarning/hotspotEarning.js';
import PickupEarning from './adminEarning/pickupEarning/pickupEarning.js';
import FAQS from './staticContentManagement/viewStaticContent/faqQ';

const Admin = () => {
	const token = useSelector((state) => state.auth.isSignedIn);
	const userId = useSelector((state) => state.auth.userId);
	const dispatch = useDispatch();

	useEffect(() => {
		if (userId) {
			getAdminProfile(token)
				.then((res) => {
					dispatch({
						type: 'ADMIN_DATA',
						payload: res,
					});
				})
				.catch((error) => {
					dispatch({
						type: 'SIGN_OUT',
					});
				});
		}
	}, [userId]);

	return (
		<Fragment>
			<div>
				<BrowserRouter>
					<Switch>
						<Route exact path={`/login`} component={Login} />
						<Route exact path={`/forgotPassword`} component={ForgotPassword} />
						<Route exact path={`/resetPassword`} component={ResetPassword} />
						<ProtectedRoutes exact path={`/`} component={Dashboard} />
						<ProtectedRoutes exact path={`/dashboard`} component={Dashboard} />
						<ProtectedRoutes
							exact
							path={`/profile`}
							component={AdminManagement}
						/>
						<ProtectedRoutes
							exact
							path={`/editProfile`}
							component={EditAdminProfile}
						/>
						<ProtectedRoutes
							exact
							path={`/changePassword`}
							component={ChangePassword}
						/>
						<ProtectedRoutes exact path={`/logout`} component={Logout} />
						<ProtectedRoutes
							exact
							path={`/customer`}
							component={CustomerManagement}
						/>
						<ProtectedRoutes
							exact
							path={'/viewCustomer/:id'}
							component={ViewCustomerDetails}
						/>
						<ProtectedRoutes
							exact
							path={'/hotspot'}
							component={HotspotSettings}
						/>
						<ProtectedRoutes
							exact
							path={'/hotspotDetails/:id'}
							component={ViewHotspotDetails}
						/>
						<ProtectedRoutes
							exact
							path={'/editHotspot/:id'}
							component={EditHotspot}
						/>
						<ProtectedRoutes
							exact
							path={'/addHotspot'}
							component={AddHotspot}
						/>
						<ProtectedRoutes
							exact
							path={`/driver`}
							component={DriverManagement}
						/>
						<ProtectedRoutes
							exact
							path={`/viewDriver/:id`}
							component={ViewDriverDetails}
						/>
						<ProtectedRoutes
							exact
							path={`/driverPayment`}
							component={DriverPayment}
						/>
						<ProtectedRoutes
							exact
							path={`/driverPayment/:id`}
							component={DriverPaymentDetails}
						/>
						<ProtectedRoutes
							exact
							path={[
								`/order/orderDetails/:id`,
								`/scheduledOrders/orderDetails/:id`,
								`/completedOrders/orderDetails/:id`,
							]}
							component={OrderDetails}
						/>
						<ProtectedRoutes exact path={`/order`} component={newOrders} />
						<ProtectedRoutes
							exact
							path={`/completedOrders`}
							component={CompletedOrder}
						/>
						<ProtectedRoutes
							exact
							path={`/scheduledOrders`}
							component={ScheduledOrder}
						/>
						<ProtectedRoutes
							exact
							path={`/notification`}
							component={NotificationManagement}
						/>
						<ProtectedRoutes
							exact
							path={`/viewNotification/:id`}
							component={ViewNotification}
						/>
						s
						<ProtectedRoutes
							exact
							path={`/addNotification`}
							component={AddNotification}
						/>
						<ProtectedRoutes exact path={`/static`} component={StaticContent} />
						<ProtectedRoutes
							exact
							path={`/viewStaticContent/:id`}
							component={ViewStaticContent}
						/>
						<ProtectedRoutes
							exact
							path={[`/viewStaticContent/:id/faqs`,`/viewStaticContent/:id/faqs/:topicid`]}
							component={FAQS}
						/>
						<ProtectedRoutes
							exact
							path={`/editStaticContent/:id`}
							component={EditStaticContent}
						/>
						<ProtectedRoutes
							exact
							path={`/viewStaticContent/:id/addFaqs`}
							component={AddFaqs}
						/>
						<ProtectedRoutes exact path={`/viewStaticContent/:id/faqs/:topicId/editFaqs/:questionId`} component={EditFqs} />
						<ProtectedRoutes
							exact
							path={`/feesettings`}
							component={FeeSettings}
						/>
						<ProtectedRoutes
							exact
							path={`/restaurant`}
							component={RestaurantManagement}
						/>
						<ProtectedRoutes
							exact
							path={`/viewRestaurant/:id`}
							component={ViewRestaurant}
						/>
						<ProtectedRoutes
							exact
							path={`/editRestaurant/:id`}
							component={EditRestaurant}
						/>
						<ProtectedRoutes
							exact
							path={`/addRestaurant`}
							component={AddRestaurent}
						/>
						<ProtectedRoutes
							exact
							path={ `/viewRestaurant/:id/menu`}
							component={Menumanagement}
						/>
						<ProtectedRoutes
							exact
							path={`/viewRestaurant/:id/addDish`}
							component={AddDish}
						/>
						<ProtectedRoutes
							exact
							path={`/viewRestaurant/:id/editDish/:id`}
							component={EditDish}
						/>
						<ProtectedRoutes
							exact
							path={`/viewRestaurant/:id/viewDish/:id`}
							component={ViewDish}
						/>
						<ProtectedRoutes
							exact
							path={`/banner`}
							component={BannerManagement}
						/>
						<ProtectedRoutes exact path={`/addBanner`} component={AddBanner} />
						<ProtectedRoutes
							exact
							path={`/editBanner/:id`}
							component={EditBanner}
						/>
						<ProtectedRoutes
							exact
							path={`/restaurantPayment`}
							component={RestaurantPayment}
						/>
						<ProtectedRoutes
							exact
							path={`/hotspotEarning`}
							component={HotspotEarning}
						/>
						<ProtectedRoutes
							exact
							path={`/pickupEarning`}
							component={PickupEarning}
						/>
					</Switch>
				</BrowserRouter>
			</div>
		</Fragment>
	);
};

export default Admin;
