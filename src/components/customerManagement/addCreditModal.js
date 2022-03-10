
import React,{useState,useEffect} from 'react';
import Modal from 'react-modal';
import Select from 'react-select';
import {
	listActiveCustomers,
	addPromotionalCredits,
	listHotspot,
	editPromotionalCredits
} from '../../api';
import Loader from "../../globalComponent/layout/loader";
import moment from "moment";

export default function AddCreditModal(props){

	const [customerList,setCustomerList]=useState([]);
	const [customerCount,setCustomerCount]=useState(0);
	const [hotspotList,setHotspotList]=useState([]);
	const [selectedCustomers,setSelectedCustomers]=useState([]);
	const [selectedHotspot,setSelectedHotspot]=useState(null);
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
		getHotspotList();
	},[])

	useEffect(()=>{
		setSelectedCustomers([]);
		setCredit("")
		setIsAll(false);
		setCustomerCount(0);
		getCustomerList();
	},[selectedHotspot])

	useEffect(()=>{
		setSelectedCustomers([]);
		setCredit("")
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
			let data={
				query:{
					hotspotLocationId:selectedHotspot.id,
				}
			}
			const res = await listActiveCustomers(props.token,data);
			if (res.success) {
				setLoader(false);
				setCustomerCount(res.customerList.count);
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
			setCustomerCount(0);
		}
	}

	let getHotspotList=async()=>{
		try {
			setLoader(true);
			let data={
				query:{
					is_pagination:0,
				}
			}
			const res = await listHotspot(props.token,data);
			if (res.success) {
				setLoader(false);
				setHotspotList(res.hotspotList.rows.map((hotspot)=>{
					return {
						label:`${hotspot.name}`,
						value:hotspot.id,
						...hotspot,
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
			setHotspotList([]);
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
				datetime:moment(new Date(),"YYYY-MM-DD HH:mm:ss").format("YYYY-MM-DD HH:mm:ss"),
			}
		}
		addPromotionalCredits(props.token,data)
		.then((res)=>{
			setLoader(false);
			props.reloadCustomerList();
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
								className="font-semibold py-1 px-6 text-left text-md"
								style={{ width: "21%" }}
							>
								Hotspot
							</div>
							<div className="px-8 text-md" style={{ width: "75%", display:"flex", flexDirection:'column' }}>
									<div>
										<Select
											isMulti={false}
											maxMenuHeight={150}
											styles={selectCustomStyles}
											options={hotspotList}
											placeholder="Select Hotspot"
											value={selectedHotspot}
											onChange={(selectedHotspot)=>{
												setSelectedHotspot(selectedHotspot)
												console.log("selected",selectedHotspot)
											}}
											required
										/>
									</div>
								</div>
							</div>
						</div>
					<div className="form-layout text-base" style={{ marginTop: "10px" }}>
						<div className="flex flex-row ">
							<div
								className="font-semibold py-4 px-6 text-left text-md"
								style={{ width: "21%" }}
							>
								Customers
							</div>
							<div className="px-8 text-md" style={{ width: "75%", display:"flex", flexDirection:'column' }}>
									<div style={{display:"flex", justifyContent:"space-between"}}>
										<div>
											<input
												style={{width:"15px", height:"15px", marginRight:"0.5rem"}}
												type="checkbox"
												onClick={()=>setIsAll(!isAll)}
												checked={isAll}
												disabled={selectedHotspot && customerCount?false:true}
											/>
											All
										</div>

										 <div>Count: {customerCount}</div>
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
											isDisabled={!isAll && selectedHotspot && customerCount?false:true}
										/>
									</div>
								</div>
							</div>
						</div>
					<div className="form-layout text-base" style={{marginTop: "10px" }}>
						<div className="flex flex-row items-center ">
						<div
							className="font-semibold py-1 px-6 text-left text-md"
							style={{ width: "21%" }}
						>
							Credits($)
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

export function EditCreditModal(props) {

	const [loader,setLoader]=useState(false);
	const [action,setAction]=useState(1);
	const [credit,setCredit]=useState("");
	const [resObj,setResObj]=useState({
		found:false,
		is_error:false,
		message:"",
		color:"green",
	})


	useEffect(()=>{
		setCredit("")
	},[action])

	useEffect(()=>{
		setResObj({
			found:false,
			is_error:false,
			message:"",
			color:"green",
		})
	},[action,credit])


	let validateData=()=>{
		let result=true;
		if(!credit.trim() || isNaN(credit.trim()) || parseFloat(credit.trim())<=0){
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

	const handleEditCredit=()=>{
		if(!validateData()){
			return;
		}
		setLoader(true);
		let data={
			body:{
				customer_id:props.customerDetails.id,
				action,
				hotspot_credit:parseFloat(credit),
				datetime:moment(new Date(),"YYYY-MM-DD HH:mm:ss").format("YYYY-MM-DD HH:mm:ss"),
			}
		}
		editPromotionalCredits(props.token,data)
		.then((res)=>{
			setLoader(false);
			props.getCustomer();
			setResObj({
				...resObj,
				found:true,
				color:"green",
				is_error:false,
				message:"Credits updated successfully.",
			})
			
			setTimeout(()=>{
				props.setEditCreditModal(false);
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

  console.log("props",props)

	const closeModal = () => {
		props.setEditCreditModal(false);
	};

	return (
		<>
			<Modal
				isOpen={props.editCreditModal}
				onRequestClose={closeModal}
				style={customStyles}>
				<h3 style={{ textAlign: 'center', fontSize: '20px' }}>
					Edit Promotional Credits
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
								className="font-semibold py-1 px-6 text-left text-md"
								style={{ width: "30%" }}
							>
								Customer
							</div>
							<div className="px-8 text-md" style={{ width: "70%", display:"flex", flexDirection:'column' }}>
									<div>
										{props.customerDetails.name}
									</div>
								</div>
							</div>
						</div>
					<div className="form-layout text-base" style={{ marginTop: "10px" }}>
						<div className="flex flex-row ">
							<div
								className="font-semibold py-1 px-6 text-left text-md"
								style={{ width: "30%" }}
							>
								Current Credit
							</div>
							<div className="px-8 text-md" style={{ width: "70%", display:"flex", flexDirection:'column' }}>
									<div>
										${props.customerDetails.hotspot_credit}
									</div>
								</div>
							</div>
						</div>
					<div className="form-layout text-base" style={{ marginTop: "10px" }}>
						<div className="flex flex-row ">
							<div
								className="font-semibold py-1 px-6 text-left text-md"
								style={{ width: "30%" }}
							>
								Action
							</div>
							<div className="px-8 text-md" style={{ width: "70%", display:"flex", flexDirection:'row' }}>
									<div style={{display:"flex", flexDirection:"row", alignItems:"center"}}>
										<input
												style={{width:"15px", height:"15px", marginRight:"0.5rem"}}
												type="checkbox"
												onClick={()=>setAction(3-action)}
												checked={action==1?true:false}
												id="add_check"
										/>
										<label htmlFor='add_check'>Add</label>
									</div>
									<div style={{display:"flex", flexDirection:"row", alignItems:"center", marginLeft:"1rem"}}>
										<input
												style={{width:"15px", height:"15px", marginRight:"0.5rem"}}
												type="checkbox"
												onClick={()=>setAction(3-action)}
												checked={action==2?true:false}
												id="subtract_check"
										/>
										<label htmlFor='subtract_check'>Subtract</label>
									</div>
								</div>
							</div>
					</div>
					<div className="form-layout text-base" style={{marginTop: "10px" }}>
						<div className="flex flex-row items-center ">
						<div
							className="font-semibold py-1 px-6 text-left text-md"
							style={{ width: "30%" }}
						>
							Credits($)
						</div>
						<div className="px-8 text-md"  style={{ width: "70%" }}>
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
						onClick={handleEditCredit}
						disabled={credit && credit.trim()?false:true}
						style={{
							width: '100%',
							marginLeft: '10px',
							color: 'white',
							border: credit && credit.trim()>0?'2px solid rgb(0,128,0)':'rgba(0,128,0,0.3)',
							backgroundColor: credit && credit.trim()>0?'rgb(0,128,0)':'rgba(0,128,0,0.3)',
						}}>
						Update
					</button>
				</div>
			</Modal>
		</>
	);
};

