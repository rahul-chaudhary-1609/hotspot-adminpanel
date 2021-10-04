/**
 * The file is covered under Algoworks Work Product License for Design & Development of Mobile Application for “Hotspot”.
 * Please review the license for full details.
 * This program is not free software: You cannot redistribute it for any use under the terms of the Algoworks Work Product License for Design & Development of Mobile Application for “Hotspot”.
 * However the source can be modified and updated for the working of the application Design & Development of Mobile Application for “Hotspot” for which it was licensed.
*/

import React, { useState } from 'react';
import { withRouter, useLocation, useHistory } from 'react-router-dom';
import { useFormik } from 'formik';
import { newpasswordValidation } from '../../utils/validation';
import BeatLoader from 'react-spinners/BeatLoader';
import { css } from '@emotion/core';
import { resetPassword, forgetPassword } from '../../api';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import './algowind.css';

const initialValues = {
	password: '',
	confirmpassword: '',
};

const override = css`
	display: block;
	margin: 0 auto;
	margin-top: 1.5rem;
	border-color: red;
`;

function ResetPassword({ ...props }) {
	const history = useHistory();

	const [loading, setLoading] = useState(false);
	const [successMsg, setSuccessMsg] = useState(null);

	const [resendEnable, setResendEnable] = useState(false);

	const email = useSelector((state) => state.auth.email);

	const onSubmit = async (values, actions) => {
		const data = {
			otp: values.otp,
			email: email,
			password: values.password,
			confirmPassword: values.confirmpassword,
		};

		try {
			setLoading(true);
			const result = await resetPassword(data);
			setLoading(false);
			if (result.success) {
				setSuccessMsg(result.message);
				setTimeout(() => {
					history.push({
						pathname: '/login',
						state: { email: email },
					});
				}, 1000);
			}
		} catch (error) {
			setLoading(false);
			setResendEnable(true);
			if (!resendEnable) {
				actions.setFieldError('confirmpassword', error);
			}
		}
	};

	const handleResetOTP = () => {
		let data = {
			email: email,
		};
		forgetPassword(data)
			.then((res) => {
				setResendEnable(false);
			})
			.catch((error) => {
				console.log(error);
			});
	};

	const formik = useFormik({
		initialValues,
		validationSchema: newpasswordValidation,
		onSubmit,
	});

	return (
		<>
			<div className='bg-white h-screen text-base font-body'>
				<div className='w-full flex flex-wrap'>
					<div className='w-full md:w-1/2 flex items-center justify-center'>
						<div className='flex flex-col justify-center md:justify-start my-auto pt-8 md:pt-0 px-8 md:px-16 lg:px-32'>
						
							<h1 className='font-bold text-center md:text-4xl lg:text-5xl text-teal-250'>
								Reset Password
							</h1>
							<div className='reset-password-module'>
								<p className='text-gray-200 text-center text-base'>
									Setup your password
								</p>
								<br />
								{successMsg && (
									<div style={{ backgroundColor: '#9ACD32', padding: '10px' }}>
										{successMsg}
									</div>
								)}
								<form
									className='flex flex-col pt-3 md:pt-8'
									onSubmit={formik.handleSubmit}>
									<label for='otp' className='text-base text-gray-200'>
										OTP
									</label>
									<div className=' relative w-full '>
										<input
											type='text'
											id='otp'
											name='otp'
											maxLength={4}
											onBlur={formik.handleBlur}
											placeholder='Enter OTP'
											value={formik.values.otp}
											onChange={formik.handleChange}
											className='bg-blue-100 appearance-none border-0 rounded-full w-full py-2 px-5 text-gray-200 text-base pl-12 mt-1 leading-tight focus:outline-none focus:shadow-outline h-12'
										/>
									</div>
									{resendEnable && (
										<Link
											style={{ color: 'blue', textAlign: 'right' }}
											onClick={handleResetOTP}>
											{' '}
											<u>Resend OTP</u>
										</Link>
									)}
									<div className='flex flex-col mt-3 '>
										<label for='email' className='text-base text-gray-200'>
											New Password
										</label>
										<div className=' relative w-full mt-1 '>
											<div className=' absolute inset-y-0 left-0 flex items-center pl-3'>
												<div className='absolute inset-y-0 left-0 pl-3 flex items-center '>
													<svg
														viewBox='0 0 20 20'
														className='lock-closed w-6 h-6 fill-current text-gray-200'>
														<path
															fill-rule='evenodd'
															d='M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z'
															clip-rule='evenodd'></path>
													</svg>
												</div>
											</div>
											<input
												type='password'
												id='password'
												name='password'
												placeholder='******'
												className='bg-blue-100 appearance-none border-0 rounded-full w-full  text-gray-200 text-base pl-12 mt-1 leading-tight focus:outline-none focus:shadow-outline h-12'
												onBlur={formik.handleBlur}
												value={formik.values.password}
												onChange={formik.handleChange}
											/>
										</div>
										
										{formik.touched.password && formik.errors.password ? (
											<div className='email-validate'>
												{formik.errors.password}
											</div>
										) : null}
									</div>

									<div className='flex flex-col pt-4'>
										<label for='password' className='text-base text-gray-200'>
											Password
										</label>
										<div className='relative mt-1'>
											<div className='absolute inset-y-0 left-0 pl-3 flex items-center'>
												<svg
													viewBox='0 0 20 20'
													className='lock-closed w-6 h-6 fill-current text-gray-200'>
													<path
														fill-rule='evenodd'
														d='M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z'
														clip-rule='evenodd'></path>
												</svg>
											</div>
											<input
												type='password'
												id='confirmPassword'
												placeholder='******'
												name='confirmpassword'
												className='bg-blue-100 appearance-none border-0 rounded-full w-full  text-gray-200 text-base pl-12 mt-1 leading-tight focus:outline-none focus:shadow-outline h-12'
												onBlur={formik.handleBlur}
												value={formik.values.confirmpassword}
												onChange={formik.handleChange}
											/>
										</div>

										{formik.touched.confirmpassword &&
										formik.errors.confirmpassword ? (
											<div className='email-validate'>
												{formik.errors.confirmpassword}
											</div>
										) : null}
									</div>
									{loading ? (
										<BeatLoader
											color={'red'}
											loading={loading}
											css={override}
											size={10}
										/>
									) : (
										<input
											type='submit'
											value='Reset'
											className='bg-red-700 text-white font-semibold text-lg hover:bg-red-600 p-2 mt-8 h-12 rounded-full'
											id='submit'
											name='submit'
										/>
									)}
								</form>
							</div>
							{/* <Link
									style={{ color: 'blue', textAlign: 'center',marginTop:'30px' }}
									onClick={() => history.push('/login')}>
									{' '}
									<u>Login</u>
								</Link> */}
							{/* <!-- Link sent module --> */}
							{/* <div className='success-model hidden'>
								<div className='my-10 rounded-lg mx-auto border border-green-500 bg-green-100 py-10 px-12 w-full md:w-3/4 flex flex-wrap justify-center items-center flex-col'>
									<div className='w-32 h-32 rounded-full border border-green-500 flex items-center justify-center mb-2'>
										<svg
											viewBox='0 0 20 20'
											className='check w-12 h-12 fill-current text-green-500'>
											<path
												fill-rule='evenodd'
												d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'
												clip-rule='evenodd'></path>
										</svg>
									</div>
									<p className='text-lg text-green-500 text-center'>
										Your password has been reset successfully
									</p>
								</div>
							</div> */}
						</div>
					</div>
					<div className='w-1/2 h-screen bg-gray-100 justify-center items-center hidden md:flex'>
						<img
							src={require('../../assets/img/work-time-amico.png')}
							alt=''
							className=''
						/>
					</div>
				</div>
			</div>
		</>
	);
}

export default withRouter(ResetPassword);
