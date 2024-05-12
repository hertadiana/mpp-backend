const mongoose=require('mongoose');
const ReviewSchema=require('./ReviewModel');

const FlowerSchema = new mongoose.Schema({
    id:{
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    uses:{
        type: String,
        required: true
    },
    bloomMonth:{
        type: String,
        required: true
    },
    reviews: [ReviewSchema]


})

module.exports=mongoose.model('Flower',FlowerSchema)