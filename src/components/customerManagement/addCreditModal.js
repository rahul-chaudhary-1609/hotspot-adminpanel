
import React,{useState,useEffect} from 'react';
import Modal from 'react-modal';
import Select from 'react-select';
import {
	listActiveCustomers,
	addPromotionalCredits
} from '../../api';
import Loader from "../../globalComponent/layout/loader";


const AddCreditModal = (props) => {

	const [customerList,setCustomerList]=useState([]);
	const [selectedCustomers,setSelectedCustomers]=useState([]);
	const [loader,setLoader]=useState(false);
	const [isAll,setIsAll]=useState(false);
	const [credit,setCredit]=useState("");
	const [resObj,setResObj]=useState({
		found:false,
		is_error:false,
		message:"",
		color:"green",
	})

	useEffect(()=>{
		getCustomerList();
	},[])

	useEffect(()=>{
		setSelectedCustomers([]);
	},[isAll])

	useEffect(()=>{
		setResObj({
			found:false,
			is_error:false,
			message:"",
			color:"green",
		})
	},[isAll,credit,selectedCustomers])

	let getCustomerList=async()=>{
		try {
			setLoader(true);
			const res = await listActiveCustomers(props.token,{});
			if (res.success) {
				setLoader(false);
				setCustomerList(res.customerList.rows.map((customer)=>{
					return {
						label:`${customer.name} (${customer.email})`,
						value:customer.id,
						...customer,
					}
				}));
			}
		} catch (error) {
			setLoader(false);
			console.log(error)
			setResObj({
				...resObj,
				found:true,
				color:"red",
				is_error:true,
				message:error.message,
			})
			setCustomerList([]);
		}
	}

	let validateData=()=>{
		let result=true;
		if(!isAll && selectedCustomers?.length==0){
			result=false;
			setResObj({
				...resObj.type,
				found:true,
				color:"red",
				is_error:true,
				message:"Please select atleast one customer",
			})
		}else if(!credit.trim() || isNaN(credit.trim()) || parseFloat(credit.trim())<=0){
			result=false;
			setResObj({
				...resObj.type,
				found:true,
				color:"red",
				is_error:true,
				message:"Please enter a valid credit",
			})
		}

		return result;
	}

	const handleOnBlur=()=>{
		if(!credit.trim() || isNaN(credit.trim()) || parseFloat(credit.trim())<=0){
			setResObj({
				...resObj.type,
				found:true,
				color:"red",
				is_error:true,
				message:"Please enter a valid credit",
			})
			return;
		}

		setCredit(parseFloat(credit.trim()).toFixed(2))
	}

	const handleAddCredit=()=>{
		if(!validateData()){
			return;
		}
		setLoader(true);
		let data={
			body:{
				customer_ids:isAll?customerList.map(customer=>customer.id):selectedCustomers.map(customer=>customer.id),
				hotspot_credit:parseFloat(credit),
			}
		}
		addPromotionalCredits(props.token,data)
		.then((res)=>{
			setLoader(false);
			setResObj({
				...resObj,
				found:true,
				color:"green",
				is_error:false,
				message:"Credits added successfully.",
			})
			setTimeout(()=>{
				props.setAddCreditModal(false);
			},2000)
		})
		.catch((error)=> {
			setLoader(false);
			console.log(error)
			setResObj({
				...resObj,
				found:true,
				color:"red",
				is_error:true,
				message:error.message,
			})
		})
		
	}


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
			minHeight:"40px",
			// marginBottom:"12px",
			// borderRadius: '9999px',
		}),
		container: (provided, state) => ({
			...provided,
			width: '100%',
			borderRadius: '1.75rem',
			backgroundColor: '#fafafa',
			borderColor: 'red',
		}),
	};

  console.log("props",props)

	const closeModal = () => {
		props.setAddCreditModal(false);
	};

	return (
		<>
			<Modal
				isOpen={props.addCreditModal}
				onRequestClose={closeModal}
				style={customStyles}>
				<h3 style={{ textAlign: 'center', fontSize: '20px' }}>
					Add Promotional Credits
				</h3>    

				{loader?<Loader height="200px"/>:<div
					style={{
						display: "flex",
						flexDirection: "column",
						justifyContent: "start",
						marginBottom:"10px",
						minHeight:"250px"
					}}
					>
					{
						resObj.found && (
							<div style={{color:resObj.color, textAlign:"center", fontSize:"15px"}}><strong>{resObj.message}</strong></div>
						)
					}
					<div className="form-layout text-base" style={{ marginTop: "10px" }}>
						<div className="flex flex-row ">
							<div
								className="font-semibold py-4 px-6 text-left text-md"
								style={{ width: "21%" }}
							>
								Customers
							</div>
							<div className="px-8 text-md" style={{ width: "75%", display:"flex", flexDirection:'column' }}>
									<div style={{}}>
										<input
											style={{width:"15px", height:"15px", marginRight:"0.5rem"}}
											type="checkbox"
											onClick={()=>setIsAll(!isAll)}
											checked={isAll}
										/>
										 All
									</div>
									<div>
										<Select
											isMulti={true}
											maxMenuHeight={150}
											styles={selectCustomStyles}
											options={customerList}
											placeholder="Select Customer"
											value={selectedCustomers}
											onChange={(selectedCustomer)=>{
												setSelectedCustomers(selectedCustomer)
												console.log("selected",selectedCustomer)
											}}
											required
											isDisabled={isAll}
										/>
									</div>
								</div>
							</div>
						</div>
					<div className="form-layout text-base" style={{ }}>
						<div className="flex flex-row items-center ">
						<div
							className="font-semibold py-4 px-6 text-left text-md"
							style={{ width: "21%" }}
						>
							Credits
						</div>
						<div className="px-8 text-md"  style={{ width: "75%" }}>
							<input
								style={{
									border: "1px solid rgba(0,0,0,0.4)",
									padding: "5px",
									width: "100%",
									borderRadius:"5px",
									minHeight:"40px",
								}}
								id='credits'
								type='text'
								required
								onChange={(e)=>setCredit(e.target.value)}
								onBlur={handleOnBlur}
								value={credit}
							/>
						</div>
						</div>
					</div>
				</div>
			}

            
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
						onClick={handleAddCredit}
						disabled={isAll || selectedCustomers?.length>0?false:true}
						style={{
							width: '100%',
							marginLeft: '10px',
							color: 'white',
							border: isAll || selectedCustomers?.length>0?'2px solid rgb(0,128,0)':'rgba(0,128,0,0.3)',
							backgroundColor: isAll || selectedCustomers?.length>0?'rgb(0,128,0)':'rgba(0,128,0,0.3)',
						}}>
						Add
					</button>
				</div>
			</Modal>
		</>
	);
};

export default AddCreditModal
