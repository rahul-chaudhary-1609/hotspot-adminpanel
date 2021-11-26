import React , { useState, useEffect }  from 'react'
import Modal from 'react-modal';
import { useSelector } from 'react-redux';
import { editTax} from '../../../api.js'

export default function TaxModal(props) {

	const [err, setErr] = useState({
		flag:false,
		message:"",
	});
	const [success, setSuccess] = useState({
		flag:false,
		message:"",
	});
    const customsStyles = {
		content: {
			width: '40%',
			top: '50%',
			left: '50%',
			right: 'auto',
			bottom: 'auto',
			marginRight: '-50%',
			transform: 'translate(-50%, -50%)',
		},
	};

    const token = useSelector((state) => state.auth.isSignedIn);
    let [tax, setTax] = useState({
		name:null,
		variable_percentage:null,
		fixed_amount:null,
		description:null
	}) 
	
    useEffect(()=>{
        if(props.editTax.id){
			let {name,variable_percentage,fixed_amount,description}=props.editTax;
			setTax({name,variable_percentage,fixed_amount,description})
			
        }
    },[props.editTax.id])
	

    const closeModal = () => {
		props.setTaxModal(false);
	};

    const validateData = () => {
		let result=true

		if(tax.fixed_amount && parseInt(tax.fixed_amount) >= 0){
			//pass
		}else if(tax.fixed_amount && parseInt(tax.fixed_amount) < 0){
        	setErr({
				flag:true,
				message:"Tax fixed amount should be greater than or equal to 0.",
			});
			result=false;
    	}else{
			setErr({
				flag:true,
				message:"Please enter a valid tax fixed amount value.",
			});
			result=false;
		}

		console.log("Type of tipamount", tax)

		if(tax.variable_percentage && parseFloat(tax.variable_percentage) >= 0){
			//pass		
		}else if(tax.variable_percentage && parseFloat(tax.variable_percentage) < 0){
        	setErr({
				flag:true,
				message:"Tax variable percentage should be greater than or equal to 0.",
			});
			result=false;
    	}else{
			setErr({
				flag:true,
				message:"Please enter a valid tax variable percentage value.",
			});
			result=false;
		}

		if(!tax.name || tax.name.trim()==""){
        	setErr({
				flag:true,
				message:"Tax name is required.",
			});
			result=false;
    	}
	

		return result;
	}

    const handleFee = (e) => {
		e.preventDefault();
		if (!validateData()){
			return;
		}
        let data = {
            body:{
				tax_id:props.editTax.id,
				...tax,
				variable_percentage:parseFloat(tax.variable_percentage),
				fixed_amount:parseInt(tax.fixed_amount)
			}
        };
        editTax(token, data)
					.then((resp) => {
						setSuccess({
							flag:true,
							message:"Tax Amount updated successfully",
						});
						setTimeout(()=>{							
							setSuccess({...success,flag:false})
							props.setTaxModal(false);
						},1500)
                        props.fetchTaxList()
					})
					.catch((error) => {
						console.log(error);
						setErr({...err,flag:false,});
					});
    }

    return (
        <div>
            <Modal
					isOpen={props.taxModal}
					onRequestClose={closeModal}
					style={customsStyles}>
					<h1 style={{ fontSize: '30px', textAlign: 'center' }}>Edit Tax Amount</h1>
					{
						success.flag?
						<h1 style={{ fontSize: '14px',color:'green' ,textAlign: 'center' }}>{success.message}</h1>:
						err.flag?<h1 style={{ fontSize: '14px',color:'red' ,textAlign: 'center' }}>{err.message}</h1>:null
					}
					<div className='flex flex-row items-center mt-5  '>
						<div className='   w-1/3 text-left '>Fee Type</div>
						<b style={{ marginBottom: "0px", paddingLeft: "100px" }}>Tax</b>
					</div>
					<div className='flex flex-row items-center mt-5  '>
						<div className='w-1/2 text-left '>Name</div>
						<input
							type='text'
							required
							className='appearance-none block w-1/2 bg-gray-100 border border-100 rounded-half py-2 px-8 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-200'
							style={{ marginLeft: "-96px" }}
							value={tax.name}
							id='taxName'
							onChange={(e) => {
								setSuccess({...success,flag:false})
								setErr({...err,flag:false})
								setTax({...tax,name:e.target.value})
							}}
						/>
					</div>
					<div className='flex flex-row items-center mt-5  '>
						<div className='w-1/2 text-left '>Variable Percentage(%)</div>
						<input
							type='text'
							required
							className='appearance-none block w-1/2 bg-gray-100 border border-100 rounded-half py-2 px-8 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-200'
							style={{ marginLeft: "-96px" }}
							value={tax.variable_percentage}
							id='taxVariablePercentage'
							onChange={(e) => {
								setSuccess({...success,flag:false})
								setErr({...err,flag:false})
								setTax({...tax,variable_percentage:e.target.value})
							}}
						/>
					</div>
					<div className='flex flex-row items-center mt-5  '>
						<div className='w-1/2 text-left '>Fixed Amount(¢)</div>
						<input
							type='number'
							min='0'
							required
							className='appearance-none block w-1/2 bg-gray-100 border border-100 rounded-half py-2 px-8 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-200'
							style={{ marginLeft: "-96px" }}
							value={tax.fixed_amount}
							id='taxFixedAmount'
							onChange={(e) => {
								setSuccess({...success,flag:false})
								setErr({...err,flag:false})
								setTax({...tax,fixed_amount:e.target.value})
							}}
						/>
					</div>
					<div className='flex flex-row items-center mt-5  '>
						<div className='w-1/2 text-left '>Description</div>
						<textarea
							type='text'
							rows="4"
							className='appearance-none block w-1/2 bg-gray-100 border border-100 rounded-half py-2 px-8 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-200'
							style={{ marginLeft: "-96px" }}
							value={tax.description}
							id='taxDescription'
							onChange={(e) => {
								console.log(e.target.value)
								setSuccess({...success,flag:false})
								setErr({...err,flag:false})
								setTax({...tax,description:e.target.value})
							}}
						/>
					</div>
					<div style={{ display: 'flex', marginTop: '40px' }}>
						<button
							onClick={closeModal}
							style={{
								width: '100%',
								height: '40px',
								backgroundColor: 'red',
								color: 'white',

							}}>
							Cancel
				</button>
						<button
							type='submit'
							onClick={handleFee}
							style={{
								width: '100%',
								height: '40px',
								backgroundColor: 'green',
								color: 'white',
								marginLeft: '5px',

							}}>
							Save
				</button>
					</div>
				</Modal>
        </div>
    )
}
