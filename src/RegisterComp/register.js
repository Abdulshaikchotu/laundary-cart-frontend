import { useRef } from "react";
import axios  from 'axios'
import Navbar from "../HeaderComp/navbar";
import HomeSection from "../SectionOne/home";
import FooterNav from "../FooterNavComp/footerNav";
import CopyRight from "../FooterComp/copyright";
import './register.css'
import { Link,  } from "react-router-dom";
import { useNavigate } from "react-router-dom";


const Url = "https://lokesh-laundry-cart-backend.onrender.com/register"
function RegisterPage(){
    const form_data = useRef();
    let navigate = useNavigate();
    async function Reg_User(e){
        e.preventDefault()
        const  data = {
            name:form_data.current.name.value,
            email:form_data.current.email.value,
            phone:form_data.current.phone.value,
            state:form_data.current.state.value,
            district:form_data.current.district.value,
            address:form_data.current.address.value,
            pincode:form_data.current.pincode.value,
            password:form_data.current.password.value
        }
        const response = await axios.post(Url,data)
        console.log(response.status)
        if(response.status === 200){
            navigate('/')
        }
    }
    return(
        <>
            <Navbar/>
            <div id="reg_container">
                <div>
                    <HomeSection change_login={true}/>
                </div>
                <div id="form_container">
                    <h1>REGISTER</h1>
                    <form ref={form_data}>
                        <div>
                        <input type="text" placeholder="Name" id="name" />
                        <input type="email" placeholder="Email" id="email" />
                        </div>
                        <div>
                        <input type="tel" placeholder="Phone" id="phone" />
                        <input type="text" placeholder="State" id="state" />
                        </div>
                        <div>
                        <input type="text" placeholder="District" id="district" />
                        <input type="text" placeholder="Address" id="address" />
                        </div>
                        <div>
                        <input type="text" placeholder="Pincode" id="pincode" />
                        <input type="password" placeholder="Password" id="password" />
                        </div>
                        <div id="check_box">
                            <input type={'checkbox'} id="checkbox"/>
                            <label htmlFor="checkbox"><Link to="#">I agree to Terms & Condition receiving marketing and promotional materials</Link></label>
                        </div>
                        <div>
                        <button onClick={Reg_User}id='reg_btn'>Register</button>
                        </div>
                    </form>
                </div>
            </div>
            <FooterNav/>
            <CopyRight/>
        </>
    )
}

export default RegisterPage;