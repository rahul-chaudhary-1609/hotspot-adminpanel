import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router';
import { useSelector } from 'react-redux';
import { getStaticContentDetails, htmlFileUrlToTextConvert, baseURL} from '../../../api';
import ReactPlayer from 'react-player';
import FAQS from './faqQ';
import PauseCircleOutlineIcon from '@material-ui/icons/PauseCircleOutline';

const ViewStaticContent = () => {
	const history = useHistory();
	const { id } = useParams();
	const token = useSelector((state) => state.auth.isSignedIn);

	const [staticContentDetails, setStaticContentDetails] =  useState([]);

	useEffect(() => {
		getStaticContentDetails(token, id)
			.then((res) => {
				//const newUrl = `${baseURL}htmlFileUrlToTextConvert?file_url=${res.page_url}`;
				document.getElementById('doc').src = res.page_url
				setStaticContentDetails(res);
			})
			.catch((error) => {
				console.log(error);
			});
	}, []);
	return (
		<>
			<div className='main-content md:pb-5 flex-1 p-8 px-2' style={{ overflowY: 'auto', height: '100vh' }}>
				{staticContentDetails && (
					<div id='recipients' className='p-4 md:p-8 mt-6 lg:mt-0 rounded shadow bg-white'>
						<h1 className='text-xl'>{staticContentDetails.title}</h1>
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
							onClick={() => history.push(`/editStaticContent/${id}`)}
							className='shadow bg-blue-500 ml-3 hover:bg-blue-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded'
							type='button'>
							Edit
								</button>

						<div
							style={{
								marginTop: '20px',
								// backgroundColor: 'lightgrey',
								padding: '20px',
								width: '100%',
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
								<div className='flex flex-col ml-16' >
									{(staticContentDetails.title === "Customer -How it works" || staticContentDetails.title === "Driver -How it works") && (
										staticContentDetails['video_url'] && <div>
											{/*
											<ReactPlayer
												maxWidth='631px'
												url={
													staticContentDetails.video_url
														? staticContentDetails.video_url
														: '../../../assets/img/vedio.png'
												}
												style={{
													maxHeight: '200px',
													height: '300px',
													overflow: 'auto',
													border: '1px solid black',
													 padding: '10px',
												}}
											  playIcon={PauseCircleOutlineIcon}
                                            //   playing={true}
											/> */}
											<video style={{
												// maxHeight: '200px',
												height: '300px',
												overflow: 'auto',
												border: '1px solid black',
												padding: '10px',
												width: "631px",
											}}
												controlsList="nodownload novolume nofullscreen  "
												disablepictureinpicture
												controls>
												<source src={staticContentDetails.video_url} type="video/mp4" />

											</video>


											<br />
										</div>
									)}
									<br />
									<iframe
										id='doc'
										style={{
											width: '734px',
											height: '400px',
											overflow: 'auto',
											border: '1px solid black',
											padding: '10px',
										}}></iframe>
								</div>
							</div>
						</div>
						{/* </>
						) : (
							<FAQS />
						)} */}
					</div>
				)}
			</div>
		</>
	);
};

export default ViewStaticContent;
