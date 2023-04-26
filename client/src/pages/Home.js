import React, {useState, useEffect} from 'react'
import Slider from '../components/Slider'
import LatestProducts from '../components/LatestProducts'

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
    <Slider/>
    <LatestProducts/>


    </>
  )
}

export default Home