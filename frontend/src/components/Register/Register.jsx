import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confPassword, setConfPassword] = useState('');
    const [msg, setMsg] = useState('');
    const navigate = useNavigate();

    const Register = async(e) => {
        e.preventDefault();
        try{
            await axios.post('http://localhost:5000/user', {
                name: name,
                email: email,
                password: password,
                confirmPassword: confPassword
            });
            navigate({ pathname: '/' });
        } catch (err) {
            if(err.response) {
                setMsg(err.response.data.msg);
            }
        }
    }

  return (
    <section className="vh-100%" style={{backgroundImage: 'linear-gradient(to right, blue, red)'}}>
        <div className='container vh-100'>
            <div className='d-flex justify-content-center align-items-center h-100'>
            <div className='card p5 col-0 col-md-8 col-lg-6 col-xl-5 text-center shadow' style={{borderRadius: '20px', backgroundColor: 'rgba(255, 255, 255, 0.9)'}}>
                    <h3 className='m-4 text-center' style={{color: 'rgb(51, 51, 51)'}}>Register</h3>
                    <p className='text-center'>{msg ? msg : ''}</p>
                    <form onSubmit={ Register }>
                        <div style={{margin:'0px 20px 20px 20px'}}>
                            <input type="text" className='form-control form-control-lg' placeholder='Username' value={ name } onChange={(e) => setName(e.target.value)} required={true} />
                        </div>

                        <div style={{margin:'0px 20px 20px 20px'}}>
                            <input type="email" className='form-control form-control-lg' placeholder='Email' value={ email } onChange={(e) => setEmail(e.target.value)} required={true} />
                        </div>

                        <div style={{margin:'0px 20px 20px 20px'}}>
                            <input type="password" className='form-control form-control-lg' placeholder='Password' value={ password } onChange={(e) => setPassword(e.target.value)} required={true} />
                        </div>

                        <div style={{margin:'0px 20px 20px 20px'}}>
                            <input type="password" className='form-control form-control-lg' placeholder='Confirm Password' value={ confPassword }  onChange={(e) => setConfPassword(e.target.value)} required={true} />
                        </div>

                        <button className='btn btn-primary btn-lg shadow' style={{border: 'none', margin: '20px 50px 40px 50px', color: 'white'}} onClick={() => Register} >
                            Register
                        </button>     
                    </form>

               
                </div>               
            </div>
        </div>
    </section>
  )
}

export default Register