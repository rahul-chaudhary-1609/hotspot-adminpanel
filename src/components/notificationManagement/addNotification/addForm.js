import React from 'react';
import { useHistory } from 'react-router';

const AddForm = (props) => {
	const history = useHistory();

	return (
		<>
			<div className='main-content pb-16 md:pb-5 flex-1 pt-20 px-2'>
				<div className='p-4 md:p-8 mt-6 lg:mt-0 rounded shadow bg-white w-3/4 mx-auto'>
					<h3 className='text-lg font-bold mb-4'>Add Notification</h3>

					<button
						style={{ height: '3rem' }}
						onClick={() => history.push('/notification')}
						className='shadow bg-blue-500 ml-3 hover:bg-blue-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded'
						type='button'>
						Back
					</button>

					<button
						style={{ height: '3rem' }}
						form='myForm'
						type='submit'
						className='shadow bg-red-500 ml-3 hover:bg-red-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded'>
						Send
					</button>

					{props.error && (
						<p
							style={{
								color: 'red',
								fontSize: '20px',
								textAlign: 'center',
								width: '100%',
							}}>
							{props.error}
						</p>
					)}
					{props.successMsg && (
						<div
							style={{
								backgroundColor: '#9ACD32',
								padding: '10px',
								width: 'fit-content',
								marginLeft: 'auto',
								marginRight: 'auto',
								marginTop: '12px',
							}}>
							{props.successMsg}
						</div>
					)}
					<form
						id='myForm'
						onSubmit={props.handleSubmit}
						style={{ marginTop: '40px' }}
						className='w-full mt-50 max-w-full text-base text-gray-200'>
						<div className=' d-flex flex-column -mx-3 mb-6'>
							<div className='w-full flex  px-3 justify-content-around'>
								<label
									className=' w-1/2 block tracking-wide mb-2 text-gray-300'
									for='title'>
									Title
								</label>
								<input
									className='appearance-none block w-1/2 bg-gray-100 border border-gray-200 rounded-half py-3 px-6 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-200'
									id='title'
									type='text'
									onChange={(e) => props.setTitle(e.target.value)}
								/>
							</div>
							<div className='w-full flex  px-3 mb-6 md:mb-0'>
								<label
									className='w-1/2 block tracking-wide mb-2 text-gray-300'
									for='description'>
									Description
								</label>
								<textarea
									className='appearance-none  block w-1/2  bg-gray-100 border border-gray-200 rounded-half py-3 px-6 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-200'
									id='description'
									type='text'
									onChange={(e) => props.setDescription(e.target.value)}
								/>
							</div>
						</div>

						<div className='d-flex flex-column -mx-3 mb-6'>
							<div className='w-full flex px-3 mb-6 md:mb-0'>
								<label
									className='block w-1/2 tracking-wide mb-2 text-gray-300'
									for='type'>
									Send To
								</label>

								<div className='flex flex-col'>
									<label for='users'>
										<input
											type='radio'
											id='users'
											name='type'
											value={1}
											onChange={(e) => props.setType(e.target.value)}
											className='mr-3 mt-2'
										/>
										All Users
									</label>

									<label for='customer'>
										<input
											type='radio'
											id='customer'
											name='type'
											value={3}
											onChange={(e) => props.setType(e.target.value)}
											className='mr-3 mt-2'
										/>
										Only Customers
									</label>
									<label for='driver'>
										<input
											type='radio'
											id='driver'
											name='type'
											value={2}
											onChange={(e) => props.setType(e.target.value)}
											className='mr-3 mt-2'
										/>
										Only Driver
									</label>
								</div>
							</div>
						</div>
					</form>
				</div>
			</div>
		</>
	);
};

export default AddForm;
