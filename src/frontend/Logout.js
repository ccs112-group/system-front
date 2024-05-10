import React, {useEffect} from 'react';
import { useNavigate } from 'react-router-dom';

export default function Logout({emptyCart}) {
    
    const navigate =useNavigate();
    useEffect(()=>{
        if (localStorage.getItem('user-info')) {
            localStorage.removeItem('user-info');
            emptyCart();
            navigate('/login');
        }else {
            navigate('/login');
        }
    }, [])

  return (
    <div>Logout</div>
  )
}
