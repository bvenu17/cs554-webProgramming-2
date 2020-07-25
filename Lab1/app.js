const express = require('express');
const app = express();
const configRoutes = require('./routes/');

app.use(express.json());

var PORT = process.env.PORT || 3000;

app.use(function (req, res, next) {
    console.log('Request body:', req.body);
    console.log('Request url:', req.originalUrl);
    console.log("Http verb:",req.method);
    next()
  });

const pathsAccessed = {};
app.use(function(request, response, next) {
  if (!pathsAccessed[request.path]) pathsAccessed[request.path] = 0;
  pathsAccessed[request.path]++;
  console.log('There have now been ' + pathsAccessed[request.path] + ' requests made to ' + request.path);
  next();
});

configRoutes(app);


app.listen(PORT, () => {
    console.log("We've now got a server!");
    console.log("Your routes will be running on http://localhost:3000"); 
});