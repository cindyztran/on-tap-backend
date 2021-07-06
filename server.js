// Dependencies 

require('dotenv').config();

const { PORT = 4000, MONGODB_URL } = process.env;

const express = require('express');

const app = express();

const mongoose = require('mongoose');

const cors = require('cors');

const morgan = require('morgan');

//Database connection
mongoose.connect(MONGODB_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
});


// Connection events
mongoose.connection
    .on('open', () => console.log('connected to mongoose'))
    .on('close', () => console.log('mongoose disconnected'))
    .on('error', (error) => console.log(error));

//Models
const beerSchema = new mongoose.Schema({
    name: String, 
    image: String,
    caption: String,
    rating: String,
    city: String,
    state: String,
    brewery: String
}, { timestamps: true });

const Beer = mongoose.model("Beer", beerSchema);

//MiddleWare
app.use(cors()); 
app.use(morgan('dev'));
app.use(express.json());

 

//Routes

//test route 
app.get('/', (req, res) => {
    res.send('hello world')
});

//Beer Index Route 
app.get('/beers', async (req, res) => {
    try {
        //send all beers
        res.json(await Beer.find({}));

    } catch (error) {
        //send error
        res.status(400).json(error);
    }
});


//Beer Delete Route
app.delete('/beers/:id', async (req, res) => {
    try {
        res.json(await Beer.findByIdAndRemove(req.params.id))
        
    } catch (error) {
        res.status(400).json(error);
    }
});

//Beer Update Route
app.put('/beers/:id', async (req, res) => {
    try {
        res.json(await Beer.findByIdAndUpdate(req.params.id, req.body, { new: true }));

    } catch (error) { 
        res.status(400).json(error);
    }
});



//Beer Create Route
app.post('/beers', async (req, res) => {
    try {
        res.json(await Beer.create(req.body));

    } catch (error) {
        res.status(400).json(error);
    }
});


app.listen(PORT, () => console.log(`listening on port ${PORT}`));

