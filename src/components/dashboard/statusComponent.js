import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Piechar from '../../globalComponent/layout/piechart.js';
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
					<div style={{display:"flex",justifyContent:"space-evenly"}}>
						<div>
							<Piechar
								content={`${orderStatusDetails.completedOrderPercentage}% (${props.totalCompletedOrders})`}
								COLORS = {orderStatusDetails.numberOfYearlyOrders?['green', '#20BF9F', '#E38217']:['rgba(0,0,0,0.1)']}
								data={[
									{
										name: 'Today',
										value: orderStatusDetails.numberOfTodayOrders,
									},
									{
										name: 'This month',
										value: orderStatusDetails.numberOfMonthlyOrders,
									},
									{
										name: 'This year',
										value: orderStatusDetails.numberOfYearlyOrders,
									},
								]}
							/>
						</div>
						<div style={{ marginTop:"30px",  fontSize: '20px',display:"flex", flexDirection:"column",alignContent:"space-evenly" }}>
							<div>
								<h1>Order Count : {orderStatusDetails.numberOfTotalOrders}</h1>
							</div>
							<div>
								<h1>
									{' '}
									<span style={{ color: 'green', fontWeight:'bold'  }}>Today</span> :{' '}
									{orderStatusDetails.numberOfTodayOrders}
								</h1>
							</div>
							<div>
								<h1>
									{' '}
									<span style={{ color: '#20BF9F', fontWeight:'bold'  }}> This Month </span> :{' '}
									{orderStatusDetails.numberOfMonthlyOrders}
								</h1>
							</div>
							<div>
								<h1>
									{' '}
									<span style={{ color: '#E38217', fontWeight:'bold'  }}>This Year </span>:{' '}
									{orderStatusDetails.numberOfYearlyOrders}
								</h1>
							</div>
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
					<div style={{display: 'flex', marginTop: '10px',justifyContent:"space-evenly"}}>
						<div>						
							<Piechar
								content={`$${revenueStatusDetails.totalRevenue}`}
								COLORS = {revenueStatusDetails.yearlyRevenue && revenueStatusDetails.yearlyRevenue>0?['green', '#20BF9F', '#E38217']:['rgba(0,0,0,0.1)']}
								data={revenueStatusDetails.yearlyRevenue && revenueStatusDetails.yearlyRevenue>0?[
									{
										name: 'Today',
										value: revenueStatusDetails.todayRevenue,
									},
									{
										name: 'This month',
										value: revenueStatusDetails.monthlyRevenue,
									},
									{
										name: 'This year',
										value: revenueStatusDetails.yearlyRevenue,
									},
								]:[
									{
										name: 'Today',
										value: 1,
									},
									{
										name: 'This month',
										value: 1,
									},
									{
										name: 'This year',
										value: 1,
									},
								]}
							/>
						</div>
						<div style={{ marginTop:"30px",fontSize: '20px',display:"flex", flexDirection:"column",alignContent:"space-evenly" }}>
							<div>
								<h1>
									{' '}
									<span style={{ color: 'green', fontWeight:'bold' }}>Today</span> :{' '}
									{revenueStatusDetails.todayRevenue} $
								</h1>
							</div>
							<div>
								<h1>
									<span style={{ color: '#20BF9F', fontWeight:'bold'  }}> This Month </span> :{' '}
									{revenueStatusDetails.monthlyRevenue} $
								</h1>
							</div>
							<div>
								<h1>
									<span style={{ color: '#E38217', fontWeight:'bold'  }}>This Year </span>:{' '}
									{revenueStatusDetails.yearlyRevenue} $
								</h1>
							</div>
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default StatusComponent;
