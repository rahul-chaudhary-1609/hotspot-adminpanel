import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router';
import { getFaqById, getFaqs, editFaqs, getFaqTopics } from '../../../../api';
import Select from 'react-select';
import { useSelector } from 'react-redux';
import Loader from '../../../../globalComponent/layout/loader';

const EditFqs = () => {
	const history = useHistory();
	const path = useParams();
	const id = path.id;
	const topicid = path.topicId;
	const questionId = path.questionId;

	const token = useSelector((state) => state.auth.isSignedIn);

	const [faqs, setFaqs] = useState(null);
	const [faqLists, setFaqList] = useState([]);
	const [error, setError] = useState(null);
	const [successMsg, setSuccessMsg] = useState(null);

	useEffect(() => {
		faqById();
		getFaqTopicsList();
	}, []);

	const faqById = () => {
		getFaqById(token, questionId)
			.then((res) => {
				setFaqs(res.faqQuestion);
			})
			.catch((error) => {
				console.log(error);
			});
	};


	const getFaqTopicsList = () => {
		getFaqTopics(token)
			.then((res) => {
				let { faqTopics } = res;
				let updateList = faqTopics.reduce((acc, curr) => {
					return acc.concat({
						label: curr.topic,
						value: curr.id,
					});
				}, [{ label: 'Others', value: '' }]);
				setFaqList(updateList);

			})
			.catch((error) => {
				console.log(error);
			});
	}

	const handleValidation = () => {
		let error = false;
		if (faqs.topic_id == null && faqs.topic_name === "") {
			setError('Please fill the topic ');
			error = true;
		} else if (faqs.question === "") {
			setError('Please fill the question ');
			error = true;
		} else if (faqs.answer === "") {
			setError('Please fill the answer ');
			error = true;
		}
		return error;
	};


	const handleSubmit = () => {

		if (!handleValidation()) {
			let data = {
				question: faqs.question,
				answer: faqs.answer,
				topic_id: faqs.topic_id,
				id: faqs.id
			};

			editFaqs(token, data)
				.then((res) => {
					setError(null)
					setSuccessMsg('Faqs updated successfully');
					setTimeout(() => {
						history.push(`/viewStaticContent/${id}/faqs/${topicid}`);
					}, 1000);
				})
				.catch((error) => {
					setError(error);
				});
		}

	};
	return (
		<>
			<div className='main-content pb-16 md:pb-5 flex-1 pt-20 px-2'>
				<div
					id='recipients'
					className='p-4 md:p-8 mt-6 lg:mt-0 rounded shadow bg-white'>
					<h1 className='text-2xl'>Edit FAQ</h1>
					<br />
					<div style={{marginLeft:'80%', marginTop:'-78px'}}>
					<button
						style={{ height: '3rem' }}
						onClick={() => history.push(`/viewStaticContent/${id}/faqs/${topicid}`)}
						className='shadow bg-blue-500 hover:bg-blue-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded'
						type='button'>
						Back
					</button>
					<button
						style={{ height: '3rem' }}
						onClick={handleSubmit}
						className='shadow bg-blue-500 ml-3 hover:bg-blue-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded'
						type='button'>
						Save
					</button>
					</div>
					<br />
					{error && (
						<p
							style={{
								color: 'red',
								fontSize: '20px',
								textAlign: 'center',
								width: '100%',
								marginTop: '12px',
							}}>
							{error}
						</p>
					)}
					{successMsg && (
						<div
							style={{
								backgroundColor: '#9ACD32',
								padding: '10px',
								marginLeft: 'auto',
								marginRight: 'auto',
								marginTop: '24px',
								width: 'fit-content',
							}}>
							{successMsg}
						</div>
					)}

					{!faqs ? <Loader /> : <div
						style={{
							marginTop: '20px',
							backgroundColor: 'lightgrey',
							padding: '20px',
							// width: '990px',
							height: '400px',
						}}>
						<div className='flex w-full '>
							<h1 className='text-xl'>Topic</h1>
							<div style={{ width: '70%', marginLeft: '120px' }}>
								<Select
									value={
										faqLists &&
										faqLists.filter((res) => res.value === faqs.topic_id)
									}
									// isDisabled={true}
									options={faqLists}
									onChange={(selectedOption) => {
										let updatedData = { ...faqs };
										updatedData['topic_id'] = selectedOption.value;
										setFaqs(updatedData);
									}}
								/>
								<input
									className='w-full h-10 mt-5 p-3'
									placeholder='Enter new topic '
									disabled
									maxlength = "100"
								/>
							</div>
						</div>
						<div className='flex mt-10 '>
							<h1 className='text-xl ml-50 '>Question</h1>
							<input
								style={{
									width: '70%',
									marginLeft: '86px',
									height: '40px',
									padding: '10px',
								}}
								placeholder='Enter the question '
								value={faqs.question}
								onChange={(e) => {
									let updatedData = { ...faqs };
									updatedData['question'] = e.target.value;
									setFaqs(updatedData);
								}}
							/>
						</div>

						<div className='flex mt-10 '>
							<h1 className='text-xl ml-50 '>Answer</h1>
							<textarea
								placeholder='Enter the answer '
								style={{
									width: '70%',
									height: '100px',
									marginLeft: '98px',
									padding: '10px',
								}}
								id='ans'
								value={faqs.answer}
								onChange={(e) => {
									let updatedData = { ...faqs };
									updatedData['answer'] = e.target.value;
									setFaqs(updatedData);
								}}
							/>
						</div>
					</div>}
				</div>
			</div>
		</>
	);
};

export default EditFqs;
