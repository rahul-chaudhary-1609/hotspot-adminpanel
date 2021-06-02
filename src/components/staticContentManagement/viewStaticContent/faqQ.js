import React, { useEffect, useState } from 'react';
import { getFaqs ,getFaqTopics} from '../../../api';
import { useSelector } from 'react-redux';
import { Collapse } from 'react-collapse';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import { getFaqQuestions , deleteFaqs} from '../../../api';
import { useHistory, useParams } from 'react-router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import {Link} from 'react-router-dom'
import DeleteModal from '../../deleteModal/deleteModal';
const FAQS = () => {
	const token = useSelector((state) => state.auth.isSignedIn);
	const history = useHistory();

	const { id } = useParams();
	const [faqs, setFaqs] = useState([]);
	const [statusOpened, setStatusOpened] = useState({});

	const [qus, setQus] = useState(null);
	const [active, setActive] = useState(null);
	const[deleteModal,setDeleteModal]= useState(false);


	const [questionId, setQuestionId] = useState(null);

	useEffect(() => {
		faqsList();
	}, []);

	const faqsList = () =>{
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
				console.log(res)
				setFaqs(res.getFaqTopicsData);
				handleQuestions(res.getFaqTopicsData[0].id);
				setActive(res.getFaqTopicsData[0].id);
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

	const handleDelete = () =>{
		let data = {
			topic_id: questionId,
		};
		deleteFaqs(token, data)
			.then((res) => {
				setDeleteModal(false);
				getFaqTopicsList();
			})
			.catch((error) => {
				console.log(error);
			});
	}

	return (
		<>
			<div className='main-content pb-16 md:pb-5 flex-1 pt-20 px-2'>

				<div
					id='recipients'
					className='p-4 md:p-8 mt-6 lg:mt-0 rounded shadow bg-white'>
					<h1 className='text-xl'>FAQs</h1>
					<br />
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

				<div className='flex '>
					<div style={{ width: '30%', marginTop: '40px' }}>
						{faqs &&
							faqs.map((ques, index) => {
								return (
									<>
										<Link
											onClick={() => {
												setActive(ques.id);
												handleQuestions(ques.id);
											}}
											style={{
												marginBottom: '10px',
												color: active === ques.id ? 'red' : 'blue',
											}}
											
											
										> {ques.topic}</Link>
										<br />
									</>
								);
							})}
					</div>
					<div
												id='doc'
												style={{
													width: '753px',
													border: '1px solid black',
													height: "fit-content"
												}}>
					{/* <div style={{ marginTop: '28px' }}> */}
					<div >
						{qus &&
							qus.map((ques, index) => {
								return (
									<>
										<div
											style={{
												width: '750px',
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
														width: '700px',
														padding: '10px',
														marginTop: '3px',
													}}>
													<p>{ques.answer}</p>
													<div style={{textAlign:"right"}}>
													<FontAwesomeIcon
														style={{ cursor: 'pointer' }}
														onClick={() => history.push(`/viewStaticContent/${id}/editFaqs/${ques.id}`)}
														className='text-red-600 trash w-5 h-5'
														color='red'
														icon={faPencilAlt}
													/>
													<FontAwesomeIcon
														className='text-red-600 trash w-5 h-5'
														color='red'
														onClick={() => {
															setDeleteModal(true);
															setQuestionId(ques.topic_id)
														}}
														icon={faTrashAlt}
													/></div>
												</div>
											</Collapse>
										</div>
										<hr style={{ width: '750px' }} />
									</>
								);
							})}
					</div>
				</div>
				</div>
				{/* <DeleteFaqs
					{...{
						setDeleteFaqsModal,
						deleteFaqsModal,

						faqs, questionId
					}}
				/> */}
				<DeleteModal {...{deleteModal, setDeleteModal, name:'FAQs', handleDelete}}/>
			</div>
		</>

	);
};

export default FAQS;
