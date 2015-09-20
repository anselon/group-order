var app = angular.module('groupOrder', [
        'ui.router'
]);

app.config([
    '$stateProvider',
    '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {

        $stateProvider
            .state('home', {
                url: '/home',
                templateUrl: '/home.html',
                controller: 'MainCtrl',
                /*resolve: {
                    orderPromise: ['orders', function(orders){
                        return orders.getAll();
                    }]
                }*/
              })

            .state('orders', {
                url: '/orders/{id}',
                templateUrl: '/orders.html',
                controller: 'OrdersCtrl',
                resolve: {
                    order: ['$stateParams', 'orderRepository', function($stateParams, orderRepository){
                        return orderRepository.get($stateParams.id);
                    }]
                }
            })

        $urlRouterProvider.otherwise('home');
    }
]);

app.factory('orderRepository',['$http','$location',function($http,$location){
	var o = {
		orderRepository: []
	};

    o.get = function(id){
        return $http.get('/orders/'+id).then(function(res){
            console.log(res.data);
            return res.data;
        });
    };

     o.getAll = function() {
          return $http.get('/orders').success(function(data){
          angular.copy(data, o.orderRepository);
        });
    };

    o.create = function(order) {
      return $http.post('/orders', order).success(function(data){
        o.orderRepository.push(data);
        //THIS IS LIKE REALLY UNSECURE.... LIKE TOTALLY REALLY LIKE LIKE LIKE
        $location.path('/orders/'+data._id);
      });   
    };

    o.addFoodItem = function(id, foodItem) {
        return $http.post('/orders/'+id+'/foodItems', foodItem);
    };



	return o;
}]);


app.controller('MainCtrl', [
    '$scope',

    'orderRepository',

    function($scope, orderRepository){


        $scope.orders = orderRepository.orders;

	  	$scope.addOrder = function(){
		  if (!$scope.title || $scope.title === '') { return; }

		  orderRepository.create({
            title: $scope.title,
            foodItems: []
		  });
          $scope.title = '';
          $scope.foodItems = [];

		};


    }
]);

app.controller('OrdersCtrl', [
    '$scope',
    'orderRepository',
    'order',

    function($scope,  orderRepository, order){
        $scope.order = order;


        
         $scope.addFoodItem = function(){
          if($scope.foodName === '') { return; }

          orderRepository.addFoodItem(order._id,{
            foodName: $scope.foodName,
            price: $scope.price,
            }).success(function(foodItem){
            $scope.order.foodItems.push(foodItem);

        });
          

        $scope.foodName = '';
        $scope.price = '';

      };
    }

]);