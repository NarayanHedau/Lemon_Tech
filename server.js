const express = require ("express");
const app = express();
const mongoose = require ("mongoose");
const db = require ("./db/conn.js");

app.use(express.json());
const PORT = 2023;

  

app.use('/', require('./routes/url'))
app.use('/api/url', require('./routes/url'))

app.listen(PORT, ()=>{
console.log (`Server started on port ${PORT}`);
})

