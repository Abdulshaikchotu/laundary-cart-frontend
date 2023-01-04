import { useEffect, useState } from "react"
import CopyRight from "../FooterComp/copyright"
import Navbar from "../HeaderComp/navbar"
import "./user.css"
import searchphoto from "./mag.svg"
import userhome from "../logo/home.png"
import usermore from "../logo/more.png"
import userlist from "../logo/list@2x.png"
import { Link, redirect, useNavigate } from "react-router-dom"
import SummaryPage from "../SummaryPage/summary"
import Cancal from "../cancalorderpopup/cancal"
// import Orderpagesidebar from "../Orderpage/Orderpagesidebar"
let Userdetails = (props) => {
  const token = window.localStorage.getItem('token');
  const [name, set_name] = useState("");
  let [state, setstate] = useState([])
  let [sum,setsum]=useState(false)
  let [can,setcan]=useState(false)
  const [order_sum , set_order_sum] = useState();
  let [total_data,setTotal_data]= useState({})
  let [orde_id ,set_order_id] = useState("");
  let [status_ord, set_status_ord] = useState("")

 
  function ca(){
    setsum(false)
  }
  function procced (){
    setcan(true)
  }
  function summary_page(idx){
    
   console.log(state[idx].orderSummary)
   let orderSummary = state[idx].orderSummary;


   set_order_sum(orderSummary);
   let price  = state[idx].price;
   let totel_items = state[idx].total_item;
   total_data.price = price;
   total_data.total_item = totel_items;
   setTotal_data({price:price,tatal_item:totel_items})
   set_order_id(state[idx].order_id)
   
   
    setsum(true)
    
  }
  // console.log(props.updatecancal);
  let navigate = useNavigate()
  useEffect(() => {
    if(!token){
      navigate('/')
    }
    console.log(token)
    fetch("https://laundry-backend-i2fe.onrender.com/successfulLogin", {
      method: "get",
      headers: {
        authorization: token
      }
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data.post[0])
        setstate(data.post[0].orders);
        set_name(data.post[0].name);

      })

  }, [])
  function st_cancle(idx){
    state[idx].status = "Cancel"
  }
     

  return (
    <>
      {/* <Link to="/userdetails">create</Link> */}
      { can?<Cancal setcan={setcan} orderId = {orde_id} st_cancle={st_cancle}/>:""}
      {sum?<SummaryPage orderstatus={true} tData = {total_data} procced={procced} cancalorder={ca} data={order_sum}/>:""}
      {/* {props.updatecancal?<Cancal/>:""} */}
      <Navbar After_Login={true} name={name} />
        {/* <Orderpagesidebar/> */}
      <div className="order-header">
        <h3 style={{marginLeft:"101px"}}>Orders|0</h3>
        <Link to="/Cardorder"><button style={{alignSelf:"center",padding:"7px 28px 6px 29px",color:"#5861AE"}}>create</button></Link>

        <img  src={searchphoto} style={{width:"20px",alignSelf:"center"}}/>
        <input type={"search"} className="search-input"/>
      </div>
         <table  className="table-head" style={{backgroundColor:"black",color:"white"}}>
              <tr>
                <th>Order Id</th>


                <th>Order Date & Time</th>

                <th>Store Location</th>

                <th>City</th>

                <th> Store Phone</th>

                <th>Total items</th>

                <th> Price</th>

                <th>status</th>

                <th>View</th>
              </tr>
      </table>
      <div className="user-sidebar">
       <div><img  src={userhome} /></div>
       <div><img  src={usermore} /></div>
       <div><img  src={userlist} /></div>
      {state.map((ele, i) => {
        return <>
          <div  key={i}>
           <table className="data-table">
              <tr>
                <td>{ele.order_id}</td>
                <td>{ele.orderDate}</td>
                <td>{ele.location}</td>
                <td>{ele.city}</td>
                <td>{ele.phone}</td>
                <td>{ele.total_item}</td>
                <td style={{ color: "#5861AE" }}>{ele.price}</td>
                <td>{ele.status }</td>
                <td><i className="far fa-eye" key={i} onClick={()=>{summary_page(i);st_cancle(i)}}></i></td>
              </tr>
            </table>
           

          </div>
        
        </>
      })}
      </div>
      {/* <Orderpagesidebar/> */}
      
      <CopyRight />
    </>
  )
}

export default Userdetails