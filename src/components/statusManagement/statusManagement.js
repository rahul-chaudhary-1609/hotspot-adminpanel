import React from 'react';
import Modal from 'react-modal';

const StatusManagement = (props) => {
	const customStyles = {
		content: {
			top: '50%',
			left: '50%',
			right: 'auto',
			bottom: 'auto',
			marginRight: '-50%',
			transform: 'translate(-50%, -50%)',
		},
	};

	const closeModal = () => {
		props.setIsOpen(false);
	};

	return (
		<>
			<Modal
				isOpen={props.modalIsOpen}
				onRequestClose={closeModal}
				style={customStyles}>
				<h2 style={{ textAlign: 'center', fontSize: '26px' }}>
					{props.details.status == 0
						?`Activate ${props.name}`
						: `Deactivate ${props.name}`}
				</h2>
				<div>
					Are you sure you want to{' '}
					{props.details.status == 0 ? 'Activate ' : 'Deactivate '} the  {props.name}?
				</div>
				<div style={{ display: 'flex', marginTop: '40px' }}>
					<button
						onClick={closeModal}
            style={{
							width: '100%',
							backgroundColor: 'white',
							color: 'white',
							backgroundColor:'red',
							border: '2px solid red',
						}}>
						No
					</button>
					<button
						onClick={()=>{props.itemId?props.handleStatusChange(props.itemId):props.handleStatusChange()}}
            style={{
							width: '100%',
							marginLeft:'10px',
							backgroundColor: 'white',
							color: 'white',
							border: '2px solid green',
							backgroundColor:'green'
						}}>
						Yes
					</button>
				</div>
			</Modal>
		</>
	);
};

export default StatusManagement;
