const { default: axios } = require('axios');
const express = require('express');
const os = require('os');
require('dotenv').config()
const config = require('./config');
const app = express();

app.use(express.static('dist'));
app.get('/api/getUsername', (req, res) => res.send({ username: os.userInfo().username }));

app.get('/api/nasa', async (req,res) => {
    try{
        const resp = await axios.get('https://api.nasa.gov/planetary/apod?api_key='+config.NASA_KEY+'&date='+req.query.date);
        return res.status(resp.status).json({status: 'success', data: resp.data});
        
    }catch(e){
        console.log(e);
        return res.status(500).json({ status: 'error', message: e.message });
    }
})

app.listen(process.env.PORT || 8080, () => console.log(`Listening on port ${process.env.PORT || 8080}!`));

