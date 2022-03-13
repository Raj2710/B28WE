import React,{useState} from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { url } from '../App';
import SpinnerShow from './Spinner'

function Login() {
    let [email,setEmail] = useState("");
    let [password,setPassword]=useState("");
    let [message,setMessage] = useState("")
    let navigate = useNavigate();
    let [spinner,setSpinner] = useState(false);

    let handleSubmit = async()=>{
        setSpinner(true)
        let res = await axios.post(`${url}/users/login`,{
            email,password
        }) 
        if(res.data.statusCode===200)
        {
            sessionStorage.setItem('token',res.data.token)
            setSpinner(false)
            navigate('/dashboard');
        }
        else{
            setSpinner(false)
            setMessage(res.data.message);
        }
    }

  return  <div style={{"marginLeft":"30%","marginRight":"30%"}}>
  <Form>

    <Form.Group className="mb-3">
      <Form.Label>Email address</Form.Label>
      <Form.Control type="email" placeholder="Enter email" onChange={(e)=>setEmail(e.target.value)}/>
    </Form.Group>

    <Form.Group className="mb-3">
      <Form.Label>Password</Form.Label>
      <Form.Control type="password" placeholder="Password" onChange={(e)=>setPassword(e.target.value)}/>
    </Form.Group>

    <Button variant="primary" onClick={()=>handleSubmit()}>
      Submit
    </Button>
  </Form>
  {message?<>
        <div style={{"textAlign":"center","color":"red"}}>{message}</div>
      </>:<></>}
      {spinner?<SpinnerShow/>:<></>}
</div>
}

export default Login