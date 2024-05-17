const Flower=require('../models/Flower');
const FlowerModel = require('../models/FlowerModel');
const Review = require('../models/Review');
const ReviewModel = require('../models/ReviewModel');
const { v4: uuidv4 } = require('uuid');
const { faker } = require('@faker-js/faker');
const { getAllFlowers, getFlowerById } = require('../controllers/flowerController');

module.exports = {
  // createRandomFlower,

  getAllFlowers: async () => {
    return await FlowerModel.find();
  },

  getFlowerById: async id => {
    return await FlowerModel.findOne({ id });
  },

  createFlower: async flower => {
    //flowers.push(flower);

    return await FlowerModel.create(flower);
  },

  updateFlower: async (id, updatedFlower) => {
    await FlowerModel.findOneAndUpdate({ id }, updatedFlower, { new: true });

    return true;
  },

  deleteFlower: async id => {
    return FlowerModel.findOneAndDelete({ id });
  }
};











// const Flower = require('../models/Flower');
// const { v4: uuidv4 } = require('uuid');
// const { faker } = require('@faker-js/faker');

// const createRandomFlower = () => {
//   return new Flower(
//     uuidv4(),
//     faker.lorem.words(3).replace(/\b\w/g, char => char.toUpperCase()),
//     faker.lorem.words(3).replace(/\b\w/g, char => char.toUpperCase()),
//     faker.lorem.words(3).replace(/\b\w/g, char => char.toUpperCase())
//   );
// }

// const flowers = faker.helpers.multiple(createRandomFlower, { count: 20 });


// module.exports = {
//   createRandomFlower,

//   getAllFlowers: () => {
//     return flowers;
//   },

//   getFlowerById: (id) => {
//     return flowers.find(flower => flower.id === id);
//   },

//   createFlower: (flower) => {
//     flowers.push(flower);

//     return flower;
//   },

//   updateFlower: (id, updatedFlower) => {
//     let index = flowers.findIndex(flower => flower.id === id);

//     if (index !== -1) {
//       flowers[index] = updatedFlower;

//       return true;
//     }

//     return false;
//   },

//   deleteFlower: (id) => {
//     flowers = flowers.filter(flower => flower.id !== id);
//   }
// };
