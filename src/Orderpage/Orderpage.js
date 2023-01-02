
import Orderpagenav from './Orderpagenav'
import Orderpagesidebar from './Orderpagesidebar'
import './Orderpage.css'
import { Link } from 'react-router-dom'
import CopyRight from '../FooterComp/copyright'
function Orderpage(){
    return(
        <div>
            <Orderpagenav></Orderpagenav>
            <span style={{'marginLeft':'30px','fontSize':'18px'}}> order |0</span>
            <span id='inputsearch'> <span><img src={require('../logo/search.jpg')}  id='simg' ></img></span><input></input></span>
            <div className='op'>
            <Orderpagesidebar></Orderpagesidebar>
            </div >
            <div  className='op' id='sec'>
                <div style={{'width':'25%','height':'25%','textAlign':'center'}}>
                  <span style={{'color':'#222B45'}}>  No order available</span>
                  <div>

               <Link to='/CreateOrder'> <button  style={{'border':'2px solid #5861AE','width':'90px','height':'25px','color':'#5861AE','marginTop':"10px",'borderRadius':'5px'}} >Create</button></Link>

                  </div>
                </div>
                </div> 
                <CopyRight></CopyRight>
        </div>
    )
}


export default Orderpage
