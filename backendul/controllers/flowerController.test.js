const controller = require('./../controllers/flowerController');
const repository = require('repositories/flowerRepository.js');
const Flower = require('../models/Flower');

jest.mock('./../repositories/flowerRepository');
jest.mock('uuid', () => ({ v4: jest.fn(() => '1') }));

describe('Controller', () => {
  beforeEach(() => {
    repository.getAllFlowers.mockClear();
    repository.createFlower.mockClear();
    repository.getFlowerById.mockClear();
    repository.updateFlower.mockClear();
    repository.deleteFlower.mockClear();
  });

  test('getAllFlowers returns empty array initially', () => {
    repository.getAllFlowers.mockReturnValueOnce([]);

    const req = {};
    const res = {
      json: jest.fn()
    };

    controller.getAllFlowers(req, res);
    expect(res.json).toHaveBeenCalledWith([]);
  });

  test('getFlowerById returns the correct flower', () => {
    const flower = new Flower('1', 'Ghiocel', 'Ornamental', 'Februarie - Martie');

    repository.getFlowerById.mockReturnValueOnce(flower);

    const req = {
      params: { id: '1' }
    };

    const res = {
      json: jest.fn()
    };

    controller.getFlowerById(req, res);

    expect(repository.getFlowerById).toHaveBeenCalledWith('1');

    expect(res.json).toHaveBeenCalledWith(flower);
  });

  test('createFlower adds a new flower to the repository and responds with the new flower', () => {
    const newFlower = new Flower('1', 'Ghiocel', 'Ornamental', 'Februarie - Martie');

    repository.createFlower.mockReturnValueOnce(newFlower);

    const req = {
      body: {
        name: 'Ghiocel',
        uses: 'Ornamental',
        bloomMonth: 'Februarie - Martie'
      }
    };

    const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn()
    };

    controller.createFlower(req, res);

    expect(repository.createFlower).toHaveBeenCalledWith(expect.any(Flower));
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json.mock.calls[0][0].name).toBe('Ghiocel');
    expect(res.json.mock.calls[0][0].uses).toBe('Ornamental');
    expect(res.json.mock.calls[0][0]).toHaveProperty('id');
  });

  test('updateFlower updates the correct todo and responds with success message', () => {
    const updatedFlower = new Flower('1', 'Ghiocel', 'Ornamental', 'Februarie - Martie');

    repository.updateFlower.mockReturnValueOnce(true);

    const req = {
      params: { id: '1' },
      body: updatedFlower
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn()
    };

    controller.updateFlower(req, res);

    expect(repository.updateFlower).toHaveBeenCalledWith('1', expect.any(Flower));

    expect(res.status).toHaveBeenCalledWith(200);

    expect(res.send).toHaveBeenCalledWith('Flower updated successfully');
  });

  test('deleteFlower deletes the correct flower and responds with success', () => {
    repository.deleteFlower.mockReturnValueOnce(true);

    const req = {
      params: { id: '1' }
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn()
    };

    controller.deleteFlower(req, res);
    
    expect(repository.deleteFlower).toHaveBeenCalledWith('1');

    expect(res.status).toHaveBeenCalledWith(204);

    expect(res.send).toHaveBeenCalled();
  });
});
