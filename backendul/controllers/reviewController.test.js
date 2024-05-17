const reviewController = require('./reviewController');
const Review = require('../models/Review');
const flowerRepository = require('../repositories/flowerRepository');

// Mock the flowerRepository functions
jest.mock('../repositories/flowerRepository', () => ({
  getFlowerById: jest.fn(),
  updateFlower: jest.fn(),
}));

// Mock the response object
const mockResponse = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.send = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};
describe('addReviewToFlower', () => {
    it('should add a review to a flower', async () => {
      const req = {
        params: { flower_id: 'flowerId' },
        body: {
          reviewer: 'Anonymous',
          rating: 4,
          text: 'This is a review text',
        },
      };
      const res = mockResponse();
      
      // Mock flowerRepository.getFlowerById to return a flower
      flowerRepository.getFlowerById.mockResolvedValueOnce({
        id: 'flowerId',
        reviews: [],
      });
  
      // Call the controller function
      await reviewController.addReviewToFlower(req, res);
  
      // Assertions
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.send).toHaveBeenCalledWith('Review added successfully');
      expect(flowerRepository.updateFlower).toHaveBeenCalledWith('flowerId', expect.any(Object));
    });
  
    it('should handle flower not found error', async () => {
      const req = {
        params: { flower_id: 'nonExistingId' },
        body: {
          reviewer: 'Anonymous',
          rating: 4,
          text: 'This is a review text',
        },
      };
      const res = mockResponse();
      
      // Mock flowerRepository.getFlowerById to return null (flower not found)
      flowerRepository.getFlowerById.mockResolvedValueOnce(null);
  
      // Call the controller function
      await reviewController.addReviewToFlower(req, res);
  
      // Assertions
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.send).toHaveBeenCalledWith('Flower not found');
      expect(flowerRepository.updateFlower).not.toHaveBeenCalled();
    });
  });
  describe('updateFlowerReview', () => {
    it('should update an existing review', async () => {
      const req = {
        params: { flower_id: 'flowerId', review_id: 'reviewId' },
        body: {
          rating: 5,
          text: 'Updated review text',
        },
      };
      const res = mockResponse();
  
      // Mock flowerRepository.getFlowerById to return a flower with a review
      flowerRepository.getFlowerById.mockResolvedValueOnce({
        id: 'flowerId',
        reviews: [{ _id: 'reviewId', rating: 3, text: 'Old review text' }],
      });
  
      // Call the controller function
      await reviewController.updateFlowerReview(req, res);
  
      // Assertions
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.send).toHaveBeenCalledWith('Review updated successfully');
      expect(flowerRepository.updateFlower).toHaveBeenCalledWith('flowerId', expect.any(Object));
    });
  
    it('should handle review not found error', async () => {
      const req = {
        params: { flower_id: 'flowerId', review_id: 'nonExistingReviewId' },
        body: {
          rating: 5,
          text: 'Updated review text',
        },
      };
      const res = mockResponse();
  
      // Mock flowerRepository.getFlowerById to return a flower with no matching review
      flowerRepository.getFlowerById.mockResolvedValueOnce({
        id: 'flowerId',
        reviews: [{ _id: 'otherReviewId', rating: 3, text: 'Some other review' }],
      });
  
      // Call the controller function
      await reviewController.updateFlowerReview(req, res);
  
      // Assertions
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.send).toHaveBeenCalledWith('Review not found');
      expect(flowerRepository.updateFlower).not.toHaveBeenCalled();
    });
  });
  describe('deleteFlowerReview', () => {
    it('should delete an existing review', async () => {
      const req = {
        params: { flower_id: 'flowerId', review_id: 'reviewId' },
      };
      const res = mockResponse();
  
      // Mock flowerRepository.getFlowerById to return a flower with a matching review
      flowerRepository.getFlowerById.mockResolvedValueOnce({
        id: 'flowerId',
        reviews: [{ _id: 'reviewId', rating: 4, text: 'Some review' }],
      });
  
      // Call the controller function
      await reviewController.deleteFlowerReview(req, res);
  
      // Assertions
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.send).toHaveBeenCalledWith('Review deleted successfully');
      expect(flowerRepository.updateFlower).toHaveBeenCalledWith('flowerId', expect.any(Object));
    });
  
    it('should handle review not found error', async () => {
      const req = {
        params: { flower_id: 'flowerId', review_id: 'nonExistingReviewId' },
      };
      const res = mockResponse();
  
      // Mock flowerRepository.getFlowerById to return a flower with no matching review
      flowerRepository.getFlowerById.mockResolvedValueOnce({
        id: 'flowerId',
        reviews: [{ _id: 'otherReviewId', rating: 3, text: 'Some other review' }],
      });
  
      // Call the controller functio
      await reviewController.deleteFlowerReview(req, res);
  
      // Assertions
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.send).toHaveBeenCalledWith('Review not found');
      expect(flowerRepository.updateFlower).not.toHaveBeenCalled();
    });
  });
    