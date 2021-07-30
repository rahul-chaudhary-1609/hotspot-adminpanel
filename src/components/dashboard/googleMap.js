import React, { useEffect, useRef, useState } from 'react';
import GoogleMapReact from 'google-map-react';

const GoogleMap = (props) => {
	let markers = props.markerLists;
	const [map, setMap] = useState(null);
	const [maps, setMaps] = useState(null);
	const updatedMarkers = useRef([]);

	useEffect(() => {
		
		if (map && maps) {
			updatedMarkers.current.forEach((marker) => {
				marker.setMap(null);
			});
			updatedMarkers.current = [];
			let marker = [];
			markers.map((mark) => {
				marker.push(
					new maps.Marker({
						position: { lat: mark[1], lng: mark[2] },
						map,
						title: mark[0],
					})
				);
			});
			updatedMarkers.current = marker;
		}
	}, [map, maps, markers]);

	return (
		<div style={{ height: '300px', width: '100%'}}>
			<GoogleMapReact
				bootstrapURLKeys={{
					key: 'AIzaSyCqeKge8JYCJdvyt77p0QEqIr0dMyA8BOM',
					
				}}
				defaultCenter={{
					lat: markers[0][1],
					lng: markers[0][2],
				}}
				defaultZoom={0}
			
				onGoogleApiLoaded={({ map, maps }) => {
					console.log(map);
					console.log(maps);
					{
						setMap(map);
						setMaps(maps);
					}
				}}
				yesIWantToUseGoogleMapApiInternals
				></GoogleMapReact>
		</div>
	);
};

export default GoogleMap;
