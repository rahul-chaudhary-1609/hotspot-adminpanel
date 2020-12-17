import React, { useState } from 'react';
import { withRouter } from 'react-router';

function NavBar(props) {

    const [dropdownlist, setDropdownlist] = useState(false);

    function handleResetPassword() {
        props.history.push('/resetPassword')
        window.location.reload()
    }

    return (
        <nav className="bg-white h-auto w-full fixed top-0 z-20 py-3 px-4 shadow">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-lg  md:text-3xl">Algoworks Admin Panel</h1>
                </div>
                <div>
                    <div className="relative inline-block">
                        <button onClick={() => setDropdownlist(!dropdownlist)} className="flex items-center drop-button text-white focus:outline-none">
                            <p className="text-gray-200">Jonathan Reinink</p>
                            <img className="w-10 h-10 rounded-full ml-2" src={require("../assets/img/photo.png")} alt="Avatar of Jonathan Reinink" />
                        </button>
                        {dropdownlist != false ?
                        <ul style={{ cursor: 'pointer' }} className="dropdown-menu shadow-md dropdownlist rounded border border-gray-100 absolute right-0 w-full bg-white">
                            <li><a onClick={() => handleResetPassword()} className="text-gray-200 px-2 py-1 block">Change Password</a></li>
                            <li className="border-t border-gray-100"><a href="/" className=" text-gray-200 px-2 py-1 block">Logout</a></li>
                        </ul> : ''}
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default withRouter(NavBar);