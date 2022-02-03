import React from 'react';
import { useLocation } from 'react-router-dom';
// import {baseURL} from '../../../api'
// import { Document, Page, pdfjs } from "react-pdf";

const DriverForm = (props) => {
	const url = useLocation();
	let driver = props.driverDetails ? props.driverDetails.personalDetails : null;
	let address = props.driverDetails ? props.driverDetails.driverAddress : null;
	let vehicle = props.driverDetails
		? props.driverDetails.driverVehicleDetail
		: null;
		
	return (
		<>
			{props.driverDetails && (
				<div className='main-content pb-16 md:pb-5 flex-1  px-2 mt-5'> 
					<div className='p-4 md:p-8 lg:mt-0 rounded bg-white w-3/4 mx-auto'>
						<form
							id='myForm'
							className='w-full max-w-full text-base text-gray-200'>
							<div class='flex flex-wrap -mx-3 mb-6 justify-center'>
								<div class='w-40 px-3 mb-6 flex justify-center flex-wrap'>
									<div
										class='border rounded-full overflow-hidden '
										style={{ width: '7rem', height: '7rem' }}>
										<img
											id='avtar'
											class='rounded-full h-full w-full'
											alt='upload profile'
											src={
												driver.profile_picture_url
													? driver.profile_picture_url
													: require('../../../assets/img/icon-user.png')
											}
											accept='image/*'
										/>
									</div>
								</div>
							</div>

							<div className='flex flex-wrap -mx-3 '>
								<div className='w-full md:w-1/2 px-3  md:mb-0'>
									<label
										className='block tracking-wide mb-2 text-gray-300'
										for='first-name'>
										First Name
									</label>
									<input
										className={
											'appearance-none block w-full border bg-gray-100  rounded-full py-3 px-6 mb-3 leading-tight focus:outline-none focus:bg-white'
										}
										id='first_name'
										type='text'
										disabled={props.disable}
										placeholder='first_name'
										defaultValue={driver.first_name}
									/>
								</div>
								<div className='w-full md:w-1/2 px-3'>
									<label
										className='block tracking-wide mb-2 text-gray-300'
										for='last-name'>
										Last Name
									</label>
									<input
										id='last_name'
										type='text'
										defaultValue={driver.last_name}
										disabled={props.disable}
										className={
											'appearance-none block w-full border bg-gray-100  rounded-full py-3 px-6 mb-3 leading-tight focus:outline-none focus:bg-white'
										}
									/>
								</div>
							</div>
							<div className='flex flex-wrap -mx-3 '>
								<div className='w-full md:w-1/2 px-3 mb-6 md:mb-0'>
									<label
										className='block tracking-wide mb-2 text-gray-300'
										for='email'>
										Email Address
									</label>
									<input
										id='email'
										type='email'
										defaultValue={driver.email}
										disabled={props.disable}
										className={
											'appearance-none block w-full border bg-gray-100  rounded-full py-3 px-6 mb-3 leading-tight focus:outline-none focus:bg-white'
										}
									/>
								</div>
								<div className='w-full md:w-1/2 px-3'>
									<label
										className='block tracking-wide text-gray-300 mb-2'
										for='mob'>
										Contact Number
									</label>

									<input
										type='text'
										disabled
										defaultValue={driver.phone_no ? driver.phone_no : null}
										className='appearance-none  block w-full  bg-gray-100 border border-gray-200 rounded-full py-3 px-6 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-200'
									/>
								</div>
							</div>

							<div className='flex flex-wrap -mx-3 '>
								{/* <div className='w-full md:w-1/2 px-3 mb-6 md:mb-0'>
									<label
										className='block tracking-wide mb-2 text-gray-300'
										for='gender'>
										Gender
									</label>
									<div className='relative'>
										<input
											id='gender'
											defaultValue={driver.gender}
											disabled={props.disable}
											className={
												'appearance-none block w-full border bg-gray-100  rounded-full py-3 px-6 mb-3 leading-tight focus:outline-none focus:bg-white'
											}
										/>
									</div>
								</div> */}
								<div className='w-full md:w-1/2 px-3 '>
									<label
										className='block tracking-wide text-gray-300 mb-2'
										for='dob'>
										D.O.B.
									</label>
									<input
										id='dob'
										disabled={props.disable}
										defaultValue={driver.dob}
										className={
											'appearance-none block w-full border bg-gray-100  rounded-full py-3 px-6 mb-3 leading-tight focus:outline-none focus:bg-white'
										}
									/>
								</div>
							</div>

							{/* <div className='flex flex-wrap -mx-3 '>
								<div className='w-full md:w-1/2 px-3 mb-6 md:mb-0'>
										<label
											className='block tracking-wide mb-2 text-gray-300'
											for='nationality'>
											Nationality
										</label>
										<div className='relative'>
											<input
												id='nationality'
												defaultValue={driver.nationality}
												disabled={props.disable}
												className={
													'appearance-none block w-full border bg-gray-100  rounded-full py-3 px-6 mb-3 leading-tight focus:outline-none focus:bg-white'
												}
											/>
										</div>
									</div>
									<div className='w-full md:w-1/2 px-3 mb-6 md:mb-0'>
										<label
											className='block tracking-wide mb-2 text-gray-300'
											for='nationality'>
											Nationality ID No
										</label>
										<div className='relative'>
											<input
												id='nationality'
												defaultValue={driver.passport_number}
												disabled={props.disable}
												className={
													'appearance-none block w-full border bg-gray-100  rounded-full py-3 px-6 mb-3 leading-tight focus:outline-none focus:bg-white'
												}
											/>
										</div>
									</div>
								
						
								<label className='w-full md:w-1/2 px-3 mb-6 md:mb-0'
									for='vehicle_type'>
									Nationality ID Proof
								</label>
								{driver && driver.passport_picture_url ? (
									driver.passport_picture_url.substr(driver.passport_picture_url.lastIndexOf('.') + 1) === 'pdf' ? (
										<iframe
										id='passport_picture_url' type="application/pdf"
										style={{
											minHeight: '200px',
											minWidth: '100%',
											backgroundColor: 'lightgray',
											textAlign: 'center',
											lineHeight: '190px',
										}}
										//src={vehicle && vehicle.image_url}
										src={driver && driver.passport_picture_url}
									/>
									) :
									<img
										id='passport_picture_url'
										style={{
											minHeight: '200px',
											minWidth: '100%',
											backgroundColor: 'lightgray',
											textAlign: 'center',
											lineHeight: '190px',
										}}
										src={driver && driver.passport_picture_url}
										accept='image/*'
									/>
								) : (
									<div
										style={{
											minHeight: '200px',
											minWidth: '100%',
											backgroundColor: 'lightgray',
											textAlign: 'center',
											lineHeight: '190px',
										}}>
										{' '}
										Upload vehicle image
									</div>
								)}
							</div> */}
							<label
								className='block tracking-wide mb-2 mt-5 text-gray-500 text-bold'
								style={{ fontSize: '20px', fontWeight: 'bold' }}
								for='address'>
								Address Details
							</label>

							<div className='w-full px-6 '>
								<div className='flex flex-wrap -mx-3 '>
									<div className='w-full md:w-1/2 px-3  md:mb-0'>
										<label
											className='block tracking-wide  text-gray-300'
											for='house_no'>
											House/building/apartment no
										</label>
										<input
											id='address_line1'
											defaultValue={address && address.address_line1}
											disabled={props.disable}
											className={
												'appearance-none block w-full border bg-gray-100  rounded-full py-3 px-6 mb-3 leading-tight focus:outline-none focus:bg-white'
											}
										/>
									</div>
									<div className='w-full md:w-1/2 px-3  md:mb-0'>
										<label
											className='block tracking-wide  text-gray-300'
											for='city'>
											City
										</label>
										<input
											id='city'
											defaultValue={address && address.city}
											disabled={props.disable}
											className={
												'appearance-none block w-full border bg-gray-100  rounded-full py-3 px-6 mb-3 leading-tight focus:outline-none focus:bg-white'
											}
										/>
									</div>
								</div>

								<div className='flex flex-wrap -mx-3 '>
									<div className='w-full md:w-1/2 px-3 mb-6 md:mb-0'>
										<label
											className='block tracking-wide mb-2 text-gray-300'
											for='street'>
											Street
										</label>
										<input
											id='street'
											defaultValue={address && address.street}
											disabled={props.disable}
											className={
												'appearance-none block w-full border bg-gray-100  rounded-full py-3 px-6 mb-3 leading-tight focus:outline-none focus:bg-white'
											}
										/>
									</div>
									<div className='w-full md:w-1/2 px-3 mb-6 md:mb-0'>
										<label
											className='block tracking-wide mb-2 text-gray-300'
											for='state'>
											State
										</label>
										<input
											id='state'
											defaultValue={address && address.state}
											disabled={props.disable}
											className={
												'appearance-none block w-full border bg-gray-100  rounded-full py-3 px-6 mb-3 leading-tight focus:outline-none focus:bg-white'
											}
										/>
									</div>
								</div>
								<div className='w-full md:w-1/2 px-3  md:mb-0'>
									<label
										className='block tracking-wide mb-2 text-gray-300'
										for='postal_code'>
										Zip code
									</label>
									<input
										id='postal_code'
										defaultValue={address && address.postal_code}
										disabled={props.disable}
										className={
											'appearance-none block w-full border bg-gray-100  rounded-full py-3 px-6 mb-3 leading-tight focus:outline-none focus:bg-white'
										}
									/>
								</div>
							</div>

							<label
								className='block tracking-wide mb-2 mt-8 text-gray-300'
								style={{ fontSize: '20px', fontWeight: 'bold' }}
								for='vehicles'>
								Vehicle Details
							</label>
							<div className='w-full px-6 '>
								{/* <label
									className='block tracking-wide mb-2 text-gray-300'
									for='vehicle_type'>
									Vehicle type
								</label>
								<div className='relative'>
									<input
										id='vehicle_type'
										defaultValue={vehicle && vehicle.vehicle_type}
										disabled={props.disable}
										className={
											'appearance-none block w-full border bg-gray-100  rounded-full py-3 px-6 mb-3 leading-tight focus:outline-none focus:bg-white'
										}
									/>
								</div>
								{vehicle && vehicle.image_url ? (
									vehicle.image_url.substr(vehicle.image_url.lastIndexOf('.') + 1) === 'pdf' ? (
										<iframe
										id='vehicle_image_url' type="application/pdf"
										style={{
											minHeight: '100%',
											minWidth: '100%',
											backgroundColor: 'lightgray',
											textAlign: 'center',
											lineHeight: '190px',
										}}
										//src={vehicle && vehicle.image_url}
										src={vehicle && vehicle.image_url}
									/>
									) :
									<img
										id='vehicle_image_url'
										style={{
											minHeight: '200px',
											minWidth: '100%',
											backgroundColor: 'lightgray',
											textAlign: 'center',
											lineHeight: '190px',
										}}
										src={vehicle && vehicle.image_url}
										accept='image/*'
									/>
								) : (
									<div
										style={{
											minHeight: '200px',
											minWidth: '100%',
											backgroundColor: 'lightgray',
											textAlign: 'center',
											lineHeight: '190px',
										}}>
										{' '}
										Upload vehicle image
									</div>
								)} */}

								<div className='flex flex-wrap -mx-3 mt-6 mb-6'>
									<div className='w-full md:w-1/2 px-3 mb-6 md:mb-0'>
										<label
											className='block tracking-wide mb-2 text-gray-300'
											for='license'>
											License number
										</label>
										<input
											id='license_number'
											defaultValue={vehicle && vehicle.license_number}
											disabled={props.disable}
											className={
												'appearance-none block w-full border bg-gray-100  rounded-full py-3 px-6 mb-3 leading-tight focus:outline-none focus:bg-white'
											}
										/>
										{vehicle && vehicle.license_image_url ? (
											vehicle.license_image_url.substr(vehicle.license_image_url.lastIndexOf('.') + 1) === 'pdf' ? (
												<iframe
												id='licence_image_url' type="application/pdf"
												style={{
													maxHeight: '400px',
													maxWidth: '500px',
													backgroundColor: 'lightgray',
													textAlign: 'center',
													lineHeight: '190px',
												}}
												title="licence_image_url_pdf"
												//src={vehicle && vehicle.image_url}
												src={vehicle && vehicle.license_image_url}
											/>
											) :
											<img
												id='licence_image_url'
												style={{
													maxHeight: '200px',
													maxWidth: '375px',
													backgroundColor: 'lightgray',
													textAlign: 'center',
													lineHeight: '190px',
													border: '1px solid black',
												}}
												alt='upload license...'
												src={vehicle && vehicle.license_image_url}
												accept='image/*'
											/>
										) : (
											<div
												style={{
													maxHeight: '200px',
													maxWidth: '375px',
													backgroundColor: 'lightgray',
													textAlign: 'center',
													lineHeight: '190px',
												}}>
												{' '}
												Upload license image
											</div>
										)}
									</div>
									<div className='w-full md:w-1/2 w-11rem px-3 mb-6 md:mb-0'>
										<label
											className='block tracking-wide mb-2 text-gray-300'
											for='insurance'>
											Insurance number
										</label>
										<input
											id='insurance_number'
											defaultValue={vehicle && vehicle.insurance_number}
											disabled={props.disable}
											className={
												'appearance-none block w-full border bg-gray-100  rounded-full py-3 px-6 mb-3 leading-tight focus:outline-none focus:bg-white'
											}
										/>
										{/* {vehicle && vehicle.insurance_image_url ? (
											vehicle.insurance_image_url.substr(vehicle.insurance_image_url.lastIndexOf('.') + 1) === 'pdf' ? (
												<iframe
												id='insurance_image_url' type="application/pdf"
												style={{
													minHeight: '200px',
													minWidth: '100%',
													backgroundColor: 'lightgray',
													textAlign: 'center',
													lineHeight: '190px',
												}}
												//src={vehicle && vehicle.image_url}
												src={vehicle && vehicle.insurance_image_url}
											/>
											) :
											<img
												id='insurance_image_url'
												style={{
													minHeight: '200px',
													minWidth: '100%',
													backgroundColor: 'lightgray',
													textAlign: 'center',
													lineHeight: '190px',
													border: '1px solid black',
												}}
												alt='upload insurance image...'
												src={vehicle && vehicle.insurance_image_url}
											/>
										) : (
											<div
												style={{
													minHeight: '200px',
													minWidth: '100%',
													backgroundColor: 'lightgray',
													textAlign: 'center',
													lineHeight: '190px',
												}}>
												{' '}
												Upload insurance image
											</div>
										)} */}
									</div>
								</div>
								<div className='flex flex-wrap -mx-3 mb-6'>
									<div className='w-full md:w-1/2 px-3 mb-6 md:mb-0'>
										<label
											className='block tracking-wide mb-2 text-gray-300'
											for='plate_no'>
											Plate number
										</label>
										<input
											id='plate_number'
											defaultValue={vehicle && vehicle.plate_number}
											disabled={props.disable}
											className={
												'appearance-none block w-full border bg-gray-100  rounded-full py-3 px-6 mb-3 leading-tight focus:outline-none focus:bg-white'
											}
										/>
									</div>
									<div className='w-full md:w-1/2 px-3 mb-6 md:mb-0'>
										<label
											className='block tracking-wide mb-2 text-gray-300'
											for='modal'>
											Vehicle make & model
										</label>
										<input
											id='vehicle_model'
											defaultValue={vehicle && vehicle.vehicle_model}
											disabled={props.disable}
											className={
												'appearance-none block w-full border bg-gray-100  rounded-full py-3 px-6 mb-3 leading-tight focus:outline-none focus:bg-white'
											}
										/>
									</div>
								</div>
							</div>
						</form>
					</div>
				</div>
			)}
		</>
	);
};

export default DriverForm;
