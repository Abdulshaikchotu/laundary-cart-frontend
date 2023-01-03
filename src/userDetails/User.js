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
import SuccessPopUp from "../SucessPopUp/popUp"
// import Orderpagesidebar from "../Orderpage/Orderpagesidebar"
let Userdetails = (props) => {
  let navigate = useNavigate()
  const [conf_can, setConf_can] = useState(false)
  const token = window.localStorage.getItem('token');
  const [name, set_name] = useState("");
  let [state, setstate] = useState([])
  let [sum,setsum]=useState(false);
  let [order_sum,set_order_sum]=useState(false);
 
  function summary_page(idx){
    console.log("ok")
    console.log(idx)
   console.log(state[idx].orderSummary)
   let orderSummary = state[idx].orderSummary;
   set_order_sum(orderSummary)
    setsum(true)
       
  }
  useEffect(() => {
    if (!token){
      navigate('/')
    }
    fetch("https://laundry-backend-i2fe.onrender.com/successfulLogin", {
      method: "get",
      headers: {
        authorization: token
      }
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        setstate(data.post[0].orders);
        set_name(data.post[0].name);
      })

  },[])
  function go_back_toUserD(){
    setsum(false)
  }
  return (
    <>
      {/* <Link to="/userdetails">create</Link> */}
       {conf_can?"":""}
      {sum?<SummaryPage orderstatus={true} changeback ={go_back_toUserD} ord_D={order_sum} confrimCancal={setConf_can} />:""}
      <Navbar After_Login={true} name={name} />
        {/* <Orderpagesidebar/> */}
      <div className="order-header">
        <h3 style={{marginLeft:"101px"}}>Orders|0</h3>
        <Link to="/Cardorderpage"><button style={{alignSelf:"center",padding:"7px 28px 6px 29px",color:"#5861AE"}}>create</button></Link>
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
                <td><i className="far fa-eye" key={i} onClick={()=>{summary_page(i)}}></i></td>
              </tr>
            </table>
            {/* {<h3>{ele.order_id}</h3>}
            {<h3>{ele.orderdate}</h3>}
            {<h3>{ele.location}</h3>}
            {<h3>{ele.city}</h3>}
            {<h3>{ele.phone}</h3>}
            {<h3>{ele.total_items}</h3>}
            {<h3>{ele.price}</h3>}
            {<h3>{ele.status}</h3>} */}

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