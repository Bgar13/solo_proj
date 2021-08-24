import React from 'react';
import Login from '../components/Login';
import RegisterUser from '../components/RegisterUser';
import Header from '../components/Header';

const LogReg = () => {
    return (
        <div className="container-flex">
            <Header></Header>
            <Login />
            <hr />
            <RegisterUser />
        </div>
    );
};

export default LogReg;
