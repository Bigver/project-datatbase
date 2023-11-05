import React from 'react'
import { useContext, useEffect, useState } from 'react';
import axios from "axios";
import { publicRequest } from "../publicRequest";
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Store } from '../Store';
import { toast } from 'react-toastify';


const ApplyScreen = () => {
    const params = useParams();
    const { id } = params;
    const [content, setContent] = useState([]);
    const { state, dispatch: ctxDispatch } = useContext(Store);
    const {  userInfo , tutorInfo } = state;
    const [_id, setId] = useState();
    const [payment, setPayment] = useState('โอนเงินแล้ว');
    const navigate = useNavigate();
    useEffect(() => {
      const getLocaion = async () => {
        try  {
          const res = await axios.get(`${publicRequest}/apply/tutor/${id}`);
          setContent(res.data);
        } catch (err) {}
      };
      getLocaion();
    }, []);
    const submitHandler = async (e) => {
      e.preventDefault();
      try {
        await axios.put(
          `${publicRequest}/apply`,
          {
            payment,
            _id
          },
        );
        toast.success('Update successfu');
        navigate(`/apply/${tutorInfo.id}`);
      } catch (err) {
        toast.error(err);
        console.log(อัพบ่ได้)
      }
    };
  return (
    <div>
        <div className='table'>
            <h1>ประวัติการสมัครเรียน</h1>
            <table className="container">
            <thead>
              <tr>
                <th>เวลาเรียน</th>
                <th>วันเเรียน</th>
                <th>การชำระเงิน</th>
                <th>สลิปการโอน</th>
                <th>ชื่อนักเรียน</th>
                <th>เบอร์โทร</th>
                <th>อัพเดทโอนเงิน</th>
              </tr>
            </thead>
            <tbody>
              {content.map((product) => (
                <tr key={product._id}>
                  <td>{product.learn}</td>
                  <td>{product.date}</td>
                  <td>{product.payment}</td>
                  <td><img src={product.imgPayment} alt="" /></td>
                  <td>{product.name}</td>
                  <td>{product.phone}</td>
                  <td>
                    <form onSubmit={submitHandler}>
                      <label htmlFor="">โอนแล้ว</label><br/>
                      <input type="checkbox" value={product._id}
                      onChange={(e) => setId(e.target.value)}/><br/>
                      <button>อัพเดท</button>
                    </form>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
    </div>
  )
}

export default ApplyScreen