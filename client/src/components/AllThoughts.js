import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { navigate } from '@reach/router';
import io from 'socket.io-client';

const AllThoughts = (props) => {
  const [ allThoughts, setAllThoughts ] = useState([]);
  const [ socket ] = useState( () => io(":8000" ) );


  useEffect(() => {
    console.log("Inside of the useEffect for Socket.io-client");

    socket.on("connect", () => {
      console.log('We are connected!');
      console.log(socket.id);
    });

    socket.on("added_thought", (data) => {
      console.log("added_thought");
      console.log(data);
      console.log(allThoughts);

      setAllThoughts( (currentAllThoughtValues) => [ data, ...currentAllThoughtValues ] );
    });

    socket.on('thought_deleted', (deletedThoughtId) => {
      setAllThoughts( (currentAllThoughtValues) => {

        let filteredThoughtArray = currentAllThoughtValues.filter((oneThought) => {
          return oneThought._id !== deletedThoughtId;
        });

        return filteredThoughtArray;
      });
    })

    return () => socket.disconnect();

  }, []);


  useEffect(() => {
    axios.get('http://localhost:8000/api/thoughts', {
      withCredentials: true
    })
      .then((res) => {
        console.log(res.data);
        setAllThoughts(res.data);
      })
      .catch((err) => {
        console.log(err);
        navigate("/");
      })
  }, []);

  const deleteThought = ( thoughtId ) => {

    axios.delete('http://localhost:8000/api/thoughts/' + thoughtId, {
      withCredentials: true
    })
      .then((res) => {
        console.log(res.data);
        socket.emit("deleted_thought", thoughtId);
        let filteredThoughtArray = allThoughts.filter((oneThought) => {
          return oneThought._id !== thoughtId;
        });
        setAllThoughts(filteredThoughtArray);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  return (
    <div>
      <h2>All Your Thoughts</h2>
      <table>
        <thead>
          <th>Past Thoughts</th>
          <th>How it made me feel</th>
          <th>Created by:</th>
          <th>Actions Available</th>
        </thead>
        <tbody>
          {
            allThoughts.map((thought, index) => (
              <tr key={ index }>
                <td>
                    { thought.myThought}
                </td>
                <td>
                    { thought.mood}
                </td>
                    {thought.user_id.username}
                <td>
                  <button className="deleteBtn" onClick={ () => deleteThought(thought._id) }>Delete</button>
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  )
}

export default AllThoughts;