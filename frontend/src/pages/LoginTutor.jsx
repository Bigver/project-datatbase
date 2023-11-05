import React from 'react'
import { useContext, useEffect, useState } from 'react';
import { Store } from '../Store.jsx';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Axios from 'axios';
import { toast } from 'react-toastify';
import { publicRequest } from "../publicRequest.js";

const LoginTutor = () => {
    const navigate = useNavigate();
    const { search } = useLocation();
    const redirectInUrl = new URLSearchParams(search).get('redirect');
    const redirect = redirectInUrl ? redirectInUrl : '/';
  
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { state, dispatch: ctxDispatch } = useContext(Store);
    const { tutorInfo } = state;
    const submitHandler = async (e) => {
      e.preventDefault();
      try {
        const { data } = await Axios.post(`${publicRequest}/tutor/login`, {
          email,
          password,
        });
        ctxDispatch({ type: 'TUTOR_SIGNIN', payload: data });
        localStorage.setItem('tutorInfo', JSON.stringify(data));
        navigate(redirect || '/');
      } catch (err) {
        toast.error("email หริอ password ไม่ถูกต้อง");
      }
    };
    useEffect(() => {
        if (tutorInfo) {
          navigate(redirect);
        }
      }, [navigate, redirect, tutorInfo])
    
  return (
    <div className='auth-ctn'>
    <div className='f-ctn'>
        <div className='text'>
            <h1>เข้าสู่ระบบสำหรับติวเตอร์ (Login)</h1>
        </div>
        <div className='form-ctn'>
            <form onSubmit={submitHandler}>
                <div className='input'>
                    <label>อีเมล<br/>(Email address)</label>
                    <input type="text"
                    placeholder="Email"
                    name="email"
                    onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className='input'>
                    <label>รหัสผ่าน<br/>(Password)</label>
                    <input type="password"
                    placeholder="Password"
                    name="password"
                    onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <a href="/registerTutor" className='register'>สมัครสมาชิก (Register)</a>
                <div className='submit-ctn'>
                    <button >เข้าสู่ระบบ</button>
                </div>
            </form>
        </div>
    </div>
 </div>
  )
}

export default LoginTutor