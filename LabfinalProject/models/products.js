// Product Schema
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
      minLength: 3,
      maxlength: 15,
      trim: true,
    },
  
    id: {
      type: String,
      maxlength: 10,
      trim: true,
    },
  
    price: {
      type: Number,
      required: [true, 'Product price is required'],
      min: [0, 'Price must be a positive number'],
    },
  
    image: {
      type: [String], // Array of image URLs
  
      required: true,
    },
  
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category', // Refers to the Category model
      required: [true, 'Category is required for a product'],
    },
  });
  
  const Product = mongoose.model('Product', productSchema);
    
    module.exports = Product;

    