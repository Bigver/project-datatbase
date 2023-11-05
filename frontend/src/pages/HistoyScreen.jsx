import React from 'react'
import { useEffect, useState } from "react";
import axios from "axios";
import { publicRequest } from "../publicRequest";
import { Link, useNavigate, useParams } from 'react-router-dom';

const HistoyScreen = () => {
    const params = useParams();
    const { id } = params;
    const [content, setContent] = useState([]);
    useEffect(() => {
      const getLocaion = async () => {
        try  {
          const res = await axios.get(`${publicRequest}/apply/${id}`);
          setContent(res.data);
          console.log(res.data)
        } catch (err) {}
      };
      getLocaion();
    }, []);

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
                <th>ติวเตอร์</th>
                <th>เบอร์โทร</th>
                <th>สถานที่เรียน</th>
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
                  <td>{product.address}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
    </div>
  )
}

export default HistoyScreen