import React from 'react'
import { Store } from '../Store';
import { Link, useNavigate } from 'react-router-dom';
import { publicRequest } from "../publicRequest";
import { toast } from 'react-toastify';
import { useContext, useEffect, useState } from 'react';
import Axios from 'axios';



const PaymentScreen = () => {
  const navigate = useNavigate();
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const [learn, setLearn] = useState('');
  const [date1, setDate1] = useState('');
  const [date2, setDate2] = useState('');
  const [date3, setDate3] = useState('');
  const [date4, setDate4] = useState('');
  const [date5, setDate5] = useState('');
  const [date6, setDate6] = useState('');
  const [date7, setDate7] = useState('');
  const [payment, setPayment] = useState('กำลังตรวจสอบ');
  const [imgPayment, setImgPayment] = useState([]);

  const date = date1 + date2 + date3 + date4 + date5 + date6 + date7
  const {
    cart: { cartItems },
  } = state;
  const {  userInfo , tutorInfo } = state;

  const removeItemHandler = (item) => {
    ctxDispatch({ type: 'CART_REMOVE_ITEM', payload: item });
  };

 
  if (cartItems.length === 2){
    removeItemHandler(cartItems[0])
  }
  


  useEffect(() => {
    if (userInfo.id === null) {
      navigate('/?redirect=/payment');
    }
  }, [userInfo, navigate]);

  
  const student_id = userInfo.id
  const location_id = cartItems[0]._id

  const item = cartItems[0]
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await Axios.post(
        `${publicRequest}/apply`,
        {
          payment,
          learn,
          student_id,
          location_id,
          date,
          imgPayment
        },
      );
      toast.success('Post successfu');
      navigate(`/history/${userInfo.id}`);
    } catch (err) {
      toast.error(err);
      console.log(อัพบ่ได้)
    }
  };

  const uploadFileHandler = async (e, forImages) => {
    const file = e.target.files[0];
    const bodyFormData = new FormData();
    bodyFormData.append('file', file);
    try {
      const { data } = await Axios.post(`${publicRequest}/upload`, bodyFormData);
      setImgPayment(data.secure_url);
      toast.success('Image uploaded successfully. click Update to apply it');
    } catch (err) {
      toast.error("อัพโหลดไม่ได้");
      console.log(err)
    }
  };


  return (
    <div className='auth-ctn'>
      <div className='f-ctn'>
          <div className='text-1'>
              <h1>สมัครเรียน</h1>
          </div>
          <div className='form-ctn2'>
            <div className='tutor'>
              <h1>ชื่อติวเตอร์ {item.name}</h1>
              <h1>เบอร์โทร {item.phone}</h1>
              <h1>ชำระเงินโอนผ่านธนาคาร</h1>
              <h1>ชื่อบัญชี {item.account}</h1>
              <h1>ธนาคาร {item.bankName}</h1>
              <h1>เลขบัญชี {item.bankNumber}</h1>
              <h1>ราคา {item.price} บาท</h1>
              {
                imgPayment != '' ?               
                <img src={imgPayment} alt="" className='imgPayment'/> : ""
              }
            </div>
              <form onSubmit={submitHandler}>
                  <div>
                    <h1>เลือกเวลาเรียน</h1>
                      <input type="radio" id="html" name="fav_language" value="9.00-12.00" onChange={(e) => setLearn(e.target.value)}/>
                      <label for="9.00-12.00">9.00-12.00</label><br/>
                      <input type="radio" id="css" name="fav_language" value="13.00-15.00" onChange={(e) => setLearn(e.target.value)}/>
                      <label for="13.00-15.00">13.00-15.00</label><br/>
                      <input type="radio" id="javascript" name="fav_language" value="17.00-19.00" onChange={(e) => setLearn(e.target.value)}/>
                      <label for="17.00-19.00">17.00-19.00</label>
                  </div>
                  <div> 
                  <h1>เลือกวันเรียน</h1>
                    <input type="checkbox" id="vehicle1" name="vehicle1" value="จันทร์"  onChange={(e) => setDate1(e.target.value)}/>
                    <label for="vehicle1">จันทร์</label><br/>
                    <input type="checkbox" id="vehicle2" name="vehicle2" value="อังคาร"  onChange={(e) => setDate2(e.target.value)}/>
                    <label for="vehicle2">อังคาร</label><br/>
                    <input type="checkbox" id="vehicle3" name="vehicle3" value="พุธ"  onChange={(e) => setDate3(e.target.value)}/>
                    <label for="vehicle3">พุธ</label><br/>
                    <input type="checkbox" id="vehicle3" name="vehicle3" value="พฤหัสบดี" onChange={(e) => setDate4(e.target.value)}/>
                    <label for="vehicle3">พฤหัสบดี</label><br/>
                    <input type="checkbox" id="vehicle3" name="vehicle3" value="ศุกร์" onChange={(e) => setDate5(e.target.value)}/>
                    <label for="vehicle3">ศุกร์</label><br/>
                    <input type="checkbox" id="vehicle3" name="vehicle3" value="เสาร์" onChange={(e) => setDate6(e.target.value)}/>
                    <label for="vehicle3">เสาร์</label><br/>
                    <input type="checkbox" id="vehicle3" name="vehicle3" value="อาทิตย์" onChange={(e) => setDate7(e.target.value)}/>
                    <label for="vehicle3">อาทิตย์</label><br/>
                  </div>
                    <div>
                      <h1>กรุณาอัพโหลดสลิปโอนเงิน</h1>
                      <input type="file" onChange={uploadFileHandler}  />
                    </div>
                  <div className='submit-ctn'>
                      <button >สมัครเรียน</button>
                  </div>
              </form>
          </div>
      </div>
  </div>
  )
}

export default PaymentScreen