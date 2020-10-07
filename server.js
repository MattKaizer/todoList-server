const express = require('express');
const dbConnect = require('./config/db');
const cors = require('cors');

const app = express(); //creating server
dbConnect(); //connecting to db
// enable cors
app.use(cors());
//enable express.json
app.use(express.json({ extended: true }));

// const port = process.env.port || 4000;

//import routes
app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/projects', require('./routes/projects'));
app.use('/api/tasks', require('./routes/tasks'));

const server = app.listen(process.env.PORT || 4000, () => {
    const port = server.address().port;
    console.log(`ITs Alive! the demon its alive on port: ${port}`)
});