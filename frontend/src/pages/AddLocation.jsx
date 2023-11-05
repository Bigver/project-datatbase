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
    const [address, setAddress] = useState('');
    const [name_location, setName] = useState('');
    const [img, setImg] = useState('');
    const [vdo, setVdo] = useState('');
    const [details, setDetails] = useState('');
    const [latitude, setLat] = useState();
    const [longitude, setLng] = useState();
    const [_id, setId] = useState();
    const tutor = tutorInfo.id
    const navigate = useNavigate();

    useEffect(() => {
        const getLocaion = async () => {
        try  {
            const res = await Axios.get(`${publicRequest}/updateTutor`);
            res.data.forEach(item => {
                if (item.id === tutor) {
                  setId(item._id)
                  setAddress(item.address)
                  setName(item.name_location)
                  setImg(item.img)
                  setVdo(item.vdo)
                  setDetails(item.details)
                  setLat(item.latitude)
                  setLng(item.longitude)
                } else {
                  console.log('Item does not meet the condition');
                }
              });
        } catch (err) {}
        };
        getLocaion();
    }, []);

    const DeleteHandler = async () => {
      if (window.confirm('Are you sure to delete?')) {
        try {
          await Axios.delete(`${publicRequest}/post/${_id}`);
          toast.success('ลบออกจากหน้าเว็บแล้ว');
          navigate("/")
        } catch (err) {
          toast.error(err);
        }
      }
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
          if (_id === undefined){
            await Axios.post(`${publicRequest}/post`, {
              address,
              tutor,
              name_location,
              img,
              vdo,
              details,
              longitude,
              latitude,
          });
          toast.success('create successfu');
          } else{
            await Axios.put(
              `${publicRequest}/post`,
              {
                address,
                tutor,
                name_location,
                img,
                vdo,
                details,
                longitude,
                latitude,
                _id
              },
            );
            toast.success('updated successfu');
          }
          navigate('/');
        } catch (err) {
          toast.error(err);
        }
      };
  return (
    <div className='auth-ctn'>
        <div className='f-ctn'>
            <div className='text'>
                <h1>ที่สอนพิเศษ</h1>
            </div>
            <div className='form-ctn'>
                <form onSubmit={submitHandler}>
                    <div className='input'>
                        <label>ชื่อที่สอนพิเศษ</label>
                        <input type="text" value={name_location}
                        onChange={(e) => setName(e.target.value)}/>
                    </div>
                    <div className='input'>
                        <label>ที่อยู่สถานที่<br/>(Adress)</label>
                        <input type="text" value={address}
                        onChange={(e) => setAddress(e.target.value)}/>
                    </div>
                    <div className='input'>
                        <label>รายละเอียด</label>
                        <input type="text"  value={details}
                        onChange={(e) => setDetails(e.target.value)}/>
                    </div>          
                    <div className='input'>
                        <label>รูปผลงานที่โดดเด่น</label>
                        <input type="text" value={img}
                        onChange={(e) => setImg(e.target.value)}/>
                    </div>
                    <div className='input'>
                        <label>วีดีโอตัวอย่าง</label>
                        <input type="text"  value={vdo}
                        onChange={(e) => setVdo(e.target.value)}/>
                    </div>
                    <h1>เพิ่มพิกัดเพื่อแสดง MAP</h1>
                    <div className='input'>
                        <label>Latitude</label>
                        <input type="text"  value={latitude}
                        onChange={(e) => setLat(e.target.value)}/>
                    </div>          
                    <div className='input'>
                        <label>Longitude</label>
                        <input type="text"  value={longitude}
                        onChange={(e) => setLng(e.target.value)}/>
                    </div>                                                                                      
                    <div className='submit-ctn'>
                        <button >อัพเดทข้อมูล</button>
                    </div>
                </form>
                {
                  _id != undefined ?  <div className='btn-d'><button className="delete" onClick={DeleteHandler}>ลบสถานที่เรียนพิเศษ</button></div> : ""
                }
            </div>
        </div>
    </div>
  )
}

export default InformationTutor