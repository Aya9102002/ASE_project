const express = require('express');
const app = express();
const bodyParser = require('body-parser'); 
const db = require('./database');
const userRouter = require('./routs/router');
const partnershipRouter = require('./routs/partnershipRouter');


app.use(bodyParser.json());
app.use('/api/projects', userRouter);
app.use('/api/partnerships', partnershipRouter);


app.listen(3321,()=>{
    console.log("server is running.. ");
})

module.exports = app;  // used it when i want to use this module outside 

