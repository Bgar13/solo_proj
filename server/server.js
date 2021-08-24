require("dotenv").config();
const express = require('express');
const app = express();
const cors = require('cors');
const socketio = require('socket.io');

const cookieParser = require("cookie-parser");
const port = process.env.MY_PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  credentials: true,
  origin: "http://localhost:3000"
}));

app.use(cookieParser());



require('./config/mongoose.config');


require('./routes/user.routes')(app);
require('./routes/thought.routes')(app);

const server = app.listen(port, () => console.log("Successfully connected on port " + port));


const io = socketio(server, {
  cors: {
      origin: 'http://localhost:3000',
      methods: ['GET', 'POST'],
      allowedHeaders: ['*'],
      credentials: true,
  }
});

io.on("connection", (socket) => {
  console.log('Server side socket id: ' + socket.id);

  socket.on('added_new_thought', (data) => {
    console.log("added_new_thought");
    console.log(data);
    socket.broadcast.emit('added_thought', data);
  });

  socket.on('deleted_thought', (thoughtId) => {
    console.log("deleted_thought");
    console.log(thoughtId);
    socket.broadcast.emit('thought_deleted', thoughtId);
  });

});