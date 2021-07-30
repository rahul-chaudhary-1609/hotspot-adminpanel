import React, { useState, useEffect, useRef, ReactDOM } from 'react';
import { useHistory, useParams,useLocation } from 'react-router';
import { useSelector } from 'react-redux';
import {
	getStaticContentDetails,
	updateStaticContent,
	uploadImage,
	getFileContent,baseURL
} from '../../../api';
import ReactPlayer from 'react-player';
import Loader from '../../../globalComponent/layout/loader';
import InfoIcon from '@material-ui/icons/Info';

const EditStaticContent = () => {
	debugger
	const history = useHistory();
	const { id } = useParams();
	const token = useSelector((state) => state.auth.isSignedIn);

	const [staticContentDetails, setStaticContentDetails] = useState(null);

	const [imageLoader, setImageLoader] = useState(false)
	const [error, setError] = useState(null);
	const [successMsg, setSuccessMsg] = useState(null);

	const [filename, setFilename] = useState(null);
	const [vedioname, setvedioname] = useState(null);

	useEffect(() => {
		getContent();
	}, []);

	const getContent = () => {
		getStaticContentDetails(token, id)
			.then((res) => {
				getFileContent(token, res.page_url)
					.then((rsp) => {
						//const newUrl = `${baseURL}htmlFileUrlToTextConvert?file_url=${res.page_url}`;
						document.getElementById('doc').src = res.page_url
					})
					.catch((error) => {
						console.log(error);
					});
				console.log(res);
				setStaticContentDetails(res);
			})
			.catch((error) => {
				console.log(error);
			});
	}

	const handleUploadFile = async (e) => {
		setFilename(e.target.files[0].name);
		let data = {
			file: e.target.files[0],
			mimeType:e.target.files[0].type,
			folderName: 'other',
		};
		try {
			const res = await uploadImage(token, data);
			if (res.status == 200) {
				debugger
				setError(null);
				let updatedData = { ...staticContentDetails };
				updatedData.page_url = res.image_url;
				setStaticContentDetails(updatedData);
				//const newUrl = `${baseURL}htmlFileUrlToTextConvert?file_url=${res.image_url}`;
				document.getElementById('doc').src = res.image_url
			}
		} catch (error) {
			setError(error);
		}
	};

	// const updateContent = (url) => {
	// 	getFileContent(token, url)
	// 		.then((rsp) => {
	// 			const newUrl = `${baseURL}htmlFileUrlToTextConvert?file_url=${rsp.page_url}`;
	// 			document.getElementById('doc').src = newUrl
	// 		})
	// 		.catch((error) => {
	// 			console.log(error);
	// 		});
	// };

	const handleUploadVedio = async (e) => {
		let type = e.target.files[0].type;

		if (type !== "video/mp4") {
			setError("Invalid File type");
		}
		else {
			let size = e.target.files[0].size;
			let fSExt = new Array('Bytes', 'KB', 'MB', 'GB'),
				i = 0; while (size > 900) { size /= 1024; i++; }
			let exactSize = (Math.round(size * 100) / 100) + ' ' + fSExt[i];

			if (parseInt(exactSize.split(' ')[0]) >= 10) {
				setError(`File size ${exactSize} ,it should be less than 10MB.`);
			} else {
				setError(null);
				setvedioname(e.target.files[0].name)
				let data = {
					file: e.target.files[0],
					mimeType:e.target.files[0].type,
					folderName: 'other',
				};

				try {
					setImageLoader(true);
					const res = await uploadImage(token, data);
					if (res.status == 200) {
						setError(null);
						let updatedData = { ...staticContentDetails };
						updatedData.video_url = res.image_url;
						setStaticContentDetails(updatedData);
						setImageLoader(false);
					}
				} catch (error) {
					console.log(error);
					setError(error);
					setImageLoader(false);
				}
			}
		}



	};

	const handleSubmitUpdatedFile = () => {

		var data = {
			id: id,
			page_url: staticContentDetails.page_url,
		};
		if(staticContentDetails.title === "Customer -How it works" || staticContentDetails.title === "Driver -How it works")
		{
			data = {
				id: id,
				page_url: staticContentDetails.page_url,
				video_url: staticContentDetails.video_url
			};
		}
		updateStaticContent(token, data)
			.then((rsp) => {
				setSuccessMsg('Content updated successfully');
				setTimeout(() => {
					history.push('/static');
				}, 1000);
			})
			.catch((error) => {
				setError(error);
			});
	};
	return (
		<>
			<div className='main-content pb-16 md:pb-5 flex-1 pt-20 px-2' style={{ overflowY: 'auto', height: '100vh' }}>
				{!staticContentDetails ? <Loader /> : (
					<div
						id='recipients'
						className='p-4 md:p-8 mt-6 lg:mt-0 rounded shadow bg-white'>
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
							onClick={handleSubmitUpdatedFile}
							className='shadow bg-red-500 ml-3 hover:bg-red-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded'
							type='button'>
							Save
						</button>
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
								padding: '20px',
								width: '990px',
								height: '610px',
							}}>
							<div className='flex '>
								<h1 className='text-xl'>Title</h1>
								<h1 style={{ marginLeft: '240px', fontSize: '20px' }}>
									{staticContentDetails.title}
								</h1>
							</div>
							<div className='flex mt-10 '>
								<h1 className='text-xl ml-50 '>Description</h1>

								<div className='flex flex-col ml-40'>
									{(staticContentDetails.title === "Customer -How it works" || staticContentDetails.title === "Driver -How it works") && (
										<>
											{imageLoader ?
												<div style={{
													maxHeight: '200px',
													height: '300px',
													overflow: 'auto',
													border: '1px solid black',
													textAlign: 'center',
													lineHeight: '190px',
												}}>Uploading the video... </div> :
												staticContentDetails['video_url'] &&

												<video style={{
													maxHeight: '200px',
													height: '300px',
													overflow: 'auto',
													border: '1px solid black',
													padding: '10px',
												}}
													width="631"
													height="300"
													controlsList="nodownload novolume nofullscreen  "
													disablepictureinpicture
													controls>
													<source src={staticContentDetails.video_url} type="video/mp4" />

												</video>


											}
											<div style={{ display: 'flex', marginTop : 10}}>
												<label htmlFor='uploadNew'  style={{width:140}}>
													<div 
														className='shadow bg-blue-500 ml-3 hover:bg-blue-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded'
													>
														Upload New Video
													<input
															type='file'
															onChange={handleUploadVedio}
															id='uploadNew'
															style={{ display: 'none', padding: '10px' }}
															accept=".mp4,.flv"
														/>
													</div>
												</label>
												{vedioname && <p style={{ marginTop: '12px', fontSize: '15px', marginLeft: '10px' }}>{vedioname}</p>}
											</div>
											<br />
										</>
									)}

									<iframe
										id='doc'
										style={{
											marginLeft: '70px',
											fontSize: '15px',
											marginLeft: '10px',
											width: '634px',
											height: '400px',
											overflow: 'auto',
											padding: '10px',
											border: '1px solid black',
										}}></iframe>
									<div style={{ display: 'flex' , marginTop : 10}}>
										<label for='upload'  style={{width:140}}>
											<div
												className='shadow bg-blue-500 ml-3 hover:bg-blue-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded'
											>
												Upload File
											<input
													type='file'
													onChange={handleUploadFile}
													id='upload'
													style={{ display: 'none', padding: '10px' }}
													accept='.html'
												/>

											</div>
										</label>
										{filename && <p style={{ marginTop: '12px', fontSize: '15px', marginLeft: '25px' }}>{filename}</p>}
									</div>
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
