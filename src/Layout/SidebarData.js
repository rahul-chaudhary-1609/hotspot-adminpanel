import React, { Component } from 'react';
import * as FaIcons from 'react-icons/fa';

export const SidebarData = [
    {
        label: 'Dashboard',
        to: '/dashboard',
        icon: <FaIcons.FaHome />,
        cName: "nav-text md:px-4 md:py-3 md:flex-row "
    },
    {
        label: 'Customer Management',
        to: '/customer',
        icon: <FaIcons.FaFileAlt />,
        cName: "nav-text md:px-4 md:py-3 md:flex-row "
    },
    {
        label: 'Restaurant Management',
        to: '/restaurant',
        icon: <FaIcons.FaAd />,
        cName: "nav-text md:px-4 md:py-3 md:flex-row "
    },
    {
        label: 'Driver Management',
        to: '/driver',
        icon: <FaIcons.FaBell />,
        cName: "nav-text md:px-4 md:py-3 md:flex-row "
    },
    {
        label: 'Order Management',
        to: '/order',
        icon: <FaIcons.FaEnvelope />,
        cName: "nav-text md:px-4 md:py-3 md:flex-row"
    },
    {
        label: 'Banner Management',
        to: '/banner',
        icon: <FaIcons.FaLifeRing />,
        cName: "nav-text md:px-4 md:py-3 md:flex-row"
    },
    {
        label: 'Driver Payment Management',
        to: '/driverPayment',
        icon: <FaIcons.FaClipboardList />,
        cName: "nav-text md:px-4 md:py-3 md:flex-row "
    },
    {
        label: 'Restaurant Payment Management',
        to: '/restaurantPayment',
        icon: <FaIcons.FaClipboardList />,
        cName: "nav-text md:px-4 md:py-3 md:flex-row "
    },
    {
        label: 'Admin Earnings',
        to: '/hotspotEarning',
        icon: <FaIcons.FaClipboardList />,
        cName: "nav-text md:px-4 md:py-3 md:flex-row "
    },
    {
        label: 'Notification Management',
        to: '/notification',
        icon: <FaIcons.FaQuestionCircle />,
        cName: "nav-text md:px-4 md:py-3 md:flex-row "
    },
    {
        label: 'Static Content Management',
        to: '/static',
        icon: <FaIcons.FaQuestionCircle />,
        cName: "nav-text md:px-4 md:py-3 md:flex-row "
    },
    {
        label: 'Fee Settings',
        to: '/feesettings',
        icon: <FaIcons.FaQuestionCircle />,
        cName: "nav-text md:px-4 md:py-3 md:flex-row "
    },
    {
        label: 'Hotspot Settings',
        to: '/hotspot',
        icon: <FaIcons.FaQuestionCircle />,
        cName: "nav-text md:px-4 md:py-3 md:flex-row "
    },

    {
        label: 'Log Out',
        to: '/logout',
        icon: <FaIcons.FaQuestionCircle />,
        cName: "nav-text md:px-4 md:py-3 md:flex-row "
    },

]
