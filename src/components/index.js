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

import MenuCategoryManagement from './restaurantManagement/menuCategoryManagement/menuCategoryManagement';
import ViewMenuCategory from './restaurantManagement/menuCategoryManagement/viewMenuCategory/viewMenuCategory';
import AddEditMenuCategory from './restaurantManagement/menuCategoryManagement/addEditMenuCategory/addEditMenuCategory';

import MenuManagement from './restaurantManagement/menuCategoryManagement/menuManagement/menuManagement';
import ViewDish from './restaurantManagement/menuCategoryManagement/menuManagement/viewDish/viewDish';
import AddEditDish from './restaurantManagement/menuCategoryManagement/menuManagement/addEditDish/addEditDish';

import AddonSectionManagement from './restaurantManagement/menuCategoryManagement/menuManagement/addonSectionManagement/addonSectionManagement';
import ViewAddonSection from './restaurantManagement/menuCategoryManagement/menuManagement/addonSectionManagement/viewAddonSection/viewAddonSection';
import AddEditAddonSection from './restaurantManagement/menuCategoryManagement/menuManagement/addonSectionManagement/addEditAddonSection/addEditAddonSection';

import AddonManagement from './restaurantManagement/menuCategoryManagement/menuManagement/addonSectionManagement/addonManagement/addonManagement';
import ViewAddon from './restaurantManagement/menuCategoryManagement/menuManagement/addonSectionManagement/addonManagement/viewAddon/viewAddon';
import AddEditAddon from './restaurantManagement/menuCategoryManagement/menuManagement/addonSectionManagement/addonManagement/addEditAddon/addEditAddon';

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
import DriverPaymentNow from './driverPaymentManagement/driverPayNow.js'

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
import ResturantPayNow from './restaurantPayment/resturantPayNow.js'
import RestaurantPaymentDetails from './restaurantPayment/viewRestaurantPaymentDetails/RestaurantPaymentDetals.js'

import CompletedOrder from './orderManagement/completedOrders/completedOrders.js';
import ScheduledOrder from './orderManagement/scheduledOrder/scheduledOrder.js';
import newOrders from './orderManagement/newOrders/newOrders.js';
import OrderDetails from './orderManagement/orderDetails/orderDetails.js';

import HotspotEarning from './adminEarning/hotspotEarning.js';
import PickupEarning from './adminEarning/pickupEarning/pickupEarning.js';
import FAQS from './staticContentManagement/viewStaticContent/faqQ';
import { useHistory, useParams,useLocation } from 'react-router';

const Admin = () => {
	const token = useSelector((state) => state.auth.isSignedIn);
	const userId = useSelector((state) => state.auth.userId);
	const URL_CHANGE = useSelector((state) => state.auth.URL_CHANGE);
	const history = useHistory();
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

		// dispatch({
		// 	type: 'URL_CHANGE',
		// 	payload: parseInt(URL_CHANGE) + 1,
		// });
		// if(URL_CHANGE > 0)
		// {
		// 	dispatch({
		// 		type: 'SIGN_OUT',
		// 	});
		// 	//window.location.href = "/login"
		// }
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
							path={'/customer/:id'}
							component={ViewCustomerDetails}
						/>
						<ProtectedRoutes
							exact
							path={'/hotspots'}
							component={HotspotSettings}
						/>
						<ProtectedRoutes
							exact
							path={'/hotspots/:id'}
							component={ViewHotspotDetails}
						/>
						<ProtectedRoutes
							exact
							path={'/hotspot/:id'}
							component={EditHotspot}
						/>
						<ProtectedRoutes
							exact
							path={'/hotspot'}
							component={AddHotspot}
						/>
						<ProtectedRoutes
							exact
							path={`/driver`}
							component={DriverManagement}
						/>
						<ProtectedRoutes
							exact
							path={`/driver/:id`}
							component={ViewDriverDetails}
						/>
						<ProtectedRoutes
							exact
							path={`/driverPayment`}
							component={DriverPayment}
						/>
						<ProtectedRoutes
							exact
							path={`/driverPayment/driverPaymentNow`}
							component={DriverPaymentNow}
						/>
						<ProtectedRoutes
							exact
							path={`/driverPayment/:id`}
							component={DriverPaymentDetails}
						/>
						<ProtectedRoutes
							exact
							path={[
								`/activeOrder/:id`,
								`/scheduledOrders/:id`,
								`/completedOrders/:id`,
							]}
							component={OrderDetails}
						/>
						<ProtectedRoutes 
							exact 
							path={`/activeOrder`} 
							component={newOrders} 
						/>
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
							path={`/notification/:id`}
							component={ViewNotification}
						/>
						s
						<ProtectedRoutes
							exact
							path={`/addNotification`}
							component={AddNotification}
						/>
						<ProtectedRoutes 
							exact 
							path={`/static`} 
							component={StaticContent} 
						/>
						<ProtectedRoutes
							exact
							path={`/static/:id`}
							component={ViewStaticContent}
						/>
						<ProtectedRoutes
							exact
							path={[`/static/:id/faqs`,`/static/:id/faqs/:topicid`]}
							component={FAQS}
						/>
						<ProtectedRoutes
							exact
							path={`/editStaticContent/:id`}
							component={EditStaticContent}
						/>
						<ProtectedRoutes
							exact
							path={`/static/:id/addFaqs`}
							component={AddFaqs}
						/>
						<ProtectedRoutes exact path={`/static/:id/faqs/:topicId/editFaqs/:questionId`} component={EditFqs} />
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
							path={`/restaurant/:id`}
							component={ViewRestaurant}
						/>
						<ProtectedRoutes
							exact
							path={`/restro/:id`}
							component={EditRestaurant}
						/>
						<ProtectedRoutes
							exact
							path={`/restro`}
							component={AddRestaurent}
						/>
						<ProtectedRoutes
							exact
							path={`/restaurant/:restaurantId/menuCategory`}
							component={MenuCategoryManagement}
						/>
						<ProtectedRoutes
							exact
							path={`/restaurant/:restaurantId/menuCategory/:menuCategoryId`}
							component={ViewMenuCategory}
						/>
						<ProtectedRoutes
							exact
							path={`/restaurant/:restaurantId/addMenuCategory`}
							component={AddEditMenuCategory}
						/>
						<ProtectedRoutes
							exact
							path={`/restaurant/:restaurantId/editMenuCategory/:menuCategoryId`}
							component={AddEditMenuCategory}
						/>
						<ProtectedRoutes
							exact
							path={`/restaurant/:restaurantId/menuCategory/:menuCategoryId/menu`}
							component={MenuManagement}
						/>
						<ProtectedRoutes
							exact
							path={`/restaurant/:restaurantId/menuCategory/:menuCategoryId/menu/:dishId`}
							component={ViewDish}
						/>
						<ProtectedRoutes
							exact
							path={`/restaurant/:restaurantId/menuCategory/:menuCategoryId/addDish`}
							component={AddEditDish}
						/>
						<ProtectedRoutes
							exact
							path={`/restaurant/:restaurantId/menuCategory/:menuCategoryId/editDish/:dishId`}
							component={AddEditDish}
						/>
						<ProtectedRoutes
							exact
							path={`/restaurant/:restaurantId/menuCategory/:menuCategoryId/menu/:dishId/addonSection`}
							component={AddonSectionManagement}
						/>
						<ProtectedRoutes
							exact
							path={`/restaurant/:restaurantId/menuCategory/:menuCategoryId/menu/:dishId/addonSection/:sectionId`}
							component={ViewAddonSection}
						/>
						<ProtectedRoutes
							exact
							path={`/restaurant/:restaurantId/menuCategory/:menuCategoryId/menu/:dishId/addAddonSection`}
							component={AddEditAddonSection}
						/>
						<ProtectedRoutes
							exact
							path={`/restaurant/:restaurantId/menuCategory/:menuCategoryId/menu/:dishId/editAddonSection/:sectionId`}
							component={AddEditAddonSection}
						/>
						<ProtectedRoutes
							exact
							path={`/restaurant/:restaurantId/menuCategory/:menuCategoryId/menu/:dishId/addonSection/:sectionId/addon`}
							component={AddonManagement}
						/>
						<ProtectedRoutes
							exact
							path={`/restaurant/:restaurantId/menuCategory/:menuCategoryId/menu/:dishId/addonSection/:sectionId/addon/:addonId`}
							component={ViewAddon}
						/>
						<ProtectedRoutes
							exact
							path={`/restaurant/:restaurantId/menuCategory/:menuCategoryId/menu/:dishId/addonSection/:sectionId/addAddon`}
							component={AddEditAddon}
						/>
						<ProtectedRoutes
							exact
							path={`/restaurant/:restaurantId/menuCategory/:menuCategoryId/menu/:dishId/addonSection/:sectionId/editAddon/:addonId`}
							component={AddEditAddon}
						/>
						<ProtectedRoutes
							exact
							path={`/banners`}
							component={BannerManagement}
						/>
						<ProtectedRoutes exact path={`/banners/banner`} component={AddBanner} />
						<ProtectedRoutes
							exact
							path={`/banners/banner/:id`}
							component={EditBanner}
						/>
						<ProtectedRoutes
							exact
							path={`/restaurantPayment`}
							component={RestaurantPayment}
						/>
						<ProtectedRoutes
							exact
							path={`/restaurantPayment/resturantPayNow`}
							component={ResturantPayNow}
						/>
						<ProtectedRoutes
							exact
							path={`/restaurantPayment/:id`}
							component={RestaurantPaymentDetails}
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
