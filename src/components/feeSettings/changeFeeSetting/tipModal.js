import React , { useState, useEffect }  from 'react'
import Modal from 'react-modal';
import { useSelector } from 'react-redux';
import {gettipAmountById, editTipAmount} from '../../../api.js'

export default function TipModal(props) {

	const [err, setErr] = useState();
	const [success, setSuccess] = useState({
		flag:false,
		message:"",
	});
    console.log(props);
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

	const customStyles = {
		control: (provided, state) => ({
			...provided,
			width: '98%',
			backgroundColor: '#fafafa',
			borderColor: 'grey',
		}),
		container: (provided, state) => ({
			...provided,
			width: '60%',
			fontSize: '12px',
			marginLeft: '15px',
		}),
	};
    const token = useSelector((state) => state.auth.isSignedIn);
    const [tipAmount, setTipAmount] = useState(null) 
	const [error, setError] = useState(null);

    
    const getData = async () => {
		try {
            if(parseInt(props.editTip.id))
            {
                console.log(props.editTip)
                let response  = await gettipAmountById(token, parseInt(props.editTip.id));
                console.log(parseInt(props.editTip.id),"amount111",response.tip.tip_amount);
                setTipAmount(response.tip.tip_amount)
            }
		} catch (error) {
			console.log(error);
		}
	};
    useEffect(()=>{
        if(props.editTip.id){
            getData()
        }
    },[props.editTip.id,props.editTip.amount])
	

    const closeModal = () => {
		props.setTipModal(false);
	};

    const handleChange = (e) => {
		setErr("")
		if(parseInt(e.target.value.trim()) <= 1)
		{
			setErr("Tip should be greater than or equal to 2.");
		}else{
        	setTipAmount(e.target.value)
    	}
	}

    const handleFee = () => {
        let data = {
            tip_id: props.editTip.id,
            tip_amount: parseFloat(tipAmount)
        };
        editTipAmount(token, data)
					.then((resp) => {
						setSuccess({
							flag:true,
							message:"Tip Amount updated successfully",
						});
						setTimeout(()=>{
							props.setTipModal(false);
						},1500)
                        props.tipAmountFetch()
					})
					.catch((error) => {
						console.log(error);
						setErr('');
					});
    }

    return (
        <div>
            <Modal
					isOpen={props.tipModal}
					onRequestClose={closeModal}
					style={customsStyles}>
					<h1 style={{ fontSize: '30px', textAlign: 'center' }}>Edit Tip Amount</h1>
					{
						success.flag?
						<h1 style={{ fontSize: '12px',color:'green' ,textAlign: 'center' }}>{success.message}</h1>:
						<h1 style={{ fontSize: '12px',color:'red' ,textAlign: 'center' }}>{err}</h1>
					}
					<div className='flex flex-row items-center mt-5  '>
						<div className='   w-1/3 text-left '>Fee Type</div>
						<b style={{ marginBottom: "0px", paddingLeft: "100px" }}>Tip</b>
					</div>
					<div className='flex flex-row items-center mt-5  '>
						<div className='w-1/2 text-left '>Amount</div>
						<input
							type='number'
							min='2'
							className='appearance-none block w-1/3 bg-gray-100 border border-100 rounded-half py-2 px-8 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-200'
							style={{ marginLeft: "-96px" }}
							value={tipAmount}
							id='fee'
							onChange={(e) => handleChange(e)}
						/>
					</div>
					<div>{error && (
						<p
							style={{
								color: 'red',
								fontSize: '20px',
								textAlign: 'center',
								width: '100%',
							}}>
							{error}
						</p>
					)}</div>
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
