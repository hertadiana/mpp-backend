const mongoose=require('mongoose');
const ReviewSchema=require("./Review");

class Flower {
    constructor(id, name, uses, bloomMonth) {
      this.id = id;
      this.name = name;
      this.uses = uses;
      this.bloomMonth = bloomMonth;
    }
  }
  
  module.exports = Flower;
  