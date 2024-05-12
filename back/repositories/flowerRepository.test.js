const repository = require('repositories/flowerRepository.js');
const Flower = require('./../models/Flower');

describe('Flower Repository', () => {
  beforeEach(() => {
    // Clear flowers before each test
    repository.getAllFlowers().length = 0;
  });

  test('getAllFlowers returns empty array initially', () => {
    const flowers = repository.getAllFlowers();
    expect(flowers).toEqual([]);
  });

  test('getFlowerById returns the correct flower', () => {
    const flower1 = new Flower('1', 'Ghiocel', 'Ornamental', 'Februarie - Martie');
    const flower2 = new Flower('2', 'Lalea', 'Ornamental', 'Iunie - August');

    repository.createFlower(flower1);
    repository.createFlower(flower2);

    const foundFlower = repository.getFlowerById('2');
    expect(foundFlower).toEqual(flower2);
  });

  test('createFlower adds a new flower to the repository', () => {
    const flower = new Flower('1', 'Ghiocel', 'Ornamental', 'Februarie - Martie');

    repository.createFlower(flower);

    const flowers = repository.getAllFlowers();

    expect(flowers.length).toBe(1);

    expect(flowers[0]).toEqual(flower);
  });

  test('updateFlower updates the correct flower', () => {
    const initialFlower = new Flower('1', 'Ghiocel', 'Ornamental', 'Februarie - Martie');
    const updatedFlower = new Flower('1', 'Lalea', 'Ornamental', 'Iunie - August');

    repository.createFlower(initialFlower);
    repository.updateFlower('1', updatedFlower);

    const flowers = repository.getAllFlowers();

    expect(flowers.length).toBe(1);
    expect(flowers[0]).toEqual(updatedFlower);
  });

  test('deleteFlower deletes the correct flower', () => {
    const flower1 = new Flower('1', 'A Game of Thrones', 'George R. R. Martin', 1996);
    const flower2 = new Flower('2', 'Lalea', 'Ornamental', 'Iunie - August');

    repository.createFlower(flower1);
    repository.createFlower(flower2);

    repository.deleteFlower('1');

    const flowers = repository.getAllFlowers();

    expect(flowers.length).toBe(1);
    expect(flowers[0]).toEqual(flower2);
  });
});
