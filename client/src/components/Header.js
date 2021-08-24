import React from 'react';
import axios from 'axios';
import {navigate} from '@reach/router';

const Header = (props) => {
  const logout = (e) => {
    e.preventDefault();
    axios.post("http://localhost:8000/api/user/logout", { 
      }, {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res.data);
        navigate("/logreg");
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <div>
      <div>
        <button onClick={(e) => logout(e) }>Logout</button>
      </div>
      <h1 className="header">This Is Your Safe Space</h1>

    </div>
  )
};

export default Header;
