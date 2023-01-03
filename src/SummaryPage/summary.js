import {  useState } from 'react'
import {  Link, useNavigate } from 'react-router-dom';
import Userdetails from '../userDetails/User';
import './summary.css'

function SummaryPage(props){
    const navigate = useNavigate()
    // dummy data for render table.

    console.log(props.ord_D);
    let[usewrong,setwrong]=useState(false)


    function wrong(){

        console.log("wrong",props);
    
    //    setwrong(true)
       props.changeback()
    }
    let orderDetails = props.ord_D
    // let orderDetails = [
    //     {
    //         washItem: "Shirts",
    //         washType: "Washing,Ironing",
    //         priceDetails: "5 X 20 =",
    //         total:100
    //     }, {
    //         washItem: "Jeans",
    //         washType: "Washing,Ironing",
    //         priceDetails: "5 X 30 =",
    //         total:150
    //     }, {
    //         washItem: "Shirts",
    //         washType: "Washing,Ironing",
    //         priceDetails: "5 X 20 =",
    //         total:100
    //     }];
        const [store_address,set_storeAdd] = useState(false);
        const [user_add,set_userAdd] = useState(false)
        function get_storeAdd(e){
            console.log(e.target.value)
            let sel_data = e.target.value;

            if(sel_data !== "Choose..."){
                set_storeAdd(true)
            }else{
                set_storeAdd(false)

        }
    }
        function get_user_add(e){
            console.log(e.target.value);
            set_userAdd(true);
        }
        function confrim_order(e){
            e.preventDefault();
            if(store_address && user_add){
                // send details to backend  route ('/successfulLogin') in json formate.
                // if response status 200 then redirect  to '/sucessPopup' route.
                navigate('/sucessPopup')
            }
        }
        function comf_cancal(){
            props.confrimCancal(true);
            props.changeback()
        }
            
    return(
        
        <div className="summary_container">

            <div id="blur_container"></div>
            <div id="summary_header" >
                <div id='sum_head_cont'>
                    <h3>SUMMARY</h3>
                <h4 onClick={wrong}>X</h4>
                </div>
                <div id='store_details'>
                    <div>
                        <h6>Store Location:</h6>
                        <select id='options'onChange={get_storeAdd}>
                            <option>Choose...</option>
                            <option>Sidhi</option>
                        </select>
                    </div>
                    <div>
                    <h6>Store Address:</h6>
                    {store_address?<p>Near Smart Chowk Sidhi</p>:<p>__</p>}
                    
                    </div>
                    <div>
                        <h6>Phone </h6>
                        {store_address?<p>+919999999999</p>:<p>__</p>}
                        
                    </div>
                </div>
                {props.orderstatus?<div>enter</div>:""}
                <div className='order_summ_cont'>
                    <div>Order Details</div>
                    <div>
                        <table>
                            <thead></thead>
                            <tbody>
                        {orderDetails?.map((val,key)=>{
                            return(
                             
                                    <tr key={key}  id="summ_order">
                                    <td>{val.ordeerItem}</td>
                                    <td>{val.washType}</td>
                                    <td>{val.orderPriceDetails}</td>
                                    <td>{val.totalCost}</td>
                                </tr>
                                
                           
                            )
                        })}
                        
                        
                        <tr>
                            <td></td>
                            <td></td>
                            <td>Sub Total:</td>
                            <td>450</td>
                        </tr>
                        <tr>
                            <td></td>
                            <td></td>
                            <td>Pickup Charges:</td>
                            <td>90</td>
                        </tr>
                        </tbody>
                        <tfoot>
                        <tr id='grand_total_tr'>
                            <td></td>
                            <td></td>
                            <td>Total :</td>
                            <td> Rs 560</td>
                        </tr>
                        </tfoot>
                        </table>
                    </div>
                </div>
                <div >
                    <div id='add-heading'>Address</div>
                    <div id='Address_box'>
                        <div className='add_container'>
                        <input type="radio" id="html" name="address" value="address1" onChange={get_user_add}></input>
                            <h6>Home</h6>
                            <p>#223, 10th road, Jp Nagar, Bangalore</p>
                            
                        </div>
                        <div className='add_container'>
                        <input type="radio" id="html" name="address" value="address2" onChange={get_user_add}></input>
                            <h6>Other</h6>
                            <p>#223, 10th road, Jp Nagar, Bangalore</p>
                        </div>
                        {props.orderstatus?"":<div><h5>ADD NEW</h5></div>}

                    </div>
                </div>
                <div id='summ_footer'>
                   {props.orderstatus? <button style={{backgroundColor:"red",padding:"5px"}} onClick={()=>{props.cancalorder()}}>CancalOrder</button>: <button onClick={confrim_order} style={store_address && user_add?{backgroundColor:'#4552C1'}:{}}>Confirm</button>}
                </div>
            </div>
        </div>
    )
}

export default SummaryPage;