const express = require('express');
const mongoose = require('mongoose');
const PORT = process.env.PORT || 3000
const app = express()

app.use(express.json())

app.listen(PORT, ()=>{
    console.log(`The ${PORT} is active`);
})
