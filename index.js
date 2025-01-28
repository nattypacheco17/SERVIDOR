let app = require('express')();
const http = require('http').Server(app);
const express = require('express');
const hostname = '127.0.0.1';
const port = 3000;
const cors = require('cors');



// Middlewares
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:4200'
}));

//routes
app.use(require('./routes/usuario'));

/*
app.use(function(req, res, next){
  res.header("Access-Control-Allow-Origin", "http://localhost:4200");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "content-Type, Authorization");
  next();
});*/

http.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

