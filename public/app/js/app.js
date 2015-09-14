var blissArts=angular.module('blissArts', ['ngRoute','customFilters','cart']);
blissArts.constant("dataUrl", "http://localhost:8080/api/products");
blissArts.constant("orderUrl", "http://localhost:8080/api/orders");
blissArts.config(['$routeProvider','$locationProvider',function($routeProvider,$locationProvider){

$routeProvider
	.when('/',
	{
		templateUrl:'app/views/products.html'
	}
	)
    .when('/checkout', {
        templateUrl: 'app/views/checkoutSummary.html'
    })
    .when('/complete', {
        templateUrl: "app/views/thankYou.html"
    })
    .when('/placeOrder', {
        templateUrl: "app/views/placeOrder.html"
    });
    // get rid of the hash in the URL
    $locationProvider.html5Mode(true);
   
	} ]);


/*
blissArts.controller('navController',['$scope', '$location', function ($scope, $location) {
        $scope.navClass = function (page) {
            var currentRoute = $location.path().substring(1) ;
            return page === currentRoute ? 'active' : '';
        }}]);
*/



	blissArts.controller("productController", function ($scope,$http, dataUrl,orderUrl,$location,cart) {
        alert("PRODUCT CONTROLLER CALLED");
		$scope.data = {};
		$http.get(dataUrl)
			.success(function (data) {
				$scope.data.products = data;
			})
			.error(function (error) {
				$scope.data.error = error;
			})
      alert("PRODUCT CONTROLLER CALLED 2");
        $scope.sendOrder = function (shippingDetails) {
            var order = angular.copy(shippingDetails);
            order.products = cart.getProducts();
            $http.post(orderUrl, order)
                .success(function (data) {
                    $scope.data.orderId = data.id;
                    cart.getProducts().length = 0;
                })
                .error(function (error) {
                    $scope.data.orderError = error;
                }).finally(function () {
                    $location.path("/complete");
                });
        }
        alert("PRODUCT CONTROLLER CALLED 3");

	});

