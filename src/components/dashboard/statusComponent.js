import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Piechart from '../../globalComponent/layout/piechart.js';
import { getOrderStatus, getRevenueStats } from '../../api';

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
			const res = await getOrderStatus(token);
			if (res.status == 200) {
				setOrderStatusDetails(res);
			}
		} catch (error) {
			console.log(error);
		}
	};
	const revenueStatus = async () => {
		try {
			const res = await getRevenueStats(token);
			if (res.status == 200) {
				setRevenueStatusDetails(res);
			}
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className='flex mt-5'>
			<div className='w-1/2 bg-white' style={{height: '300px'}}>
				<h2
					style={{
						width: '100%',
						padding: '10px',
						fontSize: '30px',
						backgroundColor: 'lightgrey',
					}}>
					Orders
				</h2>
				{orderStatusDetails && (
					<div className='flex'>
						<Piechart
							contentStyle={{
								marginTop: '-120px',
								marginLeft: '50px',
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
							<h1>Order Count : {props.totalOrders}</h1>
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
						width: '100%',
						padding: '10px',
						fontSize: '30px',
						backgroundColor: 'lightgrey',
					}}>
					Earnings
				</h2>
				{revenueStatusDetails && (
					<div style={{display: 'flex', marginTop: '10px'}}>
						
						<Piechart
							content={'Total'}
							subContent={`${revenueStatusDetails.totalRevenue}$`}
							contentStyle={{
								marginTop: '-120px',
								marginLeft: '67px',
								fontSize: '15px',
								fontWeight: 'bold',
							}}
							subContentStyle={{
								marginTop: '3px',
								marginLeft: '50px',
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
