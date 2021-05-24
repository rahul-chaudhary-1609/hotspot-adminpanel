import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getFaqById, deleteFaqs } from '../../../../api';

const DeleteFaqs = (props) => {
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
	const id = props.questionId;
	const history = useHistory();
	const token = useSelector((state) => state.auth.isSignedIn);

	const [topicId, setTopicId] = useState(null);

	const closeModal = () => {
		props.setDeleteFaqsModal(false);
	};

	useEffect(() => {
		faqById();
	}, []);
	const faqById = () => {
		getFaqById(token, id)
			.then((res) => {
				setTopicId(res.topic_id);
			})
			.catch((error) => {
				console.log(error);
			});
	};
	const handleDeleteRestaurant = async () => {
		let data = {
			topic_id: props.questionId,
		};
		deleteFaqs(token, data)
			.then((res) => {
				props.setDeleteFaqsModal(false);
			})
			.catch((error) => {
				console.log(error);
			});
	};
	return (
		<>
			<Modal
				isOpen={props.deleteFaqsModal}
				onRequestClose={closeModal}
				style={customStyles}>
				<h2 style={{ textAlign: 'center', fontSize: '26px' }}>
					Delete Question
				</h2>
				<div>Are you sure you want to Delete the question? </div>
				<div style={{ display: 'flex', marginTop: '40px' }}>
					<button
						onClick={closeModal}
						style={{
							width: '100%',
							backgroundColor: 'white',
							color: 'black',
							border: '2px solid grey',
						}}>
						No
					</button>
					<button
						onClick={handleDeleteRestaurant}
						style={{
							width: '100%',
							backgroundColor: 'white',
							color: 'black',
							border: '2px solid grey',
						}}>
						Yes
					</button>
				</div>
			</Modal>
		</>
	);
};

export default DeleteFaqs;
