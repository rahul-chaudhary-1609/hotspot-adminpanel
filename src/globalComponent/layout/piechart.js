/**
 * The file is covered under Algoworks Work Product License for Design & Development of Mobile Application for “Hotspot”.
 * Please review the license for full details.
 * This program is not free software: You cannot redistribute it for any use under the terms of the Algoworks Work Product License for Design & Development of Mobile Application for “Hotspot”.
 * However the source can be modified and updated for the working of the application Design & Development of Mobile Application for “Hotspot” for which it was licensed.
*/

import React from 'react';
import { PieChart } from 'react-minimal-pie-chart';

const Piechart = (props) => (
	<div className='w-1/2 p-5' style={{marginTop: '-30px'}}>
		<div className='card h-50 bg-white-100 rounded-lg p-6'>
			<div className='flex flex-row h-full items-end ht-pie'>
				<PieChart
					radius={40}
					animate
					animationDuration={500}
					paddingAngle={5}
					lineWidth={25}
					data={props.data}
				/>{' '}
			</div>
			<div style={props.contentStyle}>{props.content}</div>
			<div style={props.subContentStyle}>{props.subContent}</div>
		</div>
	</div>
);

export default Piechart;
