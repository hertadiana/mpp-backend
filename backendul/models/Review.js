const mongoose = require('mongoose');

class Review {
    constructor(id, flowerId, reviewer, rating, text, date) {
      this.id = id;
      this.flowerId = flowerId;
      this.reviewer = reviewer;
      this.rating = rating;
      this.text = text;
      this.date = date;
    }
}

module.exports =  Review;