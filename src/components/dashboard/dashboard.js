import React, { useEffect, useState } from 'react';
import { getListHotspots,getHotspot } from '../../api.js';
import { useSelector } from 'react-redux';
import GoogleMap from './googleMap.js';
import StaticsComponent from './staticsComp.js';
import CustomSelect from '../../globalComponent/layout/select.js';
import StatusComponent from './statusComponent.js';

function Dashboard({ history, ...props }) {
	const token = useSelector((state) => state.auth.isSignedIn);

	const [markerLists, setMarkerLists] = useState(null);
	const [hotspotList, setHotspotList] = useState(null);
	const [selectedHotspot, setSelectedHotspot] = useState(null);
	const [mapShow, setMapShow] = useState(false);

	const [totalOrders, setTotalOrders] = useState(null);
	const [totalCompletedOrders, setTotalCompletedOrders] = useState(null);

	useEffect(() => {
		hotspotLists();
	}, []);

	const hotspotLists = () => {
		getListHotspots(token)
			.then((hotspots) => {
				let markers = [];
				hotspots.hotspotList.rows.map((hotspot) => {
					markers.push([
						hotspot.locationDetail,
						hotspot.location[0],
						hotspot.location[1],
					]);
				});
				setMarkerLists(markers);
				setMapShow(true);
				let hotSpots = hotspots.hotspotList.rows.reduce(
					(acc, curr) => {
						return acc.concat({
							label: curr.name,
							value: curr.id,
						});
					},
					[
						{
							label: 'Select All Hotspots ',
							value: '',
						},
					]
				);

				setHotspotList(hotSpots);
			})
			.catch((error) => {
				console.log(error);
			});
	};

	useEffect(() => {
		if (selectedHotspot) {
			let hotspotId = selectedHotspot.value;
			setMapShow(false);
			if (hotspotId) {
				let data={
					params:{
						hotspotLocationId:hotspotId
					}
				}
				getHotspot(token, data)
					.then((hotspot) => {
						let { location, location_detail } = hotspot.hotspotDetails;
						let markers = [];
						markers.push([location_detail, location[0], location[1]]);
						setMarkerLists(markers);
						setMapShow(true);
					})
					.catch((error) => console.log(error));
			} else {
				hotspotLists();
			}
		}
	}, [selectedHotspot]);
	return (
		<>
			<div
				className='main-content pb-16 md:pb-5 flex-1 pt-20 px-2'
				style={{ overflowY: 'scroll', height: '100vh' }}>
				{mapShow ? (
					<GoogleMap {...{ markerLists }} />
				) : (
					<div
						style={{
							// height: '300px',
							// width: '100%',
							// backgroundColor: 'lightgray',
							textAlign: 'center',
							// lineHeight: '190px',
						}}>
						{' '}
						Loading the map...
					</div>
				)}
				<br />
				<div
					style={{
						backgroundColor: 'lightgrey',
						padding: '10px',
					}}>
					<div className='flex mt-4 ml-10'>
						<h2 className='mt-2 text-bold'>HOTSPOT</h2>
						<div className='w-1/2 ml-10'>
							<CustomSelect
								value={props.orderType}
								options={hotspotList}
								id='hotspot'
								placeholder='Select hotspot'
								handleChange={(selectedValue) =>
									setSelectedHotspot(selectedValue)
								}
							/>
						</div>
					</div>
					<StaticsComponent
						{...{
							selectedHotspot,
							totalOrders,
							setTotalOrders,
							totalCompletedOrders,
							setTotalCompletedOrders,
						}}
					/>
					<StatusComponent {...{ totalOrders, totalCompletedOrders }} />
				</div>
			</div>
		</>
	);
}

export default Dashboard;
