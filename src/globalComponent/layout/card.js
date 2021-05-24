import React from 'react';

import CheckIcon from '@material-ui/icons/Check';
import LocalAtmIcon from '@material-ui/icons/LocalAtm';
import FilterNoneIcon from '@material-ui/icons/FilterNone';
import { FaCubes, FaRegBuilding } from 'react-icons/fa';
import PeopleOutlineIcon from '@material-ui/icons/PeopleOutline';

const GlobalCard = ({ count, message, cardColor, iconColor, ...props }) => (
	<div style={{ width: '15.6rem' }} className='w-full md:w-1/2 lg:w-1/3 p-5'>
		<div
			className={`card h-18  rounded-lg p-6`}
			style={{ backgroundColor: `${cardColor}`, width:'100%' }}>
			<div className='flex flex-col h-full '>
				<div className='flex-1 text-left'>
					<h3
						className='font-bold text-4xl leading-none'
						style={{ width: '20px' }}>
						{count}
					</h3>
				</div>
				<div className='flex-1 flex -row text-left'>
					<h5 className='text-xl  text-white-200'>{message}</h5>

					<div className='flex-shrink pr-4 mb-auto'>
						{(function () {
							if (props.card == 'earning') {
								return (
									<LocalAtmIcon
										style={{ fontSize: 50, color: 'white' }}
									/>
								);
							} else if (props.card == 'completeOrder') {
								return <CheckIcon style={{ fontSize: 40, color: 'white', marginLeft:'10px' }} />;
							} else if (props.card == 'processingOrder') {
								return (
									<FilterNoneIcon style={{ fontSize: 40, color: 'white' }} />
								);
							} else if (props.card == 'building') {
								return (
									<FaRegBuilding style={{ fontSize: 50, color: 'white' }} />
								);
							} else if (props.card == 'cube') {
								return <FaCubes style={{ fontSize: 50, color: 'white' }} />;
							} else {
								return (
									<PeopleOutlineIcon style={{ fontSize: 50, color: 'white' }} />
								);
							}
						})()}
					</div>
				</div>
			</div>
		</div>
	</div>
);

export default GlobalCard;
