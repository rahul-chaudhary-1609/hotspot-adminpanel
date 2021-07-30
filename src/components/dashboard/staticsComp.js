import React, { useEffect, useState } from 'react';
import GlobalCard from '../../globalComponent/layout/card';
import {
	getTotalCustomers,
	getTotalDrivers,
	getTotalOrders,
	getTotalDriversViaHotspot,
	getTotalCustomersViaHotspot,
	getProcessingOrdersViaHotspot,
	getCompletedOrdersViaHotspot,
	getOrdersViaHotspot,
	getTotalCompletedOrders,
	getTotalProcessingOrders,
	getTotalHotspots,
	getTotalEarning,
	getEarningsViaHotspot,
} from '../../api';
import { useSelector } from 'react-redux';



const StaticsComponent = (props) => {
	const hotspotId = props.selectedHotspot && props.selectedHotspot.value;
	const token = useSelector((state) => state.auth.isSignedIn);

	const [totalCustomers, setTotalCustomers] = useState(null);
	const [totalDrivers, setTotalDrivers] = useState(null);
	const [totalHotspots, setTotalHotspots] = useState(null);
	const [totalEarnings, setTotalEarnings] = useState(null);

	
	const [totalProcessingOrders, setTotalProcessingOrders] = useState(null);
	
	useEffect(() => {
		if (hotspotId) {
			totalCustomersViaHotspot();
			totalDriversViaHotspot();
			totalOrdersViaHotspot();
			totalProcessingOrdersViaHotspot();
			totalCompletedOrdersViaHotspot();
			totalEarningsViaHotspot();
			setTotalHotspots(1);
		} else {
			TotalCustomers();
			TotalDrivers();
			TotalOrders();
			TotalProcessingOrders();
			TotalCompletedOrders();
			TotalHotspots();
			TotalEarnings();
		}
	}, [hotspotId]);

	const TotalCustomers = async () => {
		try {
			const res = await getTotalCustomers(token);
			if (res.status == 200) {
				setTotalCustomers(res.numberOfCustomer);
			}
		} catch (error) {
			console.log(error);
		}
	};
	const TotalDrivers = async () => {
		try {
			const res = await getTotalDrivers(token);
			if (res.status == 200) {
				setTotalDrivers(res.numberOfDrivers);
			}
		} catch (error) {
			console.log(error);
		}
	};
	const TotalOrders = async () => {
		try {
			const res = await getTotalOrders(token);
			if (res.status == 200) {
				props.setTotalOrders(res.numberOfOrders);
			}
		} catch (error) {
			console.log(error);
		}
	};
	const TotalProcessingOrders = async () => {
		try {
			const res = await getTotalProcessingOrders(token);
			if (res.status == 200) {
				setTotalProcessingOrders(res.numberOfProcessingOrders);
			}
		} catch (error) {
			console.log(error);
		}
	};
	const TotalCompletedOrders = async () => {
		try {
			const res = await getTotalCompletedOrders(token);
			if (res.status == 200) {
				props.setTotalCompletedOrders(res.numberOfCompletedOrders);
			}
		} catch (error) {
			console.log(error);
		}
	};
	const TotalHotspots = async () => {
		try {
			const res = await getTotalHotspots(token);
			if (res.status == 200) {
				setTotalHotspots(res.numberOfHotspots);
			}
		} catch (error) {
			console.log(error);
		}
	};
	const TotalEarnings = async () => {
		try {
			const res = await getTotalEarning(token);
			if (res.status == 200) {
				setTotalEarnings(res.totalRevenue);
			}
		} catch (error) {
			console.log(error);
		}
	};

	const totalCustomersViaHotspot = () => {
		getTotalCustomersViaHotspot(token, hotspotId)
			.then((customers) => {
				setTotalCustomers(customers.numberOfCustomer);
			})
			.catch((error) => {
				console.log(error);
			});
	};
	const totalDriversViaHotspot = () => {
		getTotalDriversViaHotspot(token, hotspotId)
			.then((drivers) => {
				setTotalDrivers(drivers.numberOfDriver);
			})
			.catch((error) => {
				console.log(error);
			});
	};
	const totalOrdersViaHotspot = () => {
		getOrdersViaHotspot(token, hotspotId)
			.then((order) => {
				props.setTotalOrders(order.numberOfOrders);
			})
			.catch((error) => {
				console.log(error);
			});
	};
	const totalProcessingOrdersViaHotspot = () => {
		getProcessingOrdersViaHotspot(token, hotspotId)
			.then((order) => {
				setTotalProcessingOrders(order.numberOfProcessingOrders);
			})
			.catch((error) => {
				console.log(error);
			});
	};
	const totalCompletedOrdersViaHotspot = () => {
		getCompletedOrdersViaHotspot(token, hotspotId)
			.then((order) => {
				props.setTotalCompletedOrders(order.numberOfCompletedOrders);
			})
			.catch((error) => {
				console.log(error);
			});
	};
	const totalEarningsViaHotspot = () => {
		getEarningsViaHotspot(token, hotspotId)
			.then((order) => {
				setTotalEarnings(order.totalRevenue);
			})
			.catch((error) => {
				console.log(error);
			});
	};

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
						count={totalEarnings}
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
