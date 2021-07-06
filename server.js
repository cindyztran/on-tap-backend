// Dependencies 

require('dotenv').config();

const { PORT = 4000 } = process.env;

const express = require('express');

const app = express();

//Routes

app.get('/', (req, res) => {
    res.send('hello world')
});

app.listen(PORT, () => console.log(`listening on port ${PORT}`));

