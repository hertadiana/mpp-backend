const Flower = require('../models/Flower.js');
const repository = require('../repositories/flowerRepository.js');
const { v4: uuidv4 } = require('uuid');

// module.exports = {
//   createRandomFlower: () => {
//     return repository.createFlower(repository.createFlower());
//   },

//   getAllFlowers: (req, res) => {
//     const flowers = repository.getAllFlowers();

//     res.json(flowers);
//   },

  
//   validateGetFlowerById: (req, res, next) => {
//     if (req.params.id.length !== 36) {
//       res.status(400).send('Invalid ID');
//     }

//     return next();
//   },
  
//   getFlowerById: (req, res) => {
//     const id = req.params.id;
//     const flower = repository.getFlowerById(id);

//     if (flower) {
//       return res.json(flower);
//     } else {
//       return res.status(404).send('Flower not found');
//     }
//   },

//   validateCreateOrUpdateFlower: (req, res, next) => {
//     if (!req.body.name) {
//       return res.status(400).send('A name is required');
//     }

//     if (!req.body.uses) {
//       return res.status(400).send('An use is required');
//     }

//     if (!req.body.bloomMonth) {
//       return res.status(400).send('A bloom month is required');
//     }

//     return next();
//   },

//   createFlower: (req, res) => {
//     const { name, uses, bloomMonth } = req.body;

//     const newFlower = new Flower(uuidv4(), name, uses, bloomMonth);

//     repository.createFlower(newFlower);
    
//     return res.status(201).json(newFlower);
//   },

//   updateFlower: (req, res) => {
//     const id = req.params.id;

//     const { name, uses, bloomMonth } = req.body;

//     const updatedFlower = new Flower(id, name, uses, bloomMonth);

//     const success = repository.updateFlower(id, updatedFlower);

//     if (success) {
//       return res.status(200).send('Flower updated successfully');
//     } else {
//       return res.status(404).send('Flower not found');
//     }
//   },

//   validateDeleteFlower: (req, res, next) => {
//     if (req.params.id.length !== 36) {
//       res.status(400).send('Invalid ID');
//     }

//     return next();
//   },

//   deleteFlower: (req, res) => {
//     const id = req.params.id;

//     repository.deleteFlower(id);

//     return res.status(204).send('Flower deleted successfully');
//   }
// };

const flowerController = {
  getAllFlowers: async (req, res) => {
    try {
      const flowers = await repository.getAllFlowers();
      res.json(flowers);
    } catch (error) {
      res.status(500).send(`Error fetching flowers: ${error.message}`);
    }
  },

  getFlowerById: async (req, res) => {
    const id = req.params.id;
    try {
      const flower = await repository.getFlowerById(id);
      if (flower) {
        res.json(flower);
      } else {
        res.status(404).send('Flower not found');
      }
    } catch (error) {
      res.status(500).send(`Error fetching flower: ${error.message}`);
    }
  },

  createFlower: async (req, res) => {
    const { name, uses, bloomMonth } = req.body;
    const newFlower = {
      id: uuidv4(),
      name,
      uses,
      bloomMonth
    };
    try {
      const createdFlower = await repository.createFlower(newFlower);
      res.status(201).json(createdFlower);
    } catch (error) {
      res.status(500).send(`Error creating flower: ${error.message}`);
    }
  },

  updateFlower: async (req, res) => {
    const id = req.params.id;
    const { name, uses, bloomMonth } = req.body;
    const updatedFlowerData = {
      name,
      uses,
      bloomMonth
    };
    try {
      const flower = await repository.updateFlower(id, updatedFlowerData);
      if (flower) {
        res.status(200).send('Flower updated successfully');
      } else {
        res.status(404).send('Flower not found');
      }
    } catch (error) {
      res.status(500).send(`Error updating flower: ${error.message}`);
    }
  },

  deleteFlower: async (req, res) => {
    const id = req.params.id;
    try {
      const flower = await repository.deleteFlower(id);
      if (flower) {
        res.status(204).send('Flower deleted successfully');
      } else {
        res.status(404).send('Flower not found');
      }
    } catch (error) {
      res.status(500).send(`Error deleting flower: ${error.message}`);
    }
  }
};

module.exports = flowerController;