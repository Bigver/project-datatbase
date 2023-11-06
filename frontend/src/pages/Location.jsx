import React from 'react'
import axios from 'axios';
import { useContext, useEffect, useReducer, useRef, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Store } from '../Store';
import { toast } from 'react-toastify';
import { publicRequest } from "../publicRequest";
import img1 from '../img/pngwing.com.png'
import img2 from '../img/Highlight-Your-Business-Certifications-and-Expertise.jpg'
import img3 from '../img/monochrome-experience-sign-icon-vector-37624675.webp'
import img4 from '../img/language-arts-black-glyph-icon-vector-39532164.webp'
import Map from '../components/Map';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const reducer = (state, action) => {
  switch (action.type) {
    case 'REFRESH_PRODUCT':
      return { ...state, product: action.payload };
    case 'CREATE_REQUEST':
      return { ...state, loadingCreateReview: true };
    case 'CREATE_SUCCESS':
      return { ...state, loadingCreateReview: false };
    case 'CREATE_FAIL':
      return { ...state, loadingCreateReview: false };
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return { ...state, product: action.payload, loading: false };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

// 

const Location = () => {
    const params = useParams();
    const { id } = params;
    useEffect(() => {
        const fetchData = async () => {
          dispatch({ type: 'FETCH_REQUEST' });
          try {
            const res = await axios.get(`${publicRequest}/post/${id}`);
            dispatch({ type: 'FETCH_SUCCESS', payload: res.data[0] });
          } catch (err) {
            dispatch({ type: 'FETCH_FAIL', payload: console.log(err) });
          }
          
        };
        fetchData();
      }, [id]);



    const [{  product  }, dispatch] =
    useReducer(reducer, {
      product: [],
      loading: true,
      error: '',
    });

    const navigate = useNavigate();
    const { state, dispatch: ctxDispatch } = useContext(Store);
    const { cart, userInfo , tutorInfo } = state;
  
    const addToCartHandler = async () => {
      const existItem = cart.cartItems.find((x) => x._id === product._id);
      const quantity = existItem ? existItem.quantity + 1 : 1;
      ctxDispatch({
        type: 'CART_ADD_ITEM',
        payload: { ...product, quantity },
      });
      if (tutorInfo != undefined){
        navigate('/');
        toast.error("ต้องสมัครสมาชิกเป็นนักเรียนเท่านั้น");
      } else{
        if (userInfo != undefined){
          navigate('/payment');    
        } else{
          navigate('/login');    
        }
      }
    };
      
  const latitude= product.latitude
  const longitude= product.longitude
   
  const mapA = {
    lat : latitude,
    lng : longitude 
  }
  return (
    <div className='location-ctn1'>
      <div className='location'>
        <img src={product.img} alt="" />
        <div className="text">
          <h1>{product.name_location}</h1>
          <p>{product.details}</p>
          <p>{product.address}</p>
          <div className='price'>
            <h1>ราคา {product.price} ฿</h1>
            <button onClick={addToCartHandler}>สมัครเรียน</button>
          </div>
        </div>
      </div>
      <div className='tutor'>
          <div className='border'></div>
          <div className="text">
            <div className='name'>
              <img src={img1} alt="" />
              <div className='font'>
                <h1>ชื่อติวเตอร์</h1>
                <p>{product.name}</p>
              </div>
            </div>
            <div className='name'>
              <img src={img2} alt=""  className='img2'/>
              <div className='font'>
                <h1>สอนทั้งหมด</h1>
                <p>{product.expertise}</p>
              </div>
            </div>
          </div>
          <div className='border'></div>
          <div className="text">
          <div className='name'>
              <img src={img3} alt="" />
              <div className='font'>
                <h1>ประสบการณ์สอน</h1>
                <p>{product.expertise}</p>
              </div>
            </div>
            <div className='name'>
              <img src={img4} alt=""  className='img4'/>
              <div className='font'>
                <h1>วิชาที่สอน</h1>
                <p>{product.subject}</p>
              </div>
            </div>
          </div>
          <div className='border'></div>
          <div className='text-vdo'><h1>VDO ตัวอย่างการสอน</h1></div>
          <iframe width="420" height="315"
            src={product.vdo>
          </iframe>
            <div className='map'>
            <h1>แผ่นที่ที่ตั้ง</h1>
            <LoadScript
              googleMapsApiKey="AIzaSyBP_Vcx-qcm1i0Ul3FHWLgrVyeIaj6_hmY" // Replace with your actual Google Maps API key
            >
              <GoogleMap
                id="example-map"
                mapContainerStyle={{
                  width: '100%',
                  height: '40vh',
                }}
                zoom={10}
                center={mapA}
              >
                <Marker position={mapA} />
              </GoogleMap>
            </LoadScript>
          </div>
      </div>
    </div>
  )
}

export default Location
