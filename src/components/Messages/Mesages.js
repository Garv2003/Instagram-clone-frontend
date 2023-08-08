import React, { useEffect, useState } from 'react'
import './Messages.css';
import axios from 'axios';

const Mesages = () => {
    const [user,setuser]=useState([]);
    useEffect(()=>{
        getuser();
    },[]);

    const getuser=()=>{

    }

  return (
    <div className='messages'>
        <div className='message_left'>

        </div>
        <div className='message_right'>

        </div>
    </div>
  )
}

export default Mesages