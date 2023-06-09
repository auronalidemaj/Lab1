import React, {useState, useEffect} from 'react'
import Slider from '../components/Slider'
import LatestProducts from '../components/LatestProducts'
import LatestNews from '../components/LatestNews'
import Contact from '../components/Contact'
import Newsletter from '../components/Newsletter'
import home from '../components/style/home.css'


import Axios from 'axios'
function Home() {
  const [role, setRole] = useState('')
  
  Axios.defaults.withCredentials = true;
  useEffect(() => {
    Axios.get("http://localhost:3001/login").then((response) => {
      if (response.data.loggedIn == true) {
        setRole(response.data.user[0].role);
      }
    });
  }, [])
  return (
    <>
    <div className='home-container'>
    <Slider/>
    <LatestProducts/>
    <LatestNews/>
    <Newsletter/>
    <Contact/>
    </div>

    </>
  )
}

export default Home