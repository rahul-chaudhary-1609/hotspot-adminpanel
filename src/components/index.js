import React, { Fragment, useState } from 'react';
import { Route, Switch, BrowserRouter } from "react-router-dom";
import Login from './onBoarding/login.js'
import Dashboard from './dashboard/dashboard'
import ForgotPassword from './onBoarding/forgotPassword.js';
import ResetPassword from './onBoarding/resetPassword.js'
import EmailNotification from './emailNotification.js';
import PushNotification from './pushNotification.js';
import UserListing from './userListing/userListing.js'
import EditDetails from './userListing/editDetails.js'
import UserDetails from './userListing/userDetails.js'
import SupportRequest from './supportRequest/supportRequest.js'
import SupportRequestDetail from './supportRequest/supportRequestDetail.js'
import TermsCondition from './termsCondition.js'
import PrivacyPolicy from './privacyPolicy.js'
import FAQ from './faq.js'
import Report from './report.js'
import Advertisements from './advertisements/advertisementManagement'
import SideNavbar from '../Layout/SideNavbar.js'
import Navbar from '../Layout/Navbar.js'
import '../../src/assets/styles/algowind.css'
const Admin = () => {

    const [location] = useState(new URL(window.location.href));
    return (
        <Fragment>
            <div>
                <BrowserRouter>
                    {
                        location.pathname == "/" || location.pathname == "/forgotPassword" ?
                            <Switch>
                                <Route exact path={`/`} component={Login} />
                                <Route exact path={`/forgotPassword`} component={ForgotPassword} />

                            </Switch>
                            :
                            <div className="font-body tracking-normal leading-normal">

                                <Switch>
                                    <Route exact path={`/resetPassword`} component={ResetPassword} />
                                    <>
                                        <Navbar />
                                        <div className="flex flex-col md:flex-row">
                                            <SideNavbar />
                                            <Route exact path={`/dashboard`} component={Dashboard} />
                                            <Route exact path={`/emailNotification`} component={EmailNotification} />
                                            <Route exact path={`/pushNotification`} component={PushNotification} />
                                            <Route exact path={`/userListing`} component={UserListing} />
                                            <Route exact path={`/editDetails`} component={EditDetails} />
                                            <Route exact path={`/userDetails`} component={UserDetails} />
                                            <Route exact path={`/supportRequest`} component={SupportRequest} />
                                            <Route exact path={`/supportRequestDetail`} component={SupportRequestDetail} />
                                            <Route exact path={`/termsCondition`} component={TermsCondition} />
                                            <Route exact path={`/privacyPolicy`} component={PrivacyPolicy} />
                                            <Route exact path={`/faq`} component={FAQ} />
                                            <Route exact path={`/report`} component={Report} />
                                            <Route exact path={`/advertisements`} component={Advertisements} />
                                        </div>
                                    </>
                                </Switch>
                            </div>
                    }</BrowserRouter>
            </div>
        </Fragment>
    )
}

export default (Admin);