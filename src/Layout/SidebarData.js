/**
 * The file is covered under Algoworks Work Product License for Design & Development of Mobile Application for “Hotspot”.
 * Please review the license for full details.
 * This program is not free software: You cannot redistribute it for any use under the terms of the Algoworks Work Product License for Design & Development of Mobile Application for “Hotspot”.
 * However the source can be modified and updated for the working of the application Design & Development of Mobile Application for “Hotspot” for which it was licensed.
*/

import React, { Component } from 'react';
import * as FaIcons from 'react-icons/fa';
import RestaurantIcon from '@material-ui/icons/Restaurant';
import MotorcycleIcon from '@material-ui/icons/Motorcycle';
import GroupIcon from '@material-ui/icons/Group';
import InsertPhotoIcon from '@material-ui/icons/InsertPhoto';
import LocalAtmIcon from '@material-ui/icons/LocalAtm';
import NotificationsIcon from '@material-ui/icons/Notifications';
import SettingsIcon from '@material-ui/icons/Settings';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import LocalMallIcon from '@material-ui/icons/LocalMall';
import DashboardIcon from '@material-ui/icons/Dashboard';

export const SidebarData = [
    {
        label: 'Dashboard',
        to: '/dashboard',
        icon: <DashboardIcon />,
        cName: "nav-text md:px-4 md:py-3 md:flex-row "
    },
    {
        label: 'Customer Management',
        to: '/customer',
        icon: <GroupIcon />,
        cName: "nav-text md:px-4 md:py-3 md:flex-row "
    },
    {
        label: 'Restaurant Management',
        to: '/restaurant',
        icon: <LocalMallIcon/>,
        cName: "nav-text md:px-4 md:py-3 md:flex-row "
    },
    {
        label: 'Driver Management',
        to: '/driver',
        icon: <MotorcycleIcon />,
        cName: "nav-text md:px-4 md:py-3 md:flex-row "
    },
    {
        label: 'Order Management',
        to: '/activeOrder',
        icon: <RestaurantIcon />,
        cName: "nav-text md:px-4 md:py-3 md:flex-row"
    },
    {
        label: 'Banner Management',
        to: '/banners',
        icon: <InsertPhotoIcon />,
        cName: "nav-text md:px-4 md:py-3 md:flex-row"
    },
    {
        label: 'Driver Payment Management',
        to: '/driverPayment',
        icon: <LocalAtmIcon />,
        cName: "nav-text md:px-4 md:py-3 md:flex-row "
    },
    {
        label: 'Restaurant Payment Management',
        to: '/restaurantPayment',
        icon: <LocalAtmIcon/>,
        cName: "nav-text md:px-4 md:py-3 md:flex-row "
    },
    {
        label: 'Admin Earnings',
        to: '/hotspotEarning',
        icon: <LocalAtmIcon />,
        cName: "nav-text md:px-4 md:py-3 md:flex-row "
    },
    {
        label: 'Notification Management',
        to: '/notification',
        icon: <NotificationsIcon />,
        cName: "nav-text md:px-4 md:py-3 md:flex-row "
    },
    {
        label: 'Static Content Management',
        to: '/static',
        icon: <FaIcons.FaBook />,
        cName: "nav-text md:px-4 md:py-3 md:flex-row "
    },
    {
        label: 'Fee Settings',
        to: '/feesettings',
        icon: <SettingsIcon/>,
        cName: "nav-text md:px-4 md:py-3 md:flex-row "
    },
    {
        label: 'Hotspot Settings',
        to: '/hotspots',
        icon: <SettingsIcon />,
        cName: "nav-text md:px-4 md:py-3 md:flex-row "
    },

    {
        label: 'Log Out',
        to: '/logout',
        icon: <ExitToAppIcon />,
        cName: "nav-text md:px-4 md:py-3 md:flex-row "
    },

]
