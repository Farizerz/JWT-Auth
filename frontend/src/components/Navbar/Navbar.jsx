import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();

    const Logout = async () => {
        try {
            await axios.delete('http://localhost:5000/logout');
            alert('Logged Out!');
            navigate({ pathname: '/' });
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div>
            <nav className='navbar navbar-expand-sm navbar-dark bg-dark sticky-top'>
                <div className='container-fluid'>
                    <a href='http://farizrr.com' target='blank_' style={{marginRight: '10px'}}>
                        <img src='https://www.pngall.com/wp-content/uploads/2/F-Letter.png' style={{width: '40px', height: '40px'}} />
                    </a>
                    {/* ini fungsinya semua tombol jadi dropdown ketika resolusi jadi kecil */}
                    <button className='navbar-toggler' type='button' toggle='collapse' target='#navbarku'>
                        <span className='navbar-toggler-icon'></span>
                    </button>

                    <div className='collapse navbar-collapse' id='navbarku'>
                        <ul className='navbar-nav me-auto'>
                            <li className='nav-item'>
                                <a href='' className='nav-link'>Home</a>
                            </li>
                        </ul>
                
                        <form className='d-flex'>
                            <button className='btn btn-danger' onClick={ Logout }>Logout</button>
                        </form>

                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Navbar