var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

var mongoose = require('mongoose');
var Order = mongoose.model('Order');
var FoodItem = mongoose.model('FoodItem');


router.get('/orders', function(req, res, next){
	Order.find(function(err, orders){
		if (err) {return next(err);}
		res.json(orders);
	})
});

router.post('/orders/', function(req, res, next){
	var order = new Order(req.body);
	order.save(function(err, order){
		if (err){return next(err);}
		res.json(order);
	})

});

/*router.param('order',function(req, res, next, id){
	var query = Order.findById(id);
	query.exec(function(err, order){
		if (err) {return next(err);}
		if(!order) {return next(new Error('cannot find order'));}
		req.order = order;
		return next();
	});
});

router.get('/orders/:order', function(req, res){
	res.json(req.order);
})
*/
module.exports = router;
