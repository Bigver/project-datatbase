import React from 'react'
import { useContext, useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Store } from '../Store';
import { toast } from 'react-toastify';
import { publicRequest } from "../publicRequest";
import Axios from 'axios';

const RegisterScreen = () => {
    const navigate = useNavigate();
    const { search } = useLocation();
    const redirectInUrl = new URLSearchParams(search).get('redirect');
    const redirect = redirectInUrl ? redirectInUrl : '/';

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');


    const { state, dispatch: ctxDispatch } = useContext(Store);
    const { userInfo } = state;
    const submitHandler = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
        toast.error('Passwords do not match');
        return;
        }
        try {
        const { data } = await Axios.post(`${publicRequest}/student/register`, {
            email,
            password,
            name,
            phone
        });
        ctxDispatch({ type: 'USER_SIGNIN', payload: data });
        localStorage.setItem('userInfo', JSON.stringify(data));
        navigate(redirect || '/');
        } catch (err) {
        toast.error("Email นี้มีการลงทะเบียนแล้ว");
        }
    };

    useEffect(() => {
        if (userInfo) {
        navigate(redirect);
        }
    }, [navigate, redirect, userInfo]);
  return (
    <div className='auth-ctn'>
      <div className='f-ctn'>
            <div className='text-1'>
                <h1>สมัครสมาชิกสำหรับนักเรียน (REGISTER)</h1>
            </div>
            <div className='form-ctn'>
                <form onSubmit={submitHandler}>
                    <div className='input'>
                        <label>อีเมล<br/>(Email address)</label>
                        <input type="email" 
                        onChange={(e) => setEmail(e.target.value)} required/>
                    </div>
                    <div className='input'>
                        <label>รหัสผ่าน<br/>(Password)</label>
                        <input type="password" 
                        onChange={(e) => setPassword(e.target.value)} required/>
                    </div>
                    <div className='input'>
                        <label>รหัสผ่าน<br/>(confirmPassword)</label>
                        <input type="password"
                        onChange={(e) => setConfirmPassword(e.target.value)} required/>
                    </div>
                    <div className='input'>
                        <label>ชื่อ-นามสกุล<br/>(Name)</label>
                        <input type="text" 
                        onChange={(e) => setName(e.target.value)} required/>
                    </div>
                    <div className='input'>
                        <label>เบอร์มือถือ<br/>(Mobile)</label>
                        <input type="text" 
                        onChange={(e) => setPhone(e.target.value)} required/>
                    </div>.
                    <div className='submit-ctn'>
                        <button >สมัครสมาชิก</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
  )
}

export default RegisterScreen
