import React,{useState} from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { url } from '../App';
import SpinnerShow from './Spinner'

function Register() {
    let [name,setName] = useState("");
    let [email,setEmail] = useState("");
    let [password,setPassword]=useState("");
    let [mobile,setMobile] = useState("");
    let [spinner,setSpinner] = useState(false);

    let [message,setMessage] = useState("")

    let navigate = useNavigate();

    let handleSubmit = async()=>{
        setSpinner(true)
        let res = await axios.post(`${url}/users/register`,{
            name,email,password,mobile
        })
        if(res.data.statusCode===200)
        {
            setSpinner(false)
            navigate('/login');
        }
        else
        {
            setSpinner(false)
            setMessage(res.data.message);
        }
    }

  return (
    <div style={{"marginLeft":"30%","marginRight":"30%"}}>
      <Form>
      <Form.Group className="mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control type="text" placeholder="Name" onChange={(e)=>setName(e.target.value)}/>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" onChange={(e)=>setEmail(e.target.value)}/>
          
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>

        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" onChange={(e)=>setPassword(e.target.value)}/>
        </Form.Group>
       
        <Form.Group className="mb-3">
          <Form.Label>Mobile</Form.Label>
          <Form.Control type="text" placeholder="Mobile" onChange={(e)=>setMobile(e.target.value)}/>
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
  );
}

export default Register