import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router';
import { getFaqById, getFaqs, editFaqs } from '../../../../api';
import Select from 'react-select';
import { useSelector } from 'react-redux';

const EditFqs = () => {
	const history = useHistory();
	const { id } = useParams();
	const token = useSelector((state) => state.auth.isSignedIn);

	const [faqs, setFaqs] = useState([]);
	const [faqLists, setFaqList] = useState([]);

	useEffect(() => {
		faqById();
		faqsList();
	}, []);

	const faqById = () => {
		getFaqById(token, id)
			.then((res) => {
				setFaqs(res);
			})
			.catch((error) => {
				console.log(error);
			});
	};

	const faqsList = () => {
		getFaqs(token)
			.then((res) => {
				let { getfaqData } = res;
				let updateList = getfaqData.reduce((acc, curr) => {
					return acc.concat({
						label: curr.topic,
						value: curr.id,
					});
				}, []);
				updateList.push({ label: 'Select the topic', value: '' });
				console.log(updateList.filter((res) => res.value === 3));
				setFaqList(updateList);
			})
			.catch((error) => {
				console.log(error);
			});
	};

	const handleSubmit = () => {
		let data = {
			question: faqs.question,
			answer: faqs.answer,
		};
		let id = faqs.topic_id;
		editFaqs(token, id, data)
			.then((res) => {
				history.push(`/viewStaticContent/${id}/faqs`);
			})
			.catch((error) => {
				console.log(error);
			});
	};
	return (
		<>
			<div className='main-content pb-16 md:pb-5 flex-1 pt-20 px-2'>
				<div
					id='recipients'
					className='p-4 md:p-8 mt-6 lg:mt-0 rounded shadow bg-white'>
					<h1 className='text-xl'>Edit FAQ</h1>
					<br />
					<button
						style={{ height: '3rem' }}
						onClick={() => history.push(`/viewStaticContent/${id}/faqs`)}
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

					<div
						style={{
							marginTop: '20px',
							backgroundColor: 'pink',
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
									isDisabled={true}
									options={faqLists}
								/>
								<input
									className='w-full h-10 mt-5 p-3'
									placeholder='Enter new topic here'
									disabled
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
								placeholder='Enter new topic here'
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
								placeholder='write answer here ....'
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
					</div>
				</div>
			</div>
		</>
	);
};

export default EditFqs;
