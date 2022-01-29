import React, { useState ,useEffect} from 'react';
import SearchBox from '../../globalComponent/layout/search';
import Select from 'react-select';
import { useDispatch, useSelector } from 'react-redux';
import { clearData } from '../../actions';
import { useLocation } from 'react-router';
import { DatePicker, TimePicker } from 'antd';
import moment from 'moment';


const SearchComponent = (props) => {
	const dispatch = useDispatch();
	
	const customStyles = {
		control: (provided, state) => ({
			...provided,
			backgroundColor: '#fafafa',
			borderColor: 'grey',
			borderRadius: '0'
		}),
		container: (provided, state) => ({
			...provided,
			width: '100%',
		}),
	};

	const { pathname } = useLocation();
	// let [isFiltered, setIsFiltered] = useState();
	// var propsFilter = true;	

	// useEffect(() => {
			
	// 	if (props.id != isFiltered) {
	// 		setIsFiltered(props.id);
	// 		propsFilter = false
	// 	}
	// }, []);

	const val = useSelector((state) => state.auth.searchText);
	let searchText = val ? val : '';

	const startval = useSelector((state) => state.auth.startDate);
	// let startDate = propsFilter == false ? '' : startval ? startval : '';
	let startDate = startval ? startval : '';

	const endval = useSelector((state) => state.auth.endDate);
	// let endDate = propsFilter == false ? '' : endval ? endval : '';
    let endDate = endval ? endval : '';
	
	const res = useSelector((state) => state.auth.filterBy);
	// let filterby = propsFilter == false ? '' : res ? res : '';
	let filterby = res ? res : '';


	  function disabledFromDate(current) {
		// Can not select days before today and today
		if(endDate)
		{
			return current > moment(endDate, 'MM/DD/YYYY')
		}
		else
		{
			return current && current > moment().endOf('day');
		}
	  }

	  function disabledToDate(current) {
		// Can not select days before today and today
		if(startDate)
		{
			return (current < moment(startDate, 'MM/DD/YYYY')  ||  current > moment().endOf('day'))
		}
		else
		{
			return current && current > moment().endOf('day');
		}
	  }


	return (
		<div style={{ backgroundColor: '#d3d3d3', marginTop: '20px'}} className='main-content px-2 '>
			<div style={{display:"flex", flexDirection:"column",padding:"0.5rem"}}>
				<div style={{display:"flex",width:"100%"}}>
					<div  style={{width:"50%"}}>
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
					<div style={{display:"flex",width:"50%", justifyContent:"space-evenly"}}>
						<div  style={{width:"20%",textAlign:"right"}}>
							<p className="mt-1">Filter By:</p>
						</div>
						<div  style={{display:"flex",width:"75%"}}>
								<Select
									value={filterby}
									styles={customStyles}
									menuPlacement='auto'
									options={(pathname == '/hotspotEarning') || (pathname == '/pickupEarning') || (pathname =='/restaurantPayment')?
										[
											{
												label: 'Daily',
												value: 'Daily',
											},
											{
												label: 'Weekly',
												value: 'Weekly',
											},
											{
												label: 'Monthly',
												value: 'Monthly',
											},
											{
												label: 'Yearly',
												value: 'Yearly',
											},
										] : [
											{
												label: 'Monthly',
												value: 'Monthly',
											},
											{
												label: 'Yearly',
												value: 'Yearly',
											},
										]
									}
									inputId={'monthly'}
									placeholder={'Select the filter'}
									onChange={(selectedValue) => {
										dispatch({
											type: 'FILTER_BY',
											payload: selectedValue,
										});
									}}
								/>
						</div>
					</div>
				</div>
				<div style={{display:"flex",width:"100%", marginTop:"0.5rem"}}>
					<div style={{display:"flex",width:"50%", justifyContent:"center"}}>
						<div style={{display:"flex",width:"50%", justifyContent:"space-evenly"}}>
							<div style={{width:"20%",textAlign:"right"}}>
								<p className='mt-1'>From:</p>
							</div>
							<div style={{width:"70%"}}>
								<DatePicker
											onChange={(date, dateString) => {
												dispatch({
													type: 'START_DATE_FILTER',
													payload: dateString,
												});
											}}
											format="MM/DD/YYYY"
											disabledDate={disabledFromDate}
											value={startDate && moment(startDate, 'MM/DD/YYYY')}
											style={{ width: '100%',height:"38px" }} id='startDate'
											type='date'
										/>
							</div>
						</div>
						<div style={{display:"flex",width:"50%", justifyContent:"space-evenly"}}>
							<div style={{width:"20%",textAlign:"right"}}>
								<p className='mt-1'>To:</p>
							</div>
							<div style={{width:"70%"}}>
									<DatePicker
										onChange={(date, dateString) => {
											dispatch({
												type: 'END_DATE_FILTER',
												payload: dateString,
											});
										}}
										style={{ width: '100%',height:"38px" }} id='endDate'
										
										format="MM/DD/YYYY"
										disabledDate={disabledToDate}
										value={
											endDate &&
											moment(endDate, 'MM/DD/YYYY')
										}
									/>
							</div>
						</div>
					</div>
					<div style={{display:"flex",width:"50%", justifyContent:"center",}}>
						<div>							
							<button
								onClick={props.handleSearch}
								className='shadow bg-blue-500 hover:bg-blue-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded'
								type='button'>
								Search
							</button>
						</div>
						<div style={{marginLeft:"2rem"}}>
							<button
								onClick={() => {
									dispatch(clearData(props.handleSearch));
									if(props.clearSearchAndFilter) props.clearSearchAndFilter();
									
								}}
								className='shadow bg-blue-500 hover:bg-blue-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded'
								type='button'>
								Clear
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default SearchComponent;
