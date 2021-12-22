import React from 'react';
import Modal from 'react-modal';

const RefundModal = (props) => {
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
		props.setRefundModal(false);
	};

	return (
		<>
			<Modal
				isOpen={props.refundModal}
				onRequestClose={closeModal}
				style={customStyles}>
				<h3 style={{ textAlign: 'center', fontSize: '20px' }}>
					Refund
				</h3>
			
				<div className="px-8 text-base" style={{marginTop: "5px",border:"1px solid rgba(0,0,0,0.5)",borderRadius:"5px",padding:"10px", overflow:"scroll", maxHeight:"200px"}}>
            <table style={{width: "100%"}}>

            {props.refundDetails?.order_details.ordered_items.map((ordered_item,itemIndex)=> {
              return (
                  <tr style={{verticalAlign: "top"}}>
                      <td style={{textAlign: "left"}}>
                          <div>
                              {ordered_item.itemCount}x
                          </div>
                      </td>
                      <td>
                          <div>
                            {ordered_item.is_refunded?<input  
                              style={{marginRight:"5px",height:"15px",width:"15px",border:"2px solid black", borderRadius:"5px"}}
                              type="checkbox" 
                              checked={ordered_item.is_refunded}                                           
                            />:""}
                                {ordered_item.is_refunded?
                                  <input 
                                    style={{marginRight:"5px",textAlign:"center",height:"20px",width:"40px",paddingLeft:"2px" ,border:"1px solid rgba(0,0,0,0.5)", borderRadius:"5px"}}
                                    type="number" 
                                    value={ordered_item.refund_count} 
                                    min={1} 
                                    max={ordered_item.itemCount}             
                                  />:""
                                } 
                            {ordered_item.itemName} (${(parseFloat(ordered_item.price)).toFixed(2)})
                        
                {ordered_item.itemAddOn.map((addOn,addonIndex)=> {
                    return <li style={{/*fontSize: "13px"*/}}>
                      {addOn.is_refunded?<input
                      style={{marginRight:"5px",height:"15px",width:"15px",border:"2px solid black", borderRadius:"5px"}}
                        type="checkbox" 
                        checked={addOn.is_refunded}                                    
                        />:""}
                      {addOn.is_refunded?
                        <input 
                          style={{marginRight:"5px",textAlign:"center",marginLeft:"5px",height:"20px",width:"40px",paddingLeft:"2px" ,border:"1px solid rgba(0,0,0,0.5)", borderRadius:"5px"}}
                          type="number" 
                          value={addOn.refund_count} 
                          min={1} 
                          max={ordered_item.itemCount}               
                      />:""} 
                      {addOn.name} (${addOn.price})
                    </li>
                })}

                { ordered_item.preference && ordered_item.preference.trim()!==""?(
                    <div>
                        <i>Preference: </i>
                            <span style={{/*fontSize: "13px"*/}}>
                                {ordered_item.preference}
                            </span>
                    </div>
                ):("")}

                </div>
                    </td>
                    <td style={{textAlign: "right"}}>
                        <div>
                            ${(parseFloat(ordered_item.itemPrice)).toFixed(2)}
                        </div>
                    </td>
                </tr>
              )
                
            })}                          
            </table>
        </div>

        <div className="px-2 text-base" style={{marginTop: '10px', }}><strong>Refund Amount:</strong> <span style={{fontSize:"18px"}}>${props.refundAmount}</span></div>
				

        <div className="px-2 text-base" style={{marginTop: '15px', display:"flex",flexDirection:"row",justifyContent:"start" }}>
          <div><strong>Type:</strong></div>
          <div style={{marginLeft:"1rem"}}>
           <input 
            type="checkbox"
              style={{marginRight:"5px",height:"15px",width:"15px",border:"2px solid black", borderRadius:"5px"}}
              checked={props.refundObj.type==1?true:false}
              onChange={()=>{
                props.setRefundObj({
                  ...props.refundObj,
                  type:1,
                })
              }}
            /> 
            Company Credit
          </div>
          <div style={{marginLeft:"1rem"}}>
            <input 
              type="checkbox"
                style={{marginRight:"5px",height:"15px",width:"15px",border:"2px solid black", borderRadius:"5px"}}
                checked={props.refundObj.type==2?true:false}
                onChange={()=>{
                  props.setRefundObj({
                    ...props.refundObj,
                    type:2,
                  })
                }}
            />  
            Card Refund
          </div>
        </div>

        <div className="px-2 text-base" style={{marginTop: '10px', display:"flex",flexDirection:"column" }}>
          <div><strong>Admin Comment:</strong></div>
          <div>
            <textarea
              rows={4}
              cols={70}
              style={{border:"1px solid rgba(0,0,0,0.5)",borderRadius:"10px",padding:"10px"}}
              onChange={(e)=>{
                props.setRefundObj({
                  ...props.refundObj,
                  admin_comment:e.target.value,
                })
              }}
            />
          </div>
        </div>
				<div style={{ display: 'flex', marginTop: '20px' }}>
					<button
						onClick={closeModal}
						style={{
							width: '100%',
							backgroundColor: 'white',
							color: 'white',
							backgroundColor: 'red',
							border: '2px solid red',
						}}>
						Cancel
					</button>
					<button
						onClick={()=>props.handleRefund()}
						disabled={props.refundAmount<=0?true:false}
						style={{
							width: '100%',
							marginLeft: '10px',
							backgroundColor: 'white',
							color: 'white',
							border: '2px solid green',
							backgroundColor: 'green',
						}}>
						Refund
					</button>
				</div>
			</Modal>
		</>
	);
};

export default RefundModal;
