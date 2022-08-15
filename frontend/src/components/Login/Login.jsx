import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [msg, setMsg] = useState('');
    const navigate = useNavigate();

    const redirect = (e) => {
        e.preventDefault();
        navigate({ pathname: '/register' });
    }

    const Auth = async(e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/login', {
                email: email,
                password: password
            });
            navigate({ pathname: '/dashboard' });
        } catch (err) {
            if (err.response) {
                setMsg(err.response.data.msg);
            }
        }
    }

    return (
        <section className="vh-100%" style={{backgroundImage: 'linear-gradient(to right, blue, red)'}}>
            <div className='container vh-100'>
                <div className='d-flex justify-content-center align-items-center h-100'>
                    <div className='card p5 col-0 col-md-8 col-lg-6 col-xl-5 text-center shadow' style={{borderRadius: '20px', backgroundColor: 'rgba(255, 255, 255, 0.9)'}}>
                        <h3 className='m-4 text-center' style={{color: 'rgb(51, 51, 51)'}}>Sign In</h3>
                        <p className='text-center'>{msg}</p>
                        <form onSubmit={ Auth }>
                            <div style={{margin:'0px 20px 20px 20px'}}>
                                <input type="email" className='form-control form-control-lg' placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} />
                            </div>

                            <div style={{margin:'0px 20px 0px 20px'}}>
                                <input type="password" className='form-control form-control-lg' placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} />
                            </div>

                            <div style={{textAlign: 'right', margin: '0px 20px 0px 0px'}}>
                                <a style={{color:'rgb(100, 100, 100', textDecoration: 'none'}} href="">Forgot Password?</a>
                            </div>

                            <input type='submit' className='btn btn-primary btn-lg shadow' style={{border: 'none', margin: '20px 50px 0px 50px', color: 'white'}} value='Login' />
                            <div className='mt-4 mb-4'>
                                <p>Not a member? <a href="" onClick={ redirect }>Sign up</a></p>
                            </div>
                        </form>

                    </div>               
                </div>
            </div>
        </section>

    )
}

export default Login