import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbtack } from '@fortawesome/free-solid-svg-icons'
import { Link, } from 'react-router-dom';
import { useContext } from 'react';
import { Store } from '../Store';

const Navbar = () => {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { fullBox, cart, userInfo , tutorInfo } = state;
  const signoutHandler = () => {
    ctxDispatch({ type: 'USER_SIGNOUT' });
    localStorage.removeItem('userInfo');
    localStorage.removeItem('shippingAddress');
    localStorage.removeItem('paymentMethod');
    localStorage.removeItem('cartItems');
  };
  const signoutTutorHandler = () => {
    ctxDispatch({ type: 'TUTOR_SIGNOUT' });
    localStorage.removeItem('tutorInfo');
    localStorage.removeItem('shippingAddress');
    localStorage.removeItem('paymentMethod');
    localStorage.removeItem('cartItems');
  };
  return (
    <nav>
          <Link to="/">
            <div className='logo'>
              <img  src="https://www.muprivatetutor.com/assets/images/LOGO.png" alt="" />
            </div>
          </Link>
          <ul className='ul-'>
            {tutorInfo === null ? 
            (  <li>
              <a href="/login">{userInfo === null ? "สำหรับนักเรียน" : "ล็อคอินแล้ว"}</a>
              {userInfo != null
                 ? ( <ul>
                  <li><a href="/information">อัพเดทข้อมูล</a></li>
                  <li><a href={`/history/${userInfo.id}`}>ประวัติการสมัคร</a></li>
                  <li><a href="/" onClick={signoutHandler} >Logout</a></li>
                  </ul>
                  ) : null
              }
            </li> ): ""}
              {userInfo === null ? (<li className='li1'>
                <a href="/loginTutor">{tutorInfo === null ? "สำหรับติวเตอร์" : "ล็อคอินแล้ว"}</a>
                {tutorInfo != null
                   ? ( 
                    <ul>
                    <li><a href="/informationTutor">อัพเดทข้อมูล</a></li>
                    <li><a href={`/apply/${tutorInfo.id}`}>การสมัครเรียน</a></li>
                    <li><a href="/" onClick={signoutTutorHandler} >Logout</a></li>
                    </ul>
                    ) : null
                }
              </li>) : ""}
              {tutorInfo != null ? (<li className='li'><a href="/location" >เพิ่มข้อมูลที่สอนพิเศษ</a></li>) : "" }
          </ul>
      </nav>
  )
}

export default Navbar