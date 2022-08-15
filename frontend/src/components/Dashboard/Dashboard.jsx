import React, { useState, useEffect } from 'react';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const [name, setName] = useState('');
    const [token, setToken] = useState('');
    const [expire, setExpire] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        refreshToken();
    }, []);

    const refreshToken = async () => {
        try {
            const response = await axios.get('http://localhost:5000/token');
            setToken(response.data.accessToken);
            const decoded = jwt_decode(response.data.accessToken);
            console.log(decoded);
            setName(decoded.name);
            setExpire(decoded.exp);
        } catch (err) {
            if(err.response) {
                navigate({ pathname: '/' });
            }
        }
    }

    const axiosJWT = axios.create();

    //ini fungsinya ketika ada request data, tidak perlu refresh ulang untuk refresh token
    axiosJWT.interceptors.request.use(async(config) => {
        const currentDate = new Date();
        if(expire * 1000 < currentDate.getTime()) {
            const response = await axios.get('http://localhost:5000/token');
            config.headers.Authorization = `Bearer ${response.data.accessToken}`
            setToken(response.data.accessToken);
            const decoded = jwt_decode(response.data.accessToken);
            console.log(decoded);
            setName(decoded.name);
            setExpire(decoded.exp);
        }
        return config;
    }, (err) => {
        return Promise.reject(err);
    });

    const getUsers = async () => {
        const response = await axiosJWT.get('http://localhost:5000/user', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        console.log(response.data);
    }

  return (
    <div className='container-fluid m-5'>
        <h5>Welcome, {name}</h5>
        <button className='btn btn-success' onClick={ getUsers }>Get Users</button>
    </div>
  )
}

export default Dashboard