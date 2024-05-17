const Review = require('../models/Review');
const flowerRepository = require('../repositories/flowerRepository');
const { v4: uuidv4 } = require('uuid');

module.exports = {
  createRandomReview: flowerId => {
    return reviewRepository.createFlower(reviewRepository.createRandomReview());
  },

  getReviewsFromFlower: async (req, res) => {
    const flowerId = req.params.flower_id;
    const flower = await flowerRepository.getFlowerById(flowerId);

    return res.json(flower.reviews);
  },

  
  addReviewToFlower: async (req, res, next) => {
    const review = new Review(
        uuidv4(),
        req.params.flower_id,
        req.body.reviewer,
        req.body.rating,
        req.body.text,
        new Date()
    );

    const flowerToUpdate = await flowerRepository.getFlowerById(review.flowerId);
    flowerToUpdate.reviews.push(review);

    const success = await flowerRepository.updateFlower(flowerToUpdate.id, flowerToUpdate);

    if (success) {
      return res.status(200).send('Review added successfully');
    } else {
      return res.status(404).send('Flower not found');
    }
  },
  
  updateFlowerReview: async (req, res) => {
    const flowerId = req.params.flower_id;
    const reviewId = req.params.review_id;

    const flowerToUpdate = await flowerRepository.getFlowerById(flowerId);

    const reviewToUpdateIndex = flowerToUpdate.reviews.findIndex(review => review._id.toString() === reviewId);

    if (reviewToUpdateIndex !== -1) {
        const reviewToUpdate = flowerToUpdate.reviews[reviewToUpdateIndex];

        reviewToUpdate.rating = req.body.rating;
        reviewToUpdate.text = req.body.text;
        reviewToUpdate.date = new Date();

        flowerToUpdate.reviews[reviewToUpdateIndex] = reviewToUpdate;
    
        await flowerRepository.updateFlower(flowerId, flowerToUpdate);

        return res.status(200).send('Review updated successfully');
    } 
    
    return res.status(404).send('Review not found')
  },

  deleteFlowerReview: async (req, res) => {
    console.log("ceva");

    const flowerId = req.params.flower_id;
    const reviewId = req.params.review_id;
    console.log(reviewId);
    const flowerToUpdate = await flowerRepository.getFlowerById(flowerId);

    const reviewToDeleteIndex = flowerToUpdate.reviews.findIndex(review => review._id.toString() === reviewId);
    console.log("this is final");
    console.log(reviewToDeleteIndex);
    console.log("this is finallllll");
    if (reviewToDeleteIndex !== -1) {
        flowerToUpdate.reviews.splice(reviewToDeleteIndex, 1);
        await flowerRepository.updateFlower(flowerId, flowerToUpdate);
        
        return res.status(200).send('Review deleted successfully')
    }

    return res.status(404).send('Review not found');
  }
};