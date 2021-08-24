import React, { useState } from 'react';
import axios from 'axios';
import {navigate , Link} from '@reach/router';
import ThoughtForm from '../components/ThoughtForm';
import io from 'socket.io-client';


const NewThought = (props) => {
    const [ socket ] = useState( () => io(":8000") );

    const [errors, setErrors] = useState({});
    const [newThought, setNewThought] = useState({
        myThought:"",
        mood:"",
    });

    const submitHandler = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8000/api/thoughts', newThought,      {
            withCredentials: true,
          })
            .then((res)=>{
                console.log(res.data);
                socket.emit("added_new_thought", res.data);
                socket.disconnect();
                navigate('/thoughts')
            })
            .catch((err)=>{
                console.log(err.response.data.errors);
                setErrors(err.response.data.errors);
            })
    };

    return(
        <div>
            <ThoughtForm
                thought={newThought}
                setThought={setNewThought}
                errors={errors}
                submitHandler={submitHandler}
                buttonLabel={"My thought of the day"}
            />
        </div>
    )
}

export default NewThought;