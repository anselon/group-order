var mongoose = require('mongoose');

var FoodItemSchema = new mongoose.Schema({
	foodName: String,
	price: Number,
	order: {type: mongoose.Schema.Types.ObjectId, ref:'Order'}
});

mongoose.model('FoodItem', FoodItemSchema);