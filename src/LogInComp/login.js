import axios from 'axios';
import { useState } from 'react';
import './login.css'
import { useNavigate } from "react-router-dom";
 
//url for login
const Url = "https://laundry-backend-i2fe.onrender.com/login"


function LogInForm() {
  let navigate = useNavigate();
  const [user_name, setUser_name] = useState("");
  const [user_password, setUser_password] = useState("");
  const [user_id_lable, set_user_id_lable] = useState(false);
  const [user_pass_lable, set_user_pass_lable] = useState(false);
  const [col, set_color] = useState(false)
  function userId(e) {
    let id = e.target.value;
    if (!isNaN(id)) {
      if ((!isNaN(id)) && (id.length === 13)) {
        setUser_name(id)
        set_color(false)
        return;
      } else {
        console.log("number is invalid")
        set_color(true)

      }
    } else {
      if (/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(id)) {
        console.log("email is valid")
        setUser_name(id)
        set_color(false)
      }
      else {
        return alert("Please enter valid Email")
      }
    }
  }


  async function logIn(e) {
    e.preventDefault();
    if (user_name === "" || user_password === "") {
      return alert("Please fill all the credentials!!");
    }
    const data = {
      email: user_name,
      password: user_password
    };
  
    try {
      const response = await axios.post(Url, data);
      console.log(response.status);
  
      if (response.data.status === "success") {
        window.localStorage.setItem("token", response.data.token);
        console.log(window.localStorage.getItem("token"));
        navigate('/userdetails');
      } 
    } catch (error) {
      // Handle network errors or other unexpected errors
      console.error(error);
      return alert(error.response.data.message);
    }
  }
  

  return (
    <div className='login'>
      <div>
        <h3>SIGN IN</h3>
      </div>
      <div>
        {user_id_lable ? <label htmlFor="user_name">Email<br /></label> : ""}
        <input type="text" placeholder="Email" onBlur={userId} id="user_name"
          onClick={() => set_user_id_lable(true)} style={col ? { color: 'red', borderBottomColor: 'red' } : {}} />
        {col ? <h6> <i style={{ color: 'red', fontSize: '10px', textAlign: 'right', fontWeight: 'lighter' }}>
          Please enter a valid phone number</i></h6> : ""}
      </div>
      <div id='pass_container'>
        {user_pass_lable ? <label htmlFor="user_password">Password<br /></label> : ""}
        <input type="password" placeholder="Password" onBlur={(e) => setUser_password(e.target.value)}
          id="user_password" onClick={() => set_user_pass_lable(true)} />
      </div>
      <div>
        <h6>Forget Password?</h6>

      </div>
      <div id='signInBtn'>
        <button onClick={logIn}>Sign In</button>
          </div>
      </div>
      
    )
}

export default LogInForm;
