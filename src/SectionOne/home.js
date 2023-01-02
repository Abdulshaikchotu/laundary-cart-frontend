import { Link } from "react-router-dom";
import './home.css'



   
function HomeSection(props) {
  console.log(props.change_login)

  return (
    <section className="home" style={props.change_login?{width:"42%"}:{}}>
      <div>
        <h1>Laundry <br /> Service</h1>
      </div>
      <div>
  
          <h5>
          Doorstep Wash & Dryclean Service
          </h5>
      
        <h6>
          {props.change_login?"Alredy Have Account":'Don`t Have An Account'}
        </h6>

        {/* <Link to='/register' ><button>Register</button> </Link>     
      </section> */}
    
      </div>
      <div>
        <Link to={props.change_login?'/':'/register'} ><button >{props.change_login?"Sign In":"Register"}</button> </Link>
      </div>
    </section>
  )
}
export default HomeSection;