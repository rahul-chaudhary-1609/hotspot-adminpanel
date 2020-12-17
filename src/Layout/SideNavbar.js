import React from 'react';
import { Link } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { SidebarData } from './SidebarData';

function SideNavbar() {

  return (
      <div className="bg-gray-dark fixed bottom-0 md:relative md:min-h-screen z-10 w-full md:w-64 md:pt-24 md:pb-5 md:mt-0 overflow-x-scroll md:overflow-x-hidden">
        <div className="brand-logo justify-center hidden md:flex">
          <img src={require("../assets/img/algoworksLogo.png")} alt="" style={{ maxWidth: "35%" }} />
        </div>
        <ul className="flex flex-row md:flex-col  md:mt-5">
          {SidebarData.map((item, index) => {
            return (
              <li key={index} className='nav-link md:py-1'>
                <NavLink to={item.to} className={item.cName} activeClassName="md:border-l-2 border-b-2 md:border-b-0 active">
                  {item.icon}
                  <span className='md:ml-3 whitespace-no-wrap block md:inline-block text-sm md:text-lg'> {item.label}</span>
                </NavLink>
              </li>
            );
          })}</ul>
      </div>
  );
}

export default SideNavbar;