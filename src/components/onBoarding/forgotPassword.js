import React, { useState } from 'react';
import { useFormik } from 'formik';
import { withRouter } from 'react-router-dom';
import { Col, Row } from 'reactstrap';
import { forgetpasswordValidation } from '../../utils/validation';
import { forgetPassword } from '../../api';
import { useDispatch } from 'react-redux';
import BeatLoader from 'react-spinners/BeatLoader';
import { css } from '@emotion/core';

const initialValues = {
	email: '',
};

function ForgotPassword({ history, ...props }) {
	const [loading, setLoading] = useState(false);
	const dispatch = useDispatch();
	const override = css`
		display: block;
		margin: 0 auto;
		margin-top: 1.5rem;
		border-color: red;
	`;

	const onSubmit = async (values, actions) => {
		const data = {
			email: values.email,
		};

		try {
			setLoading(true);
			const res = await forgetPassword(data);

			if (res.success) {
				setLoading(false);
				dispatch({
					type: 'EMAIL',
					payload: values.email,
				});
				history.push({
					pathname: '/resetpassword',
					state: {
						email: values.email,
					},
				});
			}
		} catch (error) {
			setLoading(false);
			actions.setFieldError('email', error);
		}
	};

	const newformik = useFormik({
		initialValues,
		validationSchema: forgetpasswordValidation,
		onSubmit,
	});
	return (
		<>
			<div className='h-100 admin-gradient admin-login'>
				<Row className='h-100 no-gutters'>
					<Col
						lg='12'
						md='12'
						className='h-100 d-flex bg-white blue-bg justify-content-center align-items-center'>
						<Col
							lg='6'
							md='10'
							sm='12'
							className='mx-auto admin-app app-login-box'>
							<div>
								<div className='bg-white h-screen text-base font-body'>
									<div className='w-full flex flex-wrap'>
										<div className='w-full md:w-1/2 flex items-center justify-center'>
											<div className='flex flex-col justify-center md:justify-start my-auto pt-8 md:pt-0 px-8 md:px-16 lg:px-32'>
												<h1 className='font-bold text-center md:text-4xl lg:text-5xl text-teal-250'>
													Forgot Password
												</h1>
												<p className='text-gray-200 text-center text-base'>
													Enter your registered email address
												</p>
												<form
													className='pt-3 md:pt-8 flex flex-col'
													onSubmit={newformik.handleSubmit}>
													<label
														for='yourEmail'
														className='text-base text-gray-200'>
														Email Address
													</label>
													<div className=' relative w-full mt-1'>
														<div className=' absolute inset-y-0 left-0 flex items-center pl-3'>
															<svg
																viewBox='0 0 20 20'
																className='mail w-6 h-6 fill-current text-gray-200'>
																<path d='M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z'></path>
																<path d='M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z'></path>
															</svg>
														</div>
														<input
															type='email'
															id='email'
															name='email'
															value={newformik.values.email}
															onBlur={newformik.handleBlur}
															onChange={newformik.handleChange}
															placeholder='your@email.com'
															className='bg-blue-100 appearance-none border-0 rounded-full w-full py-2 px-3 text-gray-200 text-base pl-12  leading-tight focus:outline-none focus:shadow-outline h-12'
														/>
													</div>
													{newformik.touched.email && newformik.errors.email ? (
														<div className='email-validate'>
															{newformik.errors.email}
														</div>
													) : null}
													{loading ? (
														<BeatLoader
															color={'red'}
															loading={loading}
															css={override}
															size={10}
														/>
													) : (
														<input
															id='submit'
															name='submit'
															type='submit'
															value='Submit'
															className='bg-red-700 text-white font-semibold text-lg hover:bg-red-600 p-2 mt-8 h-12 rounded-full'
														/>
													)}
												</form>
											</div>
										</div>
										<div className='w-1/2 min-h-screen bg-gray-100 justify-center items-center hidden md:flex'>
											<img
												src={require('../../assets/img/work-time-amico.png')}
												alt=''
												className=''
											/>
										</div>
									</div>
								</div>
							</div>
						</Col>
					</Col>
				</Row>
			</div>
		</>
	);
}

export default withRouter(ForgotPassword);
