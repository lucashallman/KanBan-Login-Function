import { useState, FormEvent, ChangeEvent } from "react";

import Auth from '../utils/auth';
import { login } from "../api/authAPI";

const Login = () => {
  const [loginData, setLoginData] = useState({
    username: '',
    password: ''
  });

  const [loginError, setLoginError] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    console.log("Login Data - ", loginData)
    try {
      //returns token in json object
      const data = await login(loginData);
      if (data.token) {
        setLoginError(false);
        Auth.login(data.token);
      } else {
        setLoginError(true);
      }

    } catch (err) {
      console.error('Failed to login - ', err);
      setLoginError(true);
    }
  };

  return (
    <div className='container'>
      <form className='form' onSubmit={handleSubmit}>
        <h1>Login</h1>
        <label >Username</label>
        <input
          type='text'
          name='username'
          value={loginData.username || ''}
          onChange={handleChange}
        />
        <label>Password</label>
        <input
          type='password'
          name='password'
          value={loginData.password || ''}
          onChange={handleChange}
        />
        { loginError ? 
        (
          <div className='loginError'>
            <h2>Incorrect credentials, try again.</h2>
          </div>
        ) : (
          <></>
        ) }
        <button type='submit'>Submit Form</button>
      </form>
    </div>

  )
};

export default Login;
