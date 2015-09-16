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
              })

            .state('orders', {
                url: '/orders/{id}',
                templateUrl: '/orders.html',
                controller: 'OrdersCtrl',
        
            });

        $urlRouterProvider.otherwise('home');
    }
]);

app.factory('orderRepository',['$http','$location',function($http,$location){
	var o = {
		orders: []
	};

     o.getAll = function() {
          return $http.get('/orders').success(function(data){
          angular.copy(data, o.orders);
        });
    };

    o.create = function(order) {
      return $http.post('/orders', order).success(function(data){
        o.orders.push(data);
        //THIS IS LIKE REALLY UNSECURE.... LIKE TOTALLY REALLY LIKE LIKE LIKE
        $location.path('/orders/'+data._id);
      });
      
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

		};


    }
]);

app.controller('OrdersCtrl', [
    '$scope',
    '$stateParams',
    'orderRepository',


    function($scope, $stateParams, orderRepository){
        $scope.order = orderRepository.orders[$stateParams.id];

      
         $scope.addFoodItem = function(){
          if($scope.body === '') { return; }
          orderRepository.addFoodItem($scope.order._id,{
            name: $scope.name,
            price: $scope.price
            }).success(function(foodItem){
            $scope.order.foodItems.push(foodItem);
        });
          

        $scope.name = '';
        $scope.price = 0;

      };
    }

]);