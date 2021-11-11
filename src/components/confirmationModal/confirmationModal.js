import React from 'react';
import Modal from 'react-modal';

const ConfirmationModal = (props) => {
	const customStyles = {
		content: {
			top: '50%',
			left: '50%',
			right: 'auto',
			bottom: 'auto',
			marginRight: '-50%',
			transform: 'translate(-50%, -50%)',
			marginLeft:'135px'
		},
	};
	console.log(props)

	const closeModal = () => {
		props.setConfirmationModal(false);
	};

	return (
		<>
			<Modal
				isOpen={props.confirmationModal}
				onRequestClose={closeModal}
				style={customStyles}>
				<h2 style={{ textAlign: 'center', fontSize: '26px' }}>
					Confirm {props.name}
				</h2>
				<div style={{marginTop: '10px' }}>Are you sure you want to mark this payment as paid offline? </div>
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
						onClick={()=>props.handleConfirmation(props.data)}
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
		</>
	);
};

export default ConfirmationModal;
