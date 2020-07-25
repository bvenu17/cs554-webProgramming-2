const express = require('express');
const app = express();
const configRoutes = require('./routes/');
const path = require('path')
const redis = require('redis');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// const client = redis.createClient();

// client.on('connect', function () {
//     console.log("connected tp redis");
// });


var PORT = process.env.PORT ||3000;


configRoutes(app);


app.listen(PORT, () => {
    console.log("We've now got a server!");
    console.log("Your routes will be running on http://localhost:3000"); 
});