import React, { useEffect, useState } from 'react';
import ReactTable from 'react-table';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { getStaticContents } from '../../api';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';

const StaticContent = () => {
	const token = useSelector((state) => state.auth.isSignedIn);

    const history = useHistory();

	let currentId = 0;

	const columns = [
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
								<p className='text-gray-300 leading-none '>{currentId}</p>
							</div>
						</div>
					</>
				);
			},
		},
		{
			id: 2,
			Header: 'Title',
			width: 200,
			className: 'text-center view-details',
			accessor: (item) => {
				return (
					<div style={{ padding: '6px', cursor: 'pointer' }}>{item.title}</div>
				);
			},
		},
		{
			id: 3,
			Header: 'Description',
			className: 'text-center view-details',
			width: 400,
			accessor: (item) => {
				return (
					<div style={{ padding: '6px', cursor: 'pointer' }}>
						{item.description}
					</div>
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
						
						{item.title != 'FAQs' ? (
							<>
							<FontAwesomeIcon
							style={{ cursor: 'pointer' }}
							onClick={() => history.push(`/viewStaticContent/${item.id}`)}
							className='text-red-600 trash w-5 h-5'
							color='red'
							icon={faEye}
						/>
							<FontAwesomeIcon
								style={{ cursor: 'pointer' }}
								onClick={() => history.push(`/editStaticContent/${item.id}`)}
								className='text-red-600 trash w-5 h-5'
								color='red'
								icon={faPencilAlt}
							/>
							</>
						): 
						<FontAwesomeIcon
							style={{ cursor: 'pointer' }}
							onClick={() => history.push(`/viewStaticContent/${item.id}/faqs`)}
							className='text-red-600 trash w-5 h-5'
							color='red'
							icon={faEye}
						/>
						}
					</div>
				);
			},
		},
	];

	const [staticContent, setStaticContent] = useState([]);

	useEffect(() => {
		getStaticContents(token)
			.then((res) => {
				setStaticContent(res.getStaticContentsData);
			})
			.catch((error) => {
				console.log(error);
			});
	}, []);
	return (
		<>
			<div className='main-content pb-16 md:pb-5 flex-1 pt-20 px-2'>
				<div
					id='recipients'
					className='p-4 md:p-8 mt-6 lg:mt-0 rounded shadow bg-white'>
					<h1 className='text-xl'>Static Content Management</h1>
					<div className='mt-20'>
						<ReactTable
							showPagination={false}
							minRows={0}
							NoDataComponent={() => null}
							defaultPageSize={10}
							data={staticContent}
							className='-highlight'
							columns={columns}
							style={{
								width: '900px',
							}}
						/>
					</div>
				</div>
			</div>

          
		</>
	);
};

export default StaticContent;
