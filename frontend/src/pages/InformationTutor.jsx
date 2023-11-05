import React from 'react'
import { useContext, useEffect, useState } from 'react';
import { Store } from '../Store';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Axios from 'axios';
import { toast } from 'react-toastify';
import { publicRequest } from "../publicRequest.js";



const InformationTutor = () => {
    const { state, dispatch: ctxDispatch } = useContext(Store);
    const { tutorInfo  } = state;
    const [phone, setPhone] = useState(tutorInfo.phone);
    const [name, setName] = useState(tutorInfo.name);
    const [expertise, setExpertise] = useState(tutorInfo.expertise);
    const [experience, setExperience] = useState(tutorInfo.experience);
    const [subject, setSubject] = useState(tutorInfo.subject);
    const [price, setPrice] = useState(tutorInfo.price);
    const [account, setAccount] = useState(tutorInfo.account);
    const [bankNumber, setBankNumber] = useState(tutorInfo.bankNumber);
    const [bankName, setBankName] = useState(tutorInfo.bankName);
    const id = tutorInfo.id
    console.log(tutorInfo)
    console.log(tutorInfo)
    const submitHandler = async (e) => {
        e.preventDefault();
        try {
          await Axios.put(
            `${publicRequest}/updateTutor`,
            {
              name,
              expertise,
              experience,
              subject,
              price,
              phone,
              account,
              bankNumber,
              bankName,
              id
            },
          );
          toast.success('updated successfu');
          navigate('/');
        } catch (err) {
          toast.error(err);
        }
      };
  return (
    <div className='auth-ctn'>
        <div className='f-ctn'>
            <div className='text'>
                <h1>ข้อมูลติวเตอร์ (Information)</h1>
            </div>
            <div className='form-ctn'>
                <form onSubmit={submitHandler}>
                    <div className='input'>
                        <label>ชื่อ-นามสกุล<br/>(Name)</label>
                        <input type="text" value={name}
                        onChange={(e) => setName(e.target.value)}/>
                    </div>
                    <div className='input'>
                        <label>ความเชี่ยวชาญ<br/>(expertise)</label>
                        <input type="text" value={expertise}
                        onChange={(e) => setExpertise(e.target.value)}/>
                    </div>
                    <div className='input'>
                        <label>ประสบการณ์<br/>(experience)</label>
                        <input type="text" value={experience}
                        onChange={(e) => setExperience(e.target.value)}/>
                    </div>
                    <div className='input'>
                        <label>วิชาที่สอน<br/>(subject)</label>
                        <input type="text"  value={subject}
                        onChange={(e) => setSubject(e.target.value)}/>
                    </div>
                    <div className='input'>
                        <label>ราคาคอร์ส<br/>(price)</label>
                        <input type="number" value={price}
                        onChange={(e) => setPrice(e.target.value)}/>
                    </div>
                    <div className='input'>
                        <label>เบอร์มือถือ<br/>(Mobile)</label>
                        <input type="text" value={phone}
                        onChange={(e) => setPhone(e.target.value)}/>
                    </div>
                    <div className='input'>
                        <label>ชื่อบัญชี<br/>(Account name)</label>
                        <input type="text" value={account}
                        onChange={(e) => setAccount(e.target.value)} required/>
                    </div>
                    <div className='input'>
                        <label>ธนาคาร<br/>(Bank)</label>
                        <input type="text" value={bankName}
                        onChange={(e) => setBankName(e.target.value)} required/>
                    </div>
                    <div className='input'>
                        <label>เลขธนาคาร<br/>(Bank number)</label>
                        <input type="text" value={bankNumber}
                        onChange={(e) => setBankNumber(e.target.value)} required/>
                    </div>                                                                                               
                    <div className='submit-ctn'>
                        <button >อัพเดทข้อมูล</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
  )
}

export default InformationTutor