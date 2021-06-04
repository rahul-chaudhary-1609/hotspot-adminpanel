import React, { useEffect, useState } from 'react';
import { getFaqs, getFaqTopics } from '../../../api';
import { useSelector } from 'react-redux';
import { Collapse } from 'react-collapse';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import { getFaqQuestions, deleteFaqs, deleteFaqsTopic, editFaqTopic } from '../../../api';
import { useHistory, useParams } from 'react-router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom'
import DeleteModal from '../../deleteModal/deleteModal';
import _  from 'lodash';

const FAQS = () => {
	const token = useSelector((state) => state.auth.isSignedIn);
	const history = useHistory();

	// const { id } = useParams();
	const path = useParams();
	const id = path.id;
	const topicid = path.topicid;


	const [faqs, setFaqs] = useState([]);
	const [oldFaqs, setOldFaqs] = useState([]);
	const [statusOpened, setStatusOpened] = useState({});

	const [qus, setQus] = useState(null);
	const [active, setActive] = useState(null);
	const [deleteModal, setDeleteModal] = useState(false);


	const [questionId, setQuestionId] = useState(null);
	const [topicId, setTopicId] = useState(null);

	const [show, setShow] = useState(null);
	const [showInput, setShowInput] = useState(null);
	const[flag, setFlag] = useState(false);
	const [error, setError] = useState(null);

	const [changeTopic, setChangeTopic] = useState({
		topic_id: null,
		topic_name: null
	})

	useEffect(() => {
		getFaqTopicsList();
	}, []);


	const faqsList = () => {
		getFaqs(token)
			.then((res) => {
				setFaqs(res.getfaqData);
				handleQuestions(res.getfaqData[0].id);
				setActive(res.getfaqData[0].id);
			})
			.catch((error) => {
				console.log(error);
			});
	}

	const getFaqTopicsList = () => {
		getFaqTopics(token)
			.then((res) => {
				setFaqs(res.faqTopics);
				setOldFaqs(_.cloneDeep(res.faqTopics));
				// handleQuestions(res.getFaqTopicsData[0].id);
				// setActive(res.getFaqTopicsData[0].id);
			})
			.catch((error) => {
				console.log(error);
			});
	}

	const handleCollapse = (e, id) => {
		let updatedStatus = { ...statusOpened };
		updatedStatus[id] = !updatedStatus[id];
		setStatusOpened(updatedStatus);
	};

	useEffect(() => {
		if (topicid) {
			handleQuestions(topicid)
		}
	}, [topicid])

	const handleQuestions = (id) => {
		getFaqQuestions(token, id)
			.then((res) => {
				setError(null)
				let rows = res.faqQuestions.rows;
				let status = {};
				rows.forEach(({ id }) => (status[id] = false));
				setStatusOpened(status);
				setQus(res.faqQuestions.rows);
			})
			.catch((error) => {
				setError(error);
				setQus([])

			});
	};

	const handleDelete = () => {
		if (show == 'Topic') {
			deleteFaqsTopic(token, topicId)
				.then((res) => {
					setError(null)
					setDeleteModal(false);
					getFaqTopicsList();
					setQus(null)
					history.push(`/viewStaticContent/${id}/faqs`)
				})
				.catch((error) => {
					setError(error);
				});
		} else {

			deleteFaqs(token, questionId)
				.then((res) => {
					setError(null)
					setDeleteModal(false);
					handleQuestions(topicid);
				})
				.catch((error) => {
					setError(error);
				});
		}
	}

	const handleTopicChange = (index) => {
		let data = {};
		data['topic_id'] = faqs[index].id;
		data['topic_name'] = faqs[index].topic;
		
		editFaqTopic(token, data)
			.then((res) => {
				setShowInput(null)
				setFlag(false)
			})
			.catch((error) => {
				setError(error);
			});
	}

	return (
		<>
			<div className='main-content pb-16 md:pb-5 flex-1 pt-20 px-2'>

				<div
					id='recipients'
					className='p-4 md:p-8 mt-6 lg:mt-0 rounded  '>
					<h1 className='text-3xl'>FAQs</h1>
					<br />
					<div style={{ marginLeft: '80%', marginTop: '-88px' }}>
						<button
							style={{ height: '3rem' }}
							onClick={() => history.push('/static')}
							className='shadow bg-blue-500 hover:bg-blue-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded'
							type='button'>
							Back
						</button>



						<button
							style={{ height: '3rem' }}
							onClick={() => history.push(`/viewStaticContent/${id}/addFaqs`)}
							className='shadow bg-blue-500 ml-3 hover:bg-blue-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded'
							type='button'>
							Add New
			</button>
					</div>

				</div>



				<div className='flex '>
					<div style={{ width: '30%', marginTop: '40px' }}>
						{faqs &&
							faqs.map((ques, index) => {
								return (
									<>
										<div style={{ display: 'flex' }} key={index}>

											{
												showInput === index ?
													<>
														<div className='form-layout text-base '>
															<div className='flex flex-row items-center '>
																<div className='font-semibold py-4 px-6 w-1/2 text-right'>
																	<input id={ques.id}
																		value={faqs[index].topic}
																		onChange={(e) => {
																			let data = e.target.value;
																			let updatedFaqs = [...faqs];
																			updatedFaqs[index].topic = data;
																			setFaqs(updatedFaqs);
																		}}
																		style={{ borderColor: 'black', padding: '5px', outline: '0', borderWidth: '0 0 2px' }} />
																</div>
																<div className='px-8' style={{ maxWidth: '50%', display: 'flex' }}>
																	<button
																		style={{ height: '3rem' }}
																		onClick={() => handleTopicChange(index)}
																		className='shadow bg-blue-500 ml-3 hover:bg-blue-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded'
																		type='button'>
																		Save
								                                   </button>
																	<button
																		style={{ height: '3rem' }}
																		onClick={() => {
																			
																			setFaqs(_.cloneDeep(oldFaqs));
																			setShowInput(null)
																		}}
																		className='shadow bg-red-500 ml-3 hover:bg-red-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded'
																		type='button'>
																		Cancel
								                                   </button>
																</div>
															</div>
														</div>

													</> :
													<>
														<div className='form-layout text-base  w-full'>
															<div className='flex flex-row items-center '>
																<div className='font-semibold py-4 px-6  text-left' style={{ wordBreak: 'break-all', width: '70%' }}>
																	<Link
																		to={`/viewStaticContent/${id}/faqs/${ques.id}`}
																		onClick={() => {
																			setActive(ques.id);
																			setQuestionId(ques.id);
																			// handleQuestions(ques.id);
																		}}
																		style={{
																			marginBottom: '10px',
																			fontSize: '20px',
																			color: topicid == ques.id ? 'red' : 'blue',
																		}}

																	> {ques.topic}</Link>
																</div>
																<div className='px-8' style={{ maxWidth: '50%' }}>

																	<FontAwesomeIcon
																		style={{ cursor: 'pointer' }}
																		onClick={() => {
																			setShowInput(index)
																			
																		}}
																		className='text-red-600 trash w-5 h-5'
																		color='red'
																		icon={faPencilAlt}
																	/>
																	<FontAwesomeIcon
																		className='text-red-600 trash w-5 h-5 ml-5'
																		color='red'
																		onClick={() => {
																			setShow('Topic')
																			setDeleteModal(true);
																			setTopicId(ques.id)
																		}}
																		icon={faTrashAlt}
																	/>


																</div>
															</div>
														</div>

														<br />

													</>
											}
										</div>

									</>
								);
							})}
					</div>
					{qus && <div style={{
						marginLeft: '50px',
						backgroundColor: 'white', padding: '20px', height: 'fit-content', marginTop: '50px', border: error != null ? '1px solid white' : '1px solid black'
					}}>
						<div
							id='doc'
							style={{
								width: '750px',
								height: "fit-content"
							}}>


							{error ? <p
								style={{
									color: 'red',
									fontSize: '20px',
									textAlign: 'center',
									width: '100%',
									marginTop: '12px',

								}}>
								{error}
							</p> :
								qus.map((ques, index) => {
									return (
										<>
											<div
												style={{
													width: '750px',
													// backgroundColor: '	#DCDCDC',
													padding: '10px',
												}}
												onClick={(e) => handleCollapse(e, ques.id)}>
												<label htmlFor={'acc' + index} style={{ fontSize: '20px' }} className='font-semibold'>
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
															backgroundColor: 'lightgrey',
															width: '722px',
															padding: '10px',
															marginTop: '3px',
														}}>
														<p style={{ fontSize: '17px' }}>{ques.answer}</p>
														<div style={{ textAlign: "right" }}>
															<FontAwesomeIcon
																style={{ cursor: 'pointer' }}
																onClick={() => history.push(`/viewStaticContent/${id}/faqs/${topicid}/editFaqs/${ques.id}`)}
																className='text-red-600 trash w-5 h-5'
																color='red'
																icon={faPencilAlt}
															/>
															<FontAwesomeIcon
																className='text-red-600 trash w-5 h-5 ml-4'
																color='red'
																onClick={() => {
																	setShow('Question')
																	setDeleteModal(true);
																	setQuestionId(ques.id)
																}}
																icon={faTrashAlt}
															/></div>
													</div>
												</Collapse>
											</div>
											{index != qus.length - 1 && <hr style={{ width: '750px' }} />}
										</>
									);
								})}

						</div>
					</div>}
				</div>

				<DeleteModal {...{ deleteModal, setDeleteModal, name: `FAQs ${show}`, handleDelete, show }} />
			</div>
		</>

	);
};

export default FAQS;
