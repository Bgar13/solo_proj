import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { navigate, Link } from '@reach/router';
import ThoughtForm from './ThoughtForm';

const EditThought = (props) => {
  const [ errors, setErrors ] = useState({});
  const [ thought, setThought ] = useState({
    myThought:'',
    mood:'',

  })

  useEffect(() => {
    axios.get('http://localhost:8000/api/thoughts/' + props.id, {
      withCredentials: true
    })
      .then((res) => {
        console.log(res.data);
        setThought(res.data);
      })
      .catch((err) => {
        console.log(err.response.data);
        navigate("/thoughts");
      });
  }, []);

  const submitHandler = (e) => {
    e.preventDefault();

    // do some stuff
    axios.put('http://localhost:8000/api/thoughts/' + props.id, thought, {
      withCredentials: true
    })
      .then((res) => {
        console.log(res.data);
        navigate('/thoughtts/' + props.id);
      })
      .catch((err) => {
        console.log(err.response.data.errors);
        setErrors(err.response.data.errors);
      })
  }


  return (
    <div>
      <h2>Edit Thought</h2>
      <ThoughtForm
        thought={ thought } 
        setThought={ setThought }
        errors={ errors }
        submitHandler={ submitHandler }
        buttonLabel={ "Update" }
        />
    </div>
  )
}

export default EditThought;