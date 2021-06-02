import React, { useState } from 'react';
import Modal from 'react-modal';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../api';

const Logout = () => {
	const customStyles = {
		content: {
			top: '50%',
			left: '50%',
			right: 'auto',
			bottom: 'auto',
			marginRight: '-50%',
			transform: 'translate(-50%, -50%)',
			marginLeft:'135px',
			width:'30%'
		},
		overlay: {
			background: "lightgrey"
		  }
	};
	const history = useHistory();
	const token = useSelector((state) => state.auth.isSignedIn);
	const dispatch = useDispatch();
	const [modalIsOpen, setIsOpen] = useState(true);

	const closeModal = () => {
		history.push('/dashboard')
	};

	const handleLogout = () => {
		logout(token)
			.then((res) => {
				dispatch({
					type: 'SIGN_OUT',
					payload: null,
				});
				history.push('/login');
			})
			.catch((error) => {
				console.log(error);
			});
	};

	return (
		<div >
			<Modal
				isOpen={modalIsOpen}
				onRequestClose={closeModal}
				style={customStyles}>
				<h2 style={{ textAlign: 'center', fontSize: '26px' }}>Log Out</h2>
				<div style={{ textAlign: 'center' }}>Are you sure you want to log out?</div>
				<div style={{ display: 'flex', marginTop: '40px' }}>
					<button
						onClick={closeModal}
						style={{
							width: '100%',
							backgroundColor: 'white',
							color: 'white',
							backgroundColor: 'red',
							border: '2px solid red',
						}}>
						No
					</button>
					<button
						onClick={handleLogout}
						style={{
							width: '100%',
							marginLeft: '10px',
							backgroundColor: 'white',
							color: 'white',
							border: '2px solid green',
							backgroundColor: 'green',
						}}>
						Yes
					</button>
				</div>
			</Modal>
		</div>
	);
};

export default Logout;
