import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router';
import { useSelector } from 'react-redux';
import { getStaticContentDetails, getFileContent } from '../../../api';
import ReactPlayer from 'react-player';
import FAQS from './faqQ';

const ViewStaticContent = () => {
	const history = useHistory();
	const { id } = useParams();
	const token = useSelector((state) => state.auth.isSignedIn);

	const [staticContentDetails, setStaticContentDetails] = useState([]);

	useEffect(() => {
		getStaticContentDetails(token, id)
			.then((res) => {
				getFileContent(token, res.page_url)
					.then((rsp) => {
						document.getElementById('doc').innerHTML = rsp;
					})
					.catch((error) => {
						console.log(error);
					});

				setStaticContentDetails(res);
			})
			.catch((error) => {
				console.log(error);
			});
	}, []);
	return (
		<>
			<div className='main-content pb-16 md:pb-5 flex-1 pt-20 px-2'>
				{staticContentDetails && (
					<div
						id='recipients'
						className='p-4 md:p-8 mt-6 lg:mt-0 rounded shadow bg-white'>
						<h1 style={{ marginLeft: '0.5 rem', fontSize: '2rem' }}>{staticContentDetails.title}</h1>
						<br />
						<button
							style={{ height: '3rem' }}
							onClick={() => history.push('/static')}
							className='shadow bg-blue-500 hover:bg-blue-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded'
							type='button'>
							Back
						</button>
						{id != 6 ? (
							<>
								<button
									style={{ height: '3rem' }}
									onClick={() => history.push(`/editStaticContent/${id}`)}
									className='shadow bg-blue-500 ml-3 hover:bg-blue-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded'
									type='button'>
									Edit
								</button>

								<div
									style={{
										marginTop: '20px',
										backgroundColor: 'lightgrey',
										padding: '20px',
										width: '990px',
										height: '400px',
									}}>
									<div className='flex '>
										<h1 className='text-xl'>Title</h1>
										<h1 style={{ marginLeft: '220px', fontSize: '20px' }}>
											{staticContentDetails.title}
										</h1>
									</div>

									<div className='flex mt-10 '>
										<h1 className='text-xl ml-50 '>Description</h1>
										{/* <ReactPlayer url={staticContentDetails.video_url} /> */}
										<div className='flex flex-col ml-40'>
											{(id == 3 || id == 4) && (
												<>
													<ReactPlayer
														// width='100%'
														marginLeft='20px'
														height='200px'
														url={
															staticContentDetails.video_url
																? staticContentDetails.video_url
																: '../../../assets/img/vedio.png'
														}
														// url='https://www.youtube.com/watch?v=ysz5S6PUM-U'
													/>
													<br />
												</>
											)}
											<div
												id='doc'
												style={{
													width: '634px',
													maxHeight: '200px',
													height: '300px',
													overflow: 'auto',
													border: '1px solid black',
													padding: '10px',
												}}></div>
										</div>
									</div>
								</div>
							</>
						) : (
							<FAQS />
						)}
					</div>
				)}
			</div>
		</>
	);
};

export default ViewStaticContent;
