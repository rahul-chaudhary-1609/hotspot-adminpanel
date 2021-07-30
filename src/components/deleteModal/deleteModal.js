import React from 'react';
import Modal from 'react-modal';

const DeleteModal = (props) => {
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

	const closeModal = () => {
		props.setDeleteModal(false);
	};

	return (
		<>
			<Modal
				isOpen={props.deleteModal}
				onRequestClose={closeModal}
				style={customStyles}>
				<h2 style={{ textAlign: 'center', fontSize: '26px' }}>
					Delete {props.name}
				</h2>
			{props.restaurants &&<div>{props.message}</div>}
			{props.show == 'topic' &&<div>{"All the questions that belong to this topic will be deleted."}</div>}
				<div style={{marginTop: '10px' }}>Are you sure you want to delete this {props.name}? </div>
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
						onClick={props.handleDelete}
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

export default DeleteModal;
