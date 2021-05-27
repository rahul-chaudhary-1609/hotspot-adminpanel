import React from 'react';
import SearchBox from '../../globalComponent/layout/search';
import Select from 'react-select';
import { useDispatch, useSelector } from 'react-redux';
import { clearData } from '../../actions';

const SearchComponent = (props) => {
	const dispatch = useDispatch();
	const customStyles = {
		control: (provided, state) => ({
			...provided,
			backgroundColor: '#fafafa',
			borderColor: 'grey',
		}),
		container: (provided, state) => ({
			...provided,
			width: '100%',
		}),
	};

	const val = useSelector((state) => state.auth.searchText);
	let searchText = val ? val : '';

	const startval = useSelector((state) => state.auth.startDate);
	let startDate = startval ? startval : '';

	const endval = useSelector((state) => state.auth.endDate);
	let endDate = endval ? endval : '';

	const res = useSelector((state) => state.auth.filterBy);
	let filterby = res ? res : '';

	return (
		<div style={{ backgroundColor: 'pink' }} className='main-content px-2 '>
			<div className='flex w-full'>
				<div className='px-3 mb-6   mt-6' style={{ width: '30%' }}>
					<SearchBox
						placeholder={props.placeholder}
						setSearchText={(val) => {
							dispatch({
								type: 'SEARCH_TEXT',
								payload: val,
							});
						}}
						searchText={searchText}
					/>
				</div>
				<div className='flex w-1/2'>
					<p
						style={{
							fontSize: '20px',
							marginTop: '25px',
							marginRight: '10px',
							marginLeft: '20px',
						}}>
						Filter by -
					</p>

					<div
						style={{
							display: 'flex',
							marginTop: '20px',
							width: '50%',
							marginLeft: '30px',
						}}>
						<Select
							value={filterby}
							styles={customStyles}
							menuPlacement='auto'
							options={props.adminEarningPage == true ?[
								{
									label: 'Daily',
									value: 'Daily',
								},
								{
									label: 'Weekely',
									value: 'Weekely',
								},
								{
									label: 'Monthly',
									value: 'Monthly',
								},
								{
									label: 'Yearly',
									value: 'Yearly',
								},
							]:
							[
								{
									label: 'Monthly',
									value: 'Monthly',
								},
								{
									label: 'Yearly',
									value: 'Yearly',
								},
							]}
							inputId={'monthly'}
							placeholder={'Select the filter...'}
							onChange={(selectedValue) => {
								dispatch({
									type: 'FILTER_BY',
									payload: selectedValue,
								});
							}}
						/>
					</div>
				</div>
				<button
					style={{ height: '3rem', marginTop: '15px', marginLeft: '10%' }}
					onClick={props.handleSearch}
					className='shadow bg-blue-500 ml-3 hover:bg-blue-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded'
					type='button'>
					Search
				</button>
				<button
					style={{ height: '3rem', marginTop: '15px' }}
					onClick={() => {
						dispatch(clearData(props.handleSearch));
						
					}}
					className='shadow bg-blue-500 ml-3 hover:bg-blue-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded'
					type='button'>
					Clear
				</button>
			</div>
			<div style={{ marginTop: '-25px', display: 'flex', marginLeft: '32%' }}>
				<p
					style={{
						fontSize: '20px',
						marginTop: '25px',
						marginRight: '10px',
						marginLeft: '-17px',
					}}>
					Filter by date
				</p>
				<div className='flex'>
					<div style={{ display: 'flex', marginTop: '20px' }}>
						<input
							onChange={(e) => {
								dispatch({
									type: 'START_DATE_FILTER',
									payload: e.target.value,
								});
							}}
							value={startDate}
							style={{ width: '40%' }}
							className='appearance-none block w-half bg-gray-100 ml-2 border border-gray-100 rounded-full py-3 px-6 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-200'
							id='dob'
							type='date'
						/>
						<p style={{ fontSize: '20px', marginLeft: '15px' }}> To </p>
						<input
							onChange={(e) => {
								dispatch({
									type: 'END_DATE_FILTER',
									payload: e.target.value,
								});
							}}
							style={{ width: '40%' }}
							className='appearance-none block  bg-gray-100 ml-2 border border-gray-100 rounded-full py-3 px-6 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-200'
							id='dob'
							type='date'
							value={endDate}
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default SearchComponent;
