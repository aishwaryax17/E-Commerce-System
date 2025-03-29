import React, { useState } from 'react';
import './CSS/LoginSignup.css';

const LoginSignup = () => {
    const [state, setState] = useState("Login");
    const [formData, setFormData] = useState({
        username: "",
        password: "",
        email: ""
    });

    const changeHandler = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const login = async () => {
        console.log("LoginForm Data:", formData); // Check if login form data is correct
        // Call your login API here with formData
        try {
            const response = await fetch('http://localhost:4000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();
            if (data.success) {
                localStorage.setItem('authtoken', data.token);
                window.location.replace("/");
            } else {
                alert(data.errors);
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred. Please try again later.');
        }
    };

    const signup = async () => {
        console.log("SignupForm Data:", formData); // Check if signup form data is correct
        // Call your signup API here with formData
        try {
            const response = await fetch('http://localhost:4000/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();
            if (data.success) {
                localStorage.setItem('authtoken', data.token);
                window.location.replace("/");
            } else {
                alert(data.errors);
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred. Please try again later.');
        }
    };

    return (
        <div className='loginsignup'>
            <div className="loginsignup-container">
                <h1>{state}</h1>
                <div className="loginsignup-fields">
                    {state === "Sign Up" && <input name="username" value={formData.username} onChange={changeHandler} type="text" placeholder="Your Name" />}
                    <input name="email" value={formData.email} onChange={changeHandler} type="email" placeholder="Email Address" />
                    <input name="password" value={formData.password} onChange={changeHandler} type="password" placeholder="Password" />
                </div>
                <button onClick={() => { state === "Login" ? login() : signup() }}>Continue</button>
                {state === "Sign Up"
                    ? <p className='loginsignup-login'>Already have an account?<span onClick={() => { setState("Login") }}>Login Here</span></p>
                    : <p className='loginsignup-login'>Create an account?<span onClick={() => { setState("Sign Up") }}>Click Here</span></p>
                }
                <div className="loginsignup-agree">
                    <input type="checkbox" name="" id="" />
                    <p>By continuing, I agree to the terms of use & privacy policy.</p>
                </div>
            </div>
        </div>
    );
};

export default LoginSignup;
