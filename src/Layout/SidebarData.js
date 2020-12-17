import React, { Component }  from 'react';
import * as FaIcons from 'react-icons/fa';

export const SidebarData = [
    {
        label: 'Overview',
        to: '/dashboard',
        icon: <FaIcons.FaHome />,
        cName:"nav-text md:px-4 md:py-3 md:flex-row "
    },
    {
        label: 'Users',
        to: '/userListing',
        icon:<FaIcons.FaUsers />,
        cName:"nav-text md:px-4 md:py-3 md:flex-row "
    },
    {
        label: 'Report',
        to: '/report',
        icon:<FaIcons.FaFileAlt />,
        cName:"nav-text md:px-4 md:py-3 md:flex-row "
    },
    {
        label: 'Advertisements',
        to: '/advertisements',
        icon:<FaIcons.FaAd />,
        cName:"nav-text md:px-4 md:py-3 md:flex-row "
    },
    {
        label: 'Push Notification',
        to: '/pushNotification',
        icon:<FaIcons.FaBell />,
        cName:"nav-text md:px-4 md:py-3 md:flex-row "
    },
    {
        label: 'Email Notification',
        to: '/emailNotification',
        icon:<FaIcons.FaEnvelope />,
        cName:"nav-text md:px-4 md:py-3 md:flex-row"
    },
    {
        label: 'Support Request',
        to: '/supportRequest',
        icon:<FaIcons.FaLifeRing/>,
        cName:"nav-text md:px-4 md:py-3 md:flex-row"
    },
    {
        label: 'Terms & Conditions',
        to: '/termsCondition',
        icon:<FaIcons.FaClipboardList />,
        cName:"nav-text md:px-4 md:py-3 md:flex-row "
    },
    {
        label: 'Privacy Policies',
        to: '/privacyPolicy',
        icon:<FaIcons.FaClipboardCheck/>,
        cName:"nav-text md:px-4 md:py-3 md:flex-row"
    },
    {
        label: 'FAQ',
        to: '/faq',
        icon:<FaIcons.FaQuestionCircle />,
        cName:"nav-text md:px-4 md:py-3 md:flex-row "
    }
]
