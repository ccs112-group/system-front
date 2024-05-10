import React, {useState} from 'react';
import { Link, useNavigate } from "react-router-dom";

export default function Header({items, setSearchData}) {
    const [query, setQuery] = useState('');
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user-info'));

    async function search(){
        let result =await fetch('http://127.0.0.1:8000/api/search/'+query);
        result= await result.json();
        
        if (result) {
            setSearchData(result);
            navigate("/search"); 
         }else{
             ;
             console.log(result);
             navigate('/massage');
         }
    }

  return (
    <div>
        {console.warn(query)}
        <nav className="navbar navbar-expand-lg navbar-dark bg-info">
            <div className="container px-4 px-lg-5">
            <div className='logo-container'>
          <label className='logo'>SOLIDD <span>PARTS</span></label>
        </div>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                        <Link className="nav-link text-white fw-bold" aria-current="page" to="/">Home</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link text-white fw-bold" aria-current="page" to="/shop">Shop</Link>
                    </li>
                    
                </ul>
                
                <div className="d-flex">
                    <Link to="/cartlist"className="nav-link text-white fw-bold" aria-current="page" ><i className=""></i> Cart</Link>
                </div>
                <div className="d-flex nav-item dropdown">
                    {
                    user && <>
                                <Link className="nav-link dropdown-toggle text-white" to="#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">{user.name}</Link>
                                <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                        
                                    <li><Link className="dropdown-item" to="/logout">Logout</Link></li>
                                </ul> 
                            </>
                    }
                </div>
                <div className="d-flex nav-item dropdown">
                    {!user ? <Link className="nav-link text-white" to="/login">Login</Link> : ''}
                </div>
                <div className="d-flex nav-item">
                    {!user ? <Link className="nav-link text-white" to="/register">Register</Link> : ''}
                </div>
                </div>
            </div>
        </nav>
    </div>
  )
}
