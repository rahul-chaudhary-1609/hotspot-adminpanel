import React, { useEffect, useState } from 'react';
import { getFaqs } from '../../../api';
import { useSelector } from 'react-redux';
import { Collapse } from 'react-collapse';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import { getFaqQuestions } from '../../../api';
import { useHistory, useParams } from 'react-router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import DeleteFaqs from '../Faqs/deleteFaqs/deleteFaqs';

const FAQS = () => {
	const token = useSelector((state) => state.auth.isSignedIn);
	const history = useHistory();

	const { id } = useParams();
	const [faqs, setFaqs] = useState([]);
	const [statusOpened, setStatusOpened] = useState({});

	const [qus, setQus] = useState(null);
	const [active, setActive] = useState(null);
	const [deleteFaqsModal, setDeleteFaqsModal] = useState(false);

	const[questionId,setQuestionId] = useState(null);

	useEffect(() => {
		getFaqs(token)
			.then((res) => {
				setFaqs(res.getfaqData);
				handleQuestions(res.getfaqData[0].id);
				setActive(res.getfaqData[0].id);
			})
			.catch((error) => {
				console.log(error);
			});
	}, []);

	const handleCollapse = (e, id) => {
		let updatedStatus = { ...statusOpened };
		updatedStatus[id] = !updatedStatus[id];
		setStatusOpened(updatedStatus);
	};

	const handleQuestions = (id) => {
		getFaqQuestions(token, id)
			.then((res) => {
				let rows = res.faqQuestions.rows;
				let status = {};
				rows.forEach(({ id }) => (status[id] = false));
				setStatusOpened(status);
				setQus(res.faqQuestions.rows);
			})
			.catch((error) => {
				console.log(error);
			});
	};

	return (
		<>
			<button
				style={{ height: '3rem' }}
				onClick={() => history.push(`/viewStaticContent/${id}/addFaqs`)}
				className='shadow bg-blue-500 ml-3 hover:bg-blue-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded'
				type='button'>
				Add New
			</button>

			<div className='flex '>
				<div style={{ width: '30%', marginTop: '40px' }}>
					{faqs &&
						faqs.map((ques, index) => {
							return (
								<>
									<a
										href='#'
										onClick={() => {
											setActive(ques.id);
											handleQuestions(ques.id);
										}}
										style={{
											marginBottom: '10px',
											color: active === ques.id ? 'red' : 'blue',
										}}>
										{' '}
										{ques.topic}
									</a>
									<br />
								</>
							);
						})}
				</div>

				<div style={{ marginTop: '40px' }}>
					{qus &&
						qus.map((ques, index) => {
							return (
								<>
									<div
										style={{
											width: '500px',
											backgroundColor: '	#DCDCDC',
											padding: '10px',
										}}
										onClick={(e) => handleCollapse(e, ques.id)}>
										<label htmlFor={'acc' + index}>
											{ques.question}
											{!statusOpened[ques.id] ? (
												<ArrowDropDownIcon style={{ float: 'right' }} />
											) : (
												<ArrowDropUpIcon style={{ float: 'right' }} />
											)}
										</label>
										<Collapse
											isOpened={statusOpened[ques.id]}
											id={'acc' + index}>
											<div
												style={{
													backgroundColor: '#A9A9A9',
													width: '477px',
													padding: '10px',
													marginTop: '3px',
												}}>
												<p>{ques.answer}</p>
												<FontAwesomeIcon
													style={{ cursor: 'pointer' }}
													onClick={() => history.push(`/editFaqs/${ques.id}`)}
													className='text-red-600 trash w-5 h-5'
													color='red'
													icon={faPencilAlt}
												/>
												<FontAwesomeIcon
													className='text-red-600 trash w-5 h-5'
													color='red'
													onClick={() => {
														setDeleteFaqsModal(true);
														setQuestionId(ques.topic_id)
													}}
													icon={faTrashAlt}
												/>
											</div>
										</Collapse>
									</div>
									<hr style={{ width: '500px' }} />
								</>
							);
						})}
				</div>
			</div>
			<DeleteFaqs
				{...{
					setDeleteFaqsModal,
					deleteFaqsModal,
				
					faqs,questionId
				}}
			/>
		</>
	);
};

export default FAQS;
