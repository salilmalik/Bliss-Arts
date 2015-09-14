var blissArts=angular.module('blissArts', ['ngRoute','customFilters','cart','homePageController','aboutUsController','clientsController','testimonialsController']);
blissArts.constant("dataUrl", "http://localhost:2403/products");
blissArts.constant("orderUrl", "http://localhost:2403/orders");
blissArts.config(['$routeProvider',function($routeProvider){

$routeProvider
	.when('/',
	{
		controller:'productController',
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
    })
    .otherwise({redirectTo:'/'
	});
	} ]);


/*
blissArts.controller('navController',['$scope', '$location', function ($scope, $location) {
        $scope.navClass = function (page) {
            var currentRoute = $location.path().substring(1) ;
            return page === currentRoute ? 'active' : '';
        }}]);
*/



	blissArts.controller("productController", function ($scope,$http, dataUrl,orderUrl,$location,cart) {
		$scope.data = {};
		$http.get(dataUrl)
			.success(function (data) {
				$scope.data.products = data;
			})
			.error(function (error) {
				$scope.data.error = error;
			})

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

	});

