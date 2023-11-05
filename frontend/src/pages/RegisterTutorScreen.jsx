import React from 'react'
import { useContext, useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Store } from '../Store';
import { toast } from 'react-toastify';
import { publicRequest } from "../publicRequest";
import Axios from 'axios';

const RegisterTutorScreenn = () => {
    const navigate = useNavigate();
    const { search } = useLocation();
    const redirectInUrl = new URLSearchParams(search).get('redirect');
    const redirect = redirectInUrl ? redirectInUrl : '/';

   
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [name, setName] = useState('');
    const [expertise, setExpertise] = useState('');
    const [experience, setExperience] = useState('');
    const [subject, setSubject] = useState('');
    const [price, setPrice] = useState('');
    const [phone, setPhone] = useState('');
    const [account, setAccount] = useState('');
    const [bankNumber, setBankNumber] = useState('');
    const [bankName, setBankName] = useState('');


    const { state, dispatch: ctxDispatch } = useContext(Store);
    const { tutorInfo } = state;
    const submitHandler = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
        toast.error('Passwords do not match');
        return;
        }
        try {
        const { data } = await Axios.post(`${publicRequest}/tutor/register`, {
            email,
            password,
            name,
            expertise,
            experience,
            subject,
            price,
            phone,
            account,
            bankNumber,
            bankName,
        });
        console.log(data);
        ctxDispatch({ type: 'TUTOR_SIGNIN', payload: data });
        localStorage.setItem('userInfo', JSON.stringify(data));
        navigate(redirect || '/');
        } catch (err) {
        toast.error("Email นี้มีการลงทะเบียนแล้ว");
        }
    };
    useEffect(() => {
        if (tutorInfo) {
        navigate(redirect);
        }
    }, [navigate, redirect, tutorInfo]);
  return (
    <div className='auth-ctn'>
        <div className='f-ctn'>
            <div className='text-1'>
                <h1>สมัครสมาชิกสำหรับติวเตอร์ (REGISTER)</h1>
            </div>
            <div className='form-ctn'>
                <form  onSubmit={submitHandler}>
                    <div className='input'>
                        <label>อีเมล<br/>(Email address)</label>
                        <input type="text" 
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
                        <label>ความเชี่ยวชาญ<br/>(expertise)</label>
                        <input type="text" 
                        onChange={(e) => setExpertise(e.target.value)} required/>
                    </div>
                    <div className='input'>
                        <label>ประสบการณ์<br/>(experience)</label>
                        <input type="text" 
                        onChange={(e) => setExperience(e.target.value)} required/>
                    </div>
                    <div className='input'>
                        <label>วิชาที่สอน<br/>(subject)</label>
                        <input type="text" 
                        onChange={(e) => setSubject(e.target.value)} required/>
                    </div>
                    <div className='input'>
                        <label>ราคาคอร์ส<br/>(price)</label>
                        <input type="number" 
                        onChange={(e) => setPrice(e.target.value)} required/>
                    </div>
                    <div className='input'>
                        <label>เบอร์มือถือ<br/>(Mobile)</label>
                        <input type="text" 
                        onChange={(e) => setPhone(e.target.value)} required/>
                    </div>
                    <div className='input'>
                        <label>ชื่อบัญชี<br/>(Account name)</label>
                        <input type="text" 
                        onChange={(e) => setAccount(e.target.value)} required/>
                    </div>
                    <div className='input'>
                        <label>ธนาคาร<br/>(Bank)</label>
                        <input type="text" 
                        onChange={(e) => setBankName(e.target.value)} required/>
                    </div>
                    <div className='input'>
                        <label>เลขธนาคาร<br/>(Bank number)</label>
                        <input type="text" 
                        onChange={(e) => setBankNumber(e.target.value)} required/>
                    </div>
                    <div className='submit-ctn'>
                        <button >สมัครสมาชิก</button>
                    </div>
                </form>
            </div>
        </div>
     </div>
  )
}

export default RegisterTutorScreenn