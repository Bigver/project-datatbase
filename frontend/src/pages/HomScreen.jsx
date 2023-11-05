import React from 'react'
import Location from '../components/location'
import img from '../img/banner-01.jpg'

const HomScreen = () => {
  return (
    <div className='home-ctn'>
      <div className='content'>
        <div className="text"> 
          <span>รวบรวมแหล่งสอนพิเศษ</span>
          <span className='span2'>จากติวเตอร์ทั่วประเทศ</span>
        </div>
      </div>
      <div className='location-ctn'>
        <h1>หาที่ <span>สอนพิเศษ</span> สำหรับคุณ</h1>
        <div className='location'>
          <Location/>
        </div>
      </div>
    </div>
  )
}

export default HomScreen