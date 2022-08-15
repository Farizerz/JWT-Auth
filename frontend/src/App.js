import { Fragment } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Dashboard from './components/Dashboard/Dashboard';
import Login from "./components/Login/Login";
import Navbar from './components/Navbar/Navbar';
import Register from "./components/Register/Register";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path ='/' element={ <Login /> } />
        <Route path ='/register' element={ <Register /> } />  
        <Route path ='/dashboard' element={
          <Fragment>
            <Navbar />
            <Dashboard />
          </Fragment>
        }/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
