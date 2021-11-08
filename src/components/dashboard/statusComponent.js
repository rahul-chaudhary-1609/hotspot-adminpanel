import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Piechart from '../../globalComponent/layout/piechart.js';
import { getOrderStats, getRevenueStats } from '../../api';
import moment from 'moment';

const StatusComponent = (props) => {
	const token = useSelector((state) => state.auth.isSignedIn);

	const [orderStatusDetails, setOrderStatusDetails] = useState(null);
	const [revenueStatusDetails, setRevenueStatusDetails] = useState(null);

	useEffect(() => {
		orderStatus();
		revenueStatus();
	}, []);

	const orderStatus = async () => {
		try {
			let data={
				query:{
					current_date:moment(new Date()).format("YYYY-MM-DD")
				}
			}
			const res = await getOrderStats(token,data);
			if (res.status == 200) {
				setOrderStatusDetails(res);
			}
		} catch (error) {
			console.log(error);
		}
	};
	const revenueStatus = async () => {
		try {
			let data={
				query:{
					current_date:moment(new Date()).format("YYYY-MM-DD")
				}
			}
			const res = await getRevenueStats(token,data);
			if (res.status == 200) {
				setRevenueStatusDetails(res);
			}
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className='flex mt-5' style={{height :280}}>
			<div className='w-1/2 bg-white'>
				<h2
					style={{
						width: '50%',
						padding: '10px',
						backgroundColor: 'pink',
					}}>
					{' '}
					Orders
				</h2>
				{orderStatusDetails && (
					<div className='flex'>
						<Piechart
							contentStyle={{
								marginTop: '-120px',
								marginLeft: '45px',
								fontSize: '15px',
								fontWeight: 'bold',
							}}
							subContentStyle={{
								marginTop: '3px',
								marginLeft: '58px',
								fontSize: '14px',
								fontWeight: 'bold',
							}}
							content={'Completed'}
							subContent={`${orderStatusDetails.completedOrderPercentage}% (${props.totalCompletedOrders})`}
							data={[
								{
									title: 'Today',
									value: orderStatusDetails.numberOfTodayOrders,
									color: 'green',
								},
								{
									title: 'This month',
									value: orderStatusDetails.numberOfMonthlyOrders,
									color: '#20BF9F',
								},
								{
									title: 'This year',
									value: orderStatusDetails.numberOfYearlyOrders,
									color: '#E38217',
								},
							]}

							// style={{ marginLeft: '10px', fontSize: '16px' }}
						/>
						<div style={{ marginTop: '50px', fontSize: '20px' }}>
							<h1>Order Count : {orderStatusDetails.numberOfTotalOrders}</h1>
							<h1>
								{' '}
								<span style={{ color: 'green', fontWeight:'bold'  }}>Today</span> :{' '}
								{orderStatusDetails.numberOfTodayOrders}
							</h1>
							<h1>
								{' '}
								<span style={{ color: '#20BF9F', fontWeight:'bold'  }}> This Month </span> :{' '}
								{orderStatusDetails.numberOfMonthlyOrders}
							</h1>
							<h1>
								{' '}
								<span style={{ color: '#E38217', fontWeight:'bold'  }}>This Year </span>:{' '}
								{orderStatusDetails.numberOfYearlyOrders}
							</h1>
						</div>
					</div>
				)}
			</div>
			<div
				style={{
					width: '50%',
					backgroundColor: 'white',
					marginLeft: '20px',
				}}>
				<h2
					style={{
						width: '50%',
						padding: '10px',
						backgroundColor: 'pink',
					}}>
					{' '}
					Earnings
				</h2>
				{revenueStatusDetails && (
					<div style={{display: 'flex', marginTop: '10px'}}>
						
						<Piechart
							content={'Total'}
							subContent={`${revenueStatusDetails.totalRevenue}$`}
							contentStyle={{
								marginTop: '-120px',
								marginLeft: '64px',
								fontSize: '15px',
								fontWeight: 'bold',
							}}
							subContentStyle={{
								marginTop: '3px',
								marginLeft: '60px',
								fontSize: '14px',
								fontWeight: 'bold',
							}}
							data={[
								{
									title: 'Today',
									value: revenueStatusDetails.todayRevenue,
									color: 'green',
								},
								{
									title: 'This month',
									value: revenueStatusDetails.monthlyRevenue,
									color: '#20BF9F',
								},
								{
									title: 'This year',
									value: revenueStatusDetails.yearlyRevenue,
									color: '#E38217',
								},
							]}
							style={{ marginLeft: '10px', fontSize: '16px' }}
						/>
						<div style={{ marginTop: '50px', fontSize: '20px' }}>
							<h1>
								{' '}
								<span style={{ color: 'green', fontWeight:'bold' }}>Today</span> :{' '}
								{revenueStatusDetails.todayRevenue} $
							</h1>
							<h1>
								<span style={{ color: '#20BF9F', fontWeight:'bold'  }}> This Month </span> :{' '}
								{revenueStatusDetails.monthlyRevenue} $
							</h1>
							<h1>
								<span style={{ color: '#E38217', fontWeight:'bold'  }}>This Year </span>:{' '}
								{revenueStatusDetails.yearlyRevenue} $
							</h1>
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default StatusComponent;
