const express = require('express');

const app = express();
const hpp = require('hpp');
app.use(express.urlencoded({extended: true}));

const route = require('./src/routes/v1/provinces');

//hpp
app.use(hpp());

const x_api_key = 'DSC2020BACKEND';

//x-api-key middleware
const apiKeyChecker = (req, res, next) => {
    const apiKey = req.headers['x-api-key'];
    if(apiKey === undefined){
        return res.send({message: 'Api Key not found'});
    }
    else if(apiKey !== x_api_key){
        return res.send({message: 'Api Key invalid'});
    }
    next();
}

app.use(apiKeyChecker);

app.use('/api/v1/provinces', route);

app.listen(3000, console.log('Listening to PORT 3000'))
    .on('error', (err) => {
        console.log(err);
    })