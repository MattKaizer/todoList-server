const express = require('express');
const dbConnect = require('./config/db');

const app = express(); //creating server
dbConnect(); //connecting to db

//enable express.json
app.use(express.json({ extended: true }));

const PORT = process.env.PORT || 9000;

//import routes
app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/projects', require('./routes/projects'));
app.use('/api/tasks', require('./routes/tasks'));

app.listen(PORT, () => {
    console.log(`ITs Alive! the demon its alive on port: ${PORT}`)
});