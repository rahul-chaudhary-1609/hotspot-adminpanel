import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router';
import Select from 'react-select';
import { addFaq, getFaqTopics } from '../../../../api';
import { useSelector } from 'react-redux';

const AddFaqs = () => {
	const token = useSelector((state) => state.auth.isSignedIn);
	const history = useHistory();
	const { id } = useParams();

	const [data, setData] = useState({
		answer: '',
		question: '',
		topic_name: '',
		topic_id: null,
	});
	const [faqs, setFaqs] = useState([]);
	const [error, setError] = useState(null);
	const [successMsg, setSuccessMsg] = useState(null);

	useEffect(() => {

		getFaqTopicsList()
	}, []);

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
				setFaqs(updateList);

			})
			.catch((error) => {
				console.log(error);
			});
	}

	const handleValidation = () => {
		let error = false;
		if (data.topic_id == null && data.topic_name === "") {
			setError('Please fill the topic ');
			error = true;
		}else if(data.question === ""){
			setError('Please fill the question ');
			error = true;
		}else if(data.answer ===""){
			setError('Please fill the answer ');
			error = true;
		}
		return error;
	};

	const handleSubmit = () => {
		
		if (!handleValidation()) {
			data['topic_name'] ? delete data['topic_id'] : delete data['topic_name'];
			addFaq(token, data)
				.then((res) => {
					setSuccessMsg('Faqs added successfully');
					setTimeout(() => {
						history.push(`/viewStaticContent/${id}/faqs`);
					}, 1000);

					setError(null)
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
					<h1 className='text-2xl'>Add FAQ</h1>
					<br />
					<div style={{marginLeft:'80%', marginTop:'-78px'}}>
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
					<div
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
									isDisabled={data['topic_name']}
									onChange={(selectedOption) => {
										let updatedData = { ...data };
										updatedData['topic_id'] = selectedOption.value;
										setData(updatedData);
									}}
									options={faqs}
									placeholder="Select the topic ..."
								/>
								<input
									className='w-full h-10 mt-5 p-3'
									placeholder='Enter new topic'
									disabled={data['topic_id']}
									maxlength = "100"
									onChange={(e) => {
										let updatedData = { ...data };
										updatedData['topic_name'] = e.target.value;
										setData(updatedData);
									}}
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
								placeholder='Enter the question'
								onChange={(e) => {
									let updatedData = { ...data };
									updatedData['question'] = e.target.value;
									setData(updatedData);
								}}
							/>
						</div>

						<div className='flex mt-10 '>
							<h1 className='text-xl ml-50 '>Answer</h1>
							<textarea
								
								placeholder='Enter the answer'
								style={{
									width: '70%',
									height: '100px',
									marginLeft: '98px',
									padding: '10px',
								}}
								id='ans'
								onChange={(e) => {
									let updatedData = { ...data };
									updatedData['answer'] = e.target.value;
									setData(updatedData);
								}}
							/>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default AddFaqs;
