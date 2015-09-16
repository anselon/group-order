var mongoose = require('mongoose');

var OrderSchema = new mongoose.Schema({
	title: String,
	foodItems: [{ type: mongoose.Schema.Types.ObjectId, ref: 'FoodItem' }]
});

mongoose.model('Order', OrderSchema);