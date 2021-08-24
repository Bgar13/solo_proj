import React from 'react';
import AllThoughts from '../components/AllThoughts';
import Header from '../components/Header';
import { navigate, Link } from '@reach/router';


const Profile = () =>{
    return (
        <div className="container-flex">
            <Header/>
            <AllThoughts/>
            <Link to="/thoughts/new">
                <button>Thought of the day</button>
            </Link>
        </div>
    )
};

export default Profile;