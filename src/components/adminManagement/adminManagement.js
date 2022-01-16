import React from 'react';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { useHistory, useLocation } from 'react-router';
import ViewAdminProfile from './viewAdminProfile/viewAdminProfile';

const AdminManagement = () => {
	const adminDetails = useSelector((state) => state.auth.adminData);

	const { pathname } = useLocation();

	const history = useHistory();

	return (
		<div
      className="main-content pb-16 md:pb-5 flex-1 pt-20 px-2"
      style={{ overflowY: "scroll", height: "100vh" }}
    >
			<div className='main-content pb-16 md:pb-5 flex-1 pt-20 px-2'>
				<div className='p-4 md:p-8 mt-6 lg:mt-0 rounded shadow bg-white'>
					<div style={{display:"flex", justifyContent:"space-between"}}>
						<div style={{ marginLeft: '1rem', fontSize: '2rem' }}>
							Admin Profile
						</div>
						<div id='recipients' >
							<button
								style={{ height: '3rem' ,}}
								onClick={() => history.push('/changePassword')}
								className='shadow bg-blue-500 hover:bg-blue-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded'
								type='button'>
								Change Password
							</button>
						</div>
					</div>
                      
					{adminDetails && (
						<div style={{ backgroundColor: 'lightgrey', padding: '50px', marginTop:'50px' }}>
							<div
								style={{
									height: '35px',
									width: '35px',
									marginLeft: '100%',
									backgroundColor: 'black',
									paddingLeft: '5px',
									marginTop: '-45px',
								}}>
								<FontAwesomeIcon
									style={{
										cursor: 'pointer',
										// backgroundColor: 'black',
										height: '40px',
										width: '25px',
										
									}}
									onClick={() => history.push(`/editProfile`)}
									className='text-white-600 trash w-25 h-5'
									color='white'
									icon={faPencilAlt}
								/>
							</div>

							{pathname === '/profile' && (
								<ViewAdminProfile {...{ adminDetails }} />
							)}
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default AdminManagement;
