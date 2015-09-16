var mongoose = require('mongoose');

var FoodItemSchema = new mongoose.Schema({
	name: String,
	price: Number
});

mongoose.model('FoodItem', FoodItemSchema);