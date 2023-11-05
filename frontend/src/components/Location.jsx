import React from 'react'
import { useEffect, useState } from "react";
import axios from "axios";
import { publicRequest } from "../publicRequest";
import { Link } from 'react-router-dom';


const Location = () => {
    const [content, setContent] = useState([]);
  useEffect(() => {
    const getLocaion = async () => {
      try  {
        const res = await axios.get(`${publicRequest}/post`);
        setContent(res.data);
      } catch (err) {}
    };
    getLocaion();
  }, []);
  return (
      <div>
          <div className='location'>
              {content.map((item) => (
                    <Link to={`/location/${item._id}`} className='link' >
                        <div className='address'>
                          <img src={item.img} alt="" />
                          <div className='text'>
                            <h1>{item.name_location}</h1>
                            <p>
                              {item.details}
                            </p>
                          </div>
                          <div className='btn'> 
                            <button>ดูรายละเอียด</button>
                          </div>
                      </div>
                    </Link>
              ))}
          </div>
      </div>
  )
}

export default Location