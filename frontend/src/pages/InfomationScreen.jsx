import React from 'react'
import { useContext, useEffect, useState } from 'react';
import { Store } from '../Store';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Axios from 'axios';
import { toast } from 'react-toastify';
import { publicRequest } from "../publicRequest.js";
const InfomationScreen = () => {
    const { state, dispatch: ctxDispatch } = useContext(Store);
    const { userInfo  } = state;
    const [name, setName] = useState(userInfo.name);
    const [phone, setPhone] = useState(userInfo.phone);
    const id = userInfo.id
    const submitHandler = async (e) => {
        e.preventDefault();
        try {
          await Axios.put(
            `${publicRequest}/updateUser`,
            {
              name,
              phone,
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
              <h1>ข้อมูลนักเรียน (Information)</h1>
          </div>
          <div className='form-ctn'>
              <form onSubmit={submitHandler}>
                  <div className='input'>
                      <label>ชื่อ-นามสกุล<br/>(Name)</label>
                      <input type="text" value={name}
                      onChange={(e) => setName(e.target.value)}
                     />
                  </div>
                  <div className='input'>
                      <label>เบอร์มือถือ<br/>(Mobile)</label>
                      <input type="text" value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                     />
                  </div>.
                  <div className='submit-ctn'>
                      <button >อัพเดทข้อมูล</button>
                  </div>
              </form>
          </div>
      </div>
  </div>
  )
}

export default InfomationScreen