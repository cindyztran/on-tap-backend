import mongoose from 'mongoose';
const beerSchema = new mongoose.Schema({
    name: String, 
    image: String,
    caption: String,
    rating: String,
    city: String,
    state: String,
brewery: String,
    createdById: String
}, { timestamps: true });

const Beer = mongoose.model("Beer", beerSchema);

export default Beer;