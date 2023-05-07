import React, {useState, useEffect} from 'react'
import Slider from '../components/Slider'
import LatestProducts from '../components/LatestProducts'
import Contact from '../components/Contact'
import News from '../pages/News'
import index from '../components/style/index.css'


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
    <News/>
    <Contact/>
    </div>

    </>
  )
}

export default Home