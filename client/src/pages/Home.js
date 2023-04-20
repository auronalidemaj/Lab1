import React, {useState, useEffect} from 'react'
import Slider from '../components/Slider'
import Dashboard from '../components/dashboard'
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
    {role == 'admin' && <Dashboard/>}

    </>
  )
}

export default Home