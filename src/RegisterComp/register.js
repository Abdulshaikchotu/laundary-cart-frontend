import { useRef, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Navbar from "../HeaderComp/navbar";
import HomeSection from "../SectionOne/home";
import FooterNav from "../FooterNavComp/footerNav";
import CopyRight from "../FooterComp/copyright";
import "./register.css";

const Url = "https://laundry-backend-i2fe.onrender.com/register";

function RegisterPage() {
  const form_data = useRef();
  let navigate = useNavigate();

  // State variables for error messages and form validity
  const [errors, setErrors] = useState({});
  const [formIsValid, setFormIsValid] = useState(true);

  async function Reg_User(e) {
    e.preventDefault();
    const data = {
      name: form_data.current.name.value,
      email: form_data.current.email.value,
      phone: form_data.current.phone.value,
      state: form_data.current.state.value,
      district: form_data.current.district.value,
      address: form_data.current.address.value,
      pincode: form_data.current.pincode.value,
      password: form_data.current.password.value,
    };

    // Form validation
    const validationErrors = {};

    if (!data.name) {
      validationErrors.name = "Name is required.";
    }

    if (!data.email) {
      validationErrors.email = "Email is required.";
    } else if (!isValidEmail(data.email)) {
      validationErrors.email = "Invalid email format.";
    }

    if (!data.phone) {
      validationErrors.phone = "Phone is required.";
    } else if (!isValidPhone(data.phone)) {
      validationErrors.phone = "Invalid phone number format.";
    }

    if (!data.state) {
      validationErrors.state = "State is required.";
    }

    if (!data.district) {
      validationErrors.district = "District is required.";
    }

    if (!data.address) {
      validationErrors.address = "Address is required.";
    }

    if (!data.pincode) {
      validationErrors.pincode = "Pincode is required.";
    } else if (!isValidPincode(data.pincode)) {
      validationErrors.pincode = "Invalid pincode format.";
    }

    if (!data.password) {
      validationErrors.password = "Password is required.";
    } else if (data.password.length < 8) {
      validationErrors.password = "Password must be at least 8 characters.";
    }

    // Add more validation rules for other fields as needed

    if (Object.keys(validationErrors).length > 0) {
      // There are validation errors
      setErrors(validationErrors);
      setFormIsValid(false);
      return;
    }

    try {
      const response = await axios.post(Url, data);
      if (response.status === 200) {
        navigate("/");
      }
    } catch (error) {
      // Handle the error if the registration request fails
      console.error(error);
      return alert(error.response.data.massage)
    }
  }

  // Helper functions for validation
  function isValidEmail(email) {
    // Add your email validation logic here
    // For a basic example, you can use a regular expression
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  }

  function isValidPhone(phone) {
    // Ensure the phone number contains only digits (0-9)
    // and has an exact length of 10 characters
    const phonePattern = /^[0-9]{10}$/;
    return phonePattern.test(phone);
  }
  
  

  function isValidPincode(pincode) {
    // Add your pincode validation logic here
    // For a basic example, you can use a regular expression
    const pincodePattern = /^\d{6}$/;
    return pincodePattern.test(pincode);
  }

  return (
    <>
      <Navbar />
      <div id="reg_container">
        <div>
          <HomeSection change_login={true} />
        </div>
        <div id="form_container">
          <h1>REGISTER</h1>
          <form ref={form_data}>
            <div className="input-group">
              <input type="text" placeholder="Name" id="name" required />
              <input type="email" placeholder="Email" id="email" />
            </div>
            {errors.name && <span className="error">{errors.name}</span>}
            {errors.email && <span className="error">{errors.email}</span>}
            <div className="input-group">
              <input type="text" placeholder="Phone" id="phone" />
              <input type="text" placeholder="State" id="state" />
            </div>
            {errors.phone && <span className="error">{errors.phone}</span>}
            {errors.state && <span className="error">{errors.state}</span>}
            <div className="input-group">
              <input type="text" placeholder="District" id="district" />
              <input type="text" placeholder="Address" id="address" />
            </div>
            {errors.district && <span className="error">{errors.district}</span>}
            {errors.address && <span className="error">{errors.address}</span>}
            <div className="input-group">
              <input type="text" placeholder="Pincode" id="pincode" />
              <input type="password" placeholder="Password" id="password" />
            </div>
            {errors.pincode && <span className="error">{errors.pincode}</span>}
            {errors.password && <span className="error">{errors.password}</span>}
            <div id="check_box">
              <input type={"checkbox"} id="checkbox" />
              <label htmlFor="checkbox">
                <Link to="#">
                  I agree to Terms & Condition receiving marketing and promotional materials
                </Link>
              </label>
            </div>
            <div>
              <button onClick={Reg_User} id="reg_btn">
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
      <FooterNav />
      <CopyRight />
    </>
  );
}

export default RegisterPage;
