import React, {useEffect} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import UrlList from './UrlList';
import {
  useNavigate
} from "react-router-dom";
import './Layout.css'
function Layout() {
  let navigate = useNavigate();
  const signout=()=>{
    localStorage.removeItem('user');
    navigate("/login", { replace: true });

  }
  return (
    <div className="container">
      <div>
      <div>
			<button type='btn btn-primary relative' className='btn btn-primary mb-2' onClick={signout}>
				Sign Out
			</button>
			</div> 
      <UrlList />
      </div>
    </div>
  )
}

export default Layout
