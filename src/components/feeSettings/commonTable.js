import React, { useMemo } from 'react';
import ReactTable from 'react-table';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';

const CommonTable = (props) => {
	let currentId = 0;
	const columns = props.type == 'restaurant'?
	[
		{
			Header: '#',
			width: 30,
			id: 1,
			className: 'text-center view-details',
			accessor: (item) => {
				currentId++;
				return (
					<>
						<div className='flex items-center' style={{ cursor: 'pointer' }}>
							<div className='text-sm'>
								<p className='text-gray-300 leading-none'>{currentId}</p>
							</div>
						</div>
					</>
				);
			},
		},
		{
			id: 2,
			Header: 'Restaurant',
			className: 'text-center view-details',
			accessor: 'restaurant_name',
		},
		{
			id: 3,
			Header: 'Full Name',
			className: 'text-center view-details',
			accessor: (item) => {
				return (
					<div style={{ padding: '6px', cursor: 'pointer' }}>
						{item.owner_name}
					</div>
				);
			},
		},
		{
			id: 4,
			Header: 'Email Address',
			className: 'text-center view-details',
			accessor: (item) => {
				//  console.log(item.id);
				return (
					<div style={{ padding: '6px', cursor: 'pointer' }}>
						{item.owner_email}
					</div>
				);
			},
		},
		{
			id: 5,
			Header: 'Phone Number',
			className: 'text-center view-details',
			accessor: (item) => {
				return (
					<div style={{ padding: '6px', cursor: 'pointer' }}>
						 {`(${item.owner_phone.slice(0,3)}) ${item.owner_phone.slice(3,6)}-${item.owner_phone.slice(6)}`}

					</div>
				);
			},
		},		
		{
			id: 6,
			Header: 'Action',
			className: 'text-center view-details',
			accessor: (item) => {
				return (
					<div
						style={{
							display: 'flex',
							flexDirection: 'row',
							justifyContent: 'space-around',
						}}
						className='text-center'
						onClick={(e) => e.stopPropagation()}>
						<FontAwesomeIcon
							style={{ cursor: 'pointer' }}
							onClick={() => {
								props.setIsOpen(true);
								props.setTitle('Edit');
								props.setId(item.id);
							}}
							className='text-red-600 trash w-5 h-5'
							color='red'
							icon={faPencilAlt}
						/>
					</div>
				);
			},
		},
	]
	:[
			{
				Header: '#',
				width: 100,
				id: 1,
				className: 'text-center view-details',
				accessor: (item) => {
					currentId++;
					return (
						<>
							<div style={{ padding: '6px', cursor: 'pointer' }}>{currentId}</div>
						</>
					);
				},
			},
			{
				id: 2,
				Header: 'Order Range From to To',
				className: 'text-center view-details',
				accessor: (item) => {
					return (
						<div style={{ padding: '6px', cursor: 'pointer' }}>
							${item.order_range_from} - ${item.order_range_to}
						</div>
					);
				},
			},
			{
				id: 3,
				Header: `${props.title.split(' ')[0]} earning / order`,
				className: 'text-center view-details',
				accessor: (item) => {
					//  console.log(item.id);
					return (
						<div style={{ padding: '6px', cursor: 'pointer' }}>{item.fee}</div>
					);
				},
			},
			{
				id: 4,
				Header: 'Action',
				className: 'text-center view-details',
				accessor: (item) => {
					return (
						<div
							style={{
								display: 'flex',
								flexDirection: 'row',
								justifyContent: 'space-around',
							}}
							className='text-center'
							onClick={(e) => e.stopPropagation()}>
							<FontAwesomeIcon
								style={{ cursor: 'pointer' }}
								onClick={() => {
									props.setIsOpen(true);
									props.setTitle('Edit');
									props.setId(item.id);
								}}
								className='text-red-600 trash w-5 h-5'
								color='red'
								icon={faPencilAlt}
							/>
						</div>
					);
				},
			},
		]
	return (
		<div
			id='recipients'
			className='p-4 md:p-8 mt-6 lg:mt-0 rounded shadow bg-white '>
			<h1 className='text-xl'>{props.title}</h1>
			<div
				className='stripe hover'
				style={{ paddingTop: '1em', paddingBottom: '1em', width: '100%' }}>
				<ReactTable
					showPagination={false}
					minRows={0}
					NoDataComponent={() => null}
					defaultPageSize={10}
					data={props.feeSetting}
					className='-highlight'
					columns={columns}
				/>
			</div>
		</div>
	);
};
export default CommonTable;
