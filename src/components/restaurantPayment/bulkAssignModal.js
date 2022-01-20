import React from 'react';
import Modal from 'react-modal';
import Select from 'react-select';

const BulkAssignModal = (props) => {
	const customStyles = {
		content: {
			top: '55%',
			left: '50%',
			right: 'auto',
			bottom: 'auto',
			width:"40%",
			marginRight: '-50%',
			transform: 'translate(-50%, -50%)',
			marginLeft:'135px'
		},
	};

	const selectCustomStyles = {
		control: (provided, state) => ({
			...provided,
			width: '100%',
			backgroundColor: '#fafafa',
			borderColor: 'grey',height:"100%",
			minHeight:"50px",
			// marginBottom:"12px",
			// borderRadius: '9999px',
		}),
		container: (provided, state) => ({
			...provided,
			width: '100%',
			borderRadius: '1.75rem',
			backgroundColor: '#fafafa',
			borderColor: 'grey',
		}),
	};

  console.log("props",props)

	const closeModal = () => {
		props.setBulkAssignModal(false);
	};

	return (
		<>
			<Modal
				isOpen={props.bulkAssignModal}
				onRequestClose={closeModal}
				style={customStyles}>
				<h3 style={{ textAlign: 'center', fontSize: '20px' }}>
					Assign Driver
				</h3>    

				<div style={{display:"flex",flexDirection:"column", alignContent:"start", height:"250px"}}>
					<div style={{marginBottom:"25px"}}><strong>Payment ID:</strong> {props.bulkAssignModalData?.payment_id}</div>
					<div><Select
						maxMenuHeight={150}
						styles={selectCustomStyles}
						options={props.driverList}
						placeholder="Select Driver"
						value={props.selectedDriver}
						onChange={(selectedDriver)=>{
							props.setSelectedDriver(selectedDriver)
						}}
						required
						disabled={props.driverList?false:true}
					/></div>
				</div>
            
				<div style={{ display: 'flex', marginTop: '20px' }}>
					<button
						onClick={closeModal}
						style={{
							width: '100%',
							color: 'white',
							backgroundColor: 'red',
							border: '2px solid red',
						}}>
						Cancel
					</button>
					<button
						onClick={()=>props.handleBulkAssignDriver({
							restaurant_payment_id:props.bulkAssignModalData?.payment_id,
							driver_id:props.selectedDriver?.id,
						})}
						disabled={props.selectedDriver?false:true}
						style={{
							width: '100%',
							marginLeft: '10px',
							color: 'white',
							border: props.selectedDriver?'2px solid rgb(0,128,0)':'rgba(0,128,0,0.3)',
							backgroundColor: props.selectedDriver?'rgb(0,128,0)':'rgba(0,128,0,0.3)',
						}}>
						Assign
					</button>
				</div>
			</Modal>
		</>
	);
};

export default BulkAssignModal
