import React, { useState } from 'react';
import Modal from 'react-modal';
import CloseIcon from '@material-ui/icons/Close';
import ReactTable from 'react-table';
import Pagination from 'react-js-pagination';

const TableModal = (props) => {
	const customStyles = {
		content: {
			top: '50%',
			left: '62%',
			right: 'auto',
			bottom: 'auto',
			marginRight: '-50%',
			width: '70%',
			height: '70%',
			transform: 'translate(-50%, -50%)',
		},
	};
	const closeModal = () => {
		 props.setTableModal(false);
	};

	const handlePageChange = (pageNumber) => {
		props.setCurrentPage(pageNumber);
	};
	return (
		<>
			<Modal
				isOpen={props.tableModal}
				onRequestClose={closeModal}
				style={customStyles}>
				<CloseIcon
					onClick={closeModal}
					style={{ fontSize: '50px', marginLeft: '95%' }}
				/>

				<ReactTable
					showPagination={false}
					minRows={0}
					NoDataComponent={() => null}
					defaultPageSize={10}
					data={props.data}
					className='-highlight'
					columns={props.columns}
					style={{
						width: '100%',
						marginTop: '0px',
					}}
					loading={props.loading}
				/>
				<br />
					{props.totalItems > 0 ? `(showing ${props.startId + 1} - ${props.endId} of ${props.totalItems})` : 'showing 0 result'}
					<div style={{ textAlign: 'right' }}>
						<Pagination
							activePage={props.activePage}
							itemsCountPerPage={props.pageSize}
							totalItemsCount={props.totalItems}
							pageRangeDisplayed={3}
							onChange={handlePageChange}
						/>
					</div>
			</Modal>
		</>
	);
};

export default TableModal;
