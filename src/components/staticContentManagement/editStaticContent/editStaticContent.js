import React, { useState, useEffect, useRef } from 'react';
import { useHistory, useParams } from 'react-router';
import { useSelector } from 'react-redux';
import {
	getStaticContentDetails,
	updateStaticContent,
	uploadImage,
	getFileContent,
} from '../../../api';
import ReactPlayer from 'react-player';
import { Player } from 'video-react';

const EditStaticContent = () => {
	const history = useHistory();
	const { id } = useParams();
	const token = useSelector((state) => state.auth.isSignedIn);

	const [staticContentDetails, setStaticContentDetails] = useState([]);

	useEffect(() => {
		getContent();
	}, []);

	const getContent =() =>{
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
	}

	const handleUploadFile = async (e) => {
		let data = {
			image: e.target.files[0],
			folderName: 'other',
		};

		try {
			const res = await uploadImage(token, data);
			if (res.status == 200) {
				let updatedData = { ...staticContentDetails };
				updatedData.page_url = res.image_url;
				setStaticContentDetails(updatedData);
				updateContent(res.image_url);
			}
		} catch (error) {
			console.log(error);
		}
	};

	const updateContent = (url) => {
		getFileContent(token, url)
			.then((rsp) => {
				document.getElementById('doc').innerHTML = rsp;
			})
			.catch((error) => {
				console.log(error);
			});
	};

	const handleUploadVedio = async (e) => {
		let data = {
			image: e.target.files[0],
			folderName: 'other',
		};

		try {
			const res = await uploadImage(token, data);
			if (res.status == 200) {
				let updatedData = { ...staticContentDetails };
				updatedData.vedio_url = res.image_url;
				setStaticContentDetails(updatedData);
			}
		} catch (error) {
			console.log(error);
		}
	};

	const handleSubmitUpdatedFile = () => {
		let data = {
			id: id,
			page_url: staticContentDetails.page_url,
		};

		updateStaticContent(token, data)
			.then((rsp) => {
				history.push('/static');
			})
			.catch((error) => {
				console.log(error);
			});
	};
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
						<button
							style={{ height: '3rem' }}
							onClick={handleSubmitUpdatedFile}
							className='shadow bg-blue-500 ml-3 hover:bg-blue-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded'
							type='button'>
							Save
						</button>
						<div
							style={{
								marginTop: '20px',
								backgroundColor: 'lightgrey',
								padding: '20px',
								width: '990px',
								height: '600px',
							}}>
							<div className='flex '>
								<h1 className='text-xl'>Title</h1>
								<h1 style={{ marginLeft: '240px', fontSize: '20px' }}>
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
												// url={
												// 	staticContentDetails.video_url
												// 		? staticContentDetails.video_url
												// 		: '../../../assets/img/vedio.png'
												// }
												url='https://www.youtube.com/watch?v=ysz5S6PUM-U'
											/>

											<label for='uploadNew' className='w-1/2 block '>
												<div
													className='w-full px-2 py-1 ml-5 my-2 flex justify-around items-center bg-gray-400 rounded-lg text-white'
													title='UploadNew'>
													Upload New
													<input
														type='file'
														onChange={handleUploadVedio}
														id='uploadNew'
														style={{ display: 'none', padding: '10px' }}
														// accept='image/x-png,image/gif,image/jpeg'
														// accept='text/html'
													/>
												</div>
											</label>

											<br />
										</>
									)}

									<div
										id='doc'
										style={{
											marginLeft: '100px',
											fontSize: '15px',
											marginLeft: '10px',
											width: '634px',
											maxHeight: '200px',
											height: '300px',
											overflow: 'auto',
											padding: '10px',
											border: '1px solid black',
										}}></div>

									<label for='upload' className='w-24 block '>
										<div
											className='w-full px-2 py-1 ml-5 my-2 flex justify-around items-center bg-gray-400 rounded-lg text-white'
											title='Upload'>
											Upload File
											<input
												type='file'
												onChange={handleUploadFile}
												id='upload'
												style={{ display: 'none', padding: '10px' }}
												// accept='image/x-png,image/gif,image/jpeg'
											/>
										</div>
									</label>
								</div>
							</div>
						</div>
					</div>
				)}
			</div>
		</>
	);
};

export default EditStaticContent;
