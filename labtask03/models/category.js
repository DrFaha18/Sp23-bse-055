const mongoose = require('mongoose');

// Category Schema
const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Category name is required'],
    unique: true,
    trim: true,
  },
});

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;
