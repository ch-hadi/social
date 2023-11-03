const express = require('express')
const app = express()
const cors = require('cors')
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
require('colors')
require('dotenv').config()

const connectDB = require('./config/db');

// Auth Router
const routes = require('./src/routes/all_routes')
const port = 3500
app.use(cors());

app.get('/' , (req, res)=>{
    res.send('Welcome to LinkedIn Server')
})

app.use('/api/v1/' , routes)


connectDB()

const server = app.listen(port ,() => {
    console.log(
        `App listening on port ${port}`
    );
})
