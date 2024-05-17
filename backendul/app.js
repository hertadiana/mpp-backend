
const express = require('express');
const mongoose = require('mongoose');
const rateLimit = require('express-rate-limit');
const cors = require('cors');
const http = require('http');
const WebSocket = require('ws');
const bodyParser = require('body-parser');
const flowerController = require('./controllers/flowerController');
const reviewController=require('./controllers/reviewController');
//const reviewController = require('./controllers/reviewController');
const FlowerModel = require('./models/FlowerModel');
const { v4: uuidv4 } = require('uuid');
const { faker } = require('@faker-js/faker');
const Flower = require('./models/Flower');
const Review = require('./models/Review');
// const flowerRepository = require('./repositories/flowerRepository');


// const createRandomFlower = () => {
//   return new Flower(
//     uuidv4(),
//     faker.lorem.words(3).replace(/\b\w/g, char => char.toUpperCase()),
//     faker.lorem.words(3).replace(/\b\w/g, char => char.toUpperCase()),
//     faker.lorem.words(3).replace(/\b\w/g, char => char.toUpperCase())
//   );
// }

// for (var i = 0; i < 10; i++) {
//   flowerRepository.createFlower(createRandomFlower());
// }


const app = express();
const server = http.createServer(app);

// const sendUpdates = () => {
//   const update = {
//     type: 'new_flower',
//     data: flowerController.createRandomFlower()
//   };
// }


mongoose.connect('mongodb+srv://hertadianalarisa:UR4wRj3HQvCt0WGu@cluster.dadl047.mongodb.net/?retryWrites=true&w=majority',{
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Set interval to generate new flowers and send updates
//setInterval(sendUpdates, 5000);

app.use(express.static('client'));
const limiter=rateLimit({
  windowMs: 15*60*1000, //15 min
  max: 1000, //each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.'
})

app.use(limiter);
app.use(cors());

app.use(bodyParser.json());

app.get('/status', (req, res) => res.status(200).send('Server is runnning.'));
app.get('/flowers', flowerController.getAllFlowers);
app.get('/flowers/:id', flowerController.getFlowerById);
app.post('/flowers', flowerController.createFlower);
app.put('/flowers/:id', flowerController.updateFlower);
app.delete('/flowers/:id', flowerController.deleteFlower);


app.get('/reviews/:flower_id', reviewController.getReviewsFromFlower);
app.post('/reviews/:flower_id', reviewController.addReviewToFlower);
app.put('/reviews/:flower_id/:review_id', reviewController.updateFlowerReview);
app.delete('/reviews/:flower_id/:review_id', reviewController.deleteFlowerReview);

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}...`);
});
