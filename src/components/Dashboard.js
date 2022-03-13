import React,{useEffect} from 'react'
import axios from 'axios'
import { url } from '../App';
import { useNavigate } from 'react-router-dom'
function Dashboard() {

    let navigate = useNavigate();
    let auth = async()=>{
        let token = sessionStorage.getItem('token');
        if(token)
        {
            let res = await axios.get(`${url}/users/verify-token/${token}`)
            if(res.data.statusCode===401)
            {
                sessionStorage.clear();
                navigate('/login')

            }
        }
    }
    useEffect(()=>{
        const interval = setInterval(()=>{
           auth()
        },10000)
    },[])

  return (
    <div>

        <h1>This is a vaild session</h1>
    </div>
  )
}

export default Dashboard