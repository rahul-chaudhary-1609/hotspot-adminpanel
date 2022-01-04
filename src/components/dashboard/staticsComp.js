import React, { useEffect, useState } from 'react';
import GlobalCard from '../../globalComponent/layout/card';
import {
	getSiteStatistics,
	getOrderStatistics
} from '../../api';
import { useSelector } from 'react-redux';
import moment from 'moment';



const StaticsComponent = (props) => {
	const hotspotId = props.selectedHotspot && props.selectedHotspot.value;
	const token = useSelector((state) => state.auth.isSignedIn);

	const [totalCustomers, setTotalCustomers] = useState(null);
	const [totalDrivers, setTotalDrivers] = useState(null);
	const [totalHotspots, setTotalHotspots] = useState(null);
	const [totalEarnings, setTotalEarnings] = useState(null);

	
	const [totalProcessingOrders, setTotalProcessingOrders] = useState(null);
	
	useEffect(() => {
		try {
			let data={
				query:{
					current_date:moment(new Date()).format("YYYY-MM-DD"),
				}
			}
			if(hotspotId){
				data.query.hotspot_id=hotspotId;
			}

			getSiteStatistics(token,data)
			.then((res)=>{
				if (res.status == 200) {
					setTotalCustomers(res.customerCount);
					setTotalDrivers(res.driverCount);
					setTotalHotspots(hotspotId?1:res.hotspotCount);
					setTotalEarnings(res.totalRevenue);
				}
			})
			getOrderStatistics(token,data)
			.then((res)=>{
				if (res.status == 200) {
					props.setTotalOrders(res.orderCount);
					setTotalProcessingOrders(res.proccessingOrderCount);
					props.setTotalCompletedOrders(res.completedOrderCount);
				}
			})
			
		} catch (error) {
			console.log(error);
		}
	}, [hotspotId]);

	return (
		<div className='flex mt-5'>
			<div
				style={{
					width: '50%',
					backgroundColor: 'white',
				}}>
				<h2
					style={{
						width: '50%',
						padding: '10px',
						backgroundColor: 'pink',
					}}>
					{' '}
					Site Statistics
				</h2>
				<div className='flex'>
					<GlobalCard
						count={totalCustomers}
						message='Total Users'
						cardColor='skyblue'
					
					/>
					<GlobalCard
						count={totalDrivers}
						message='Total Drivers'
						cardColor='#F3AB6F'
						
					/>
				</div>

				<div className='flex'>
					<GlobalCard
						count={totalHotspots}
						message='Total Hotspot'
						cardColor='pink'
						card="building"
						
					/>
					<GlobalCard
						count={Number(totalEarnings).toFixed(2)}
						message='Total Earnings'
						cardColor='#A2BC13'
						card ="earning"
						iconColor='gray-200'
					/>
				</div>
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
					Order Statistics
				</h2>
				<div className='flex'>
					<GlobalCard
						count={props.totalOrders}
						message='Total Orders'
						cardColor='skyblue'
						iconColor='white-500'
						card="cube"
					/>
					<GlobalCard
						count={totalProcessingOrders}
						message='Proccessing Orders'
						cardColor='#F3AB6F'
						iconColor='white-200'
						card="processingOrder"
					/>
				</div>

				<div className='flex'>
					<GlobalCard
						count={props.totalCompletedOrders}
						message='Completed Orders'
						cardColor='#A2BC13'
						card ="completeOrder"
						iconColor='gray-200'
					/>
				</div>
			</div>
		</div>
	);
};

export default StaticsComponent;
