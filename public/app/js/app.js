var blissArts=angular.module('blissArts', ['ngRoute','customFilters','cart']);
blissArts.constant("dataUrl", "Bliss-Arts/public/app/productData.json");
blissArts.constant("orderUrl", "http://localhost:8080/api/orders");
blissArts.config(['$routeProvider','$locationProvider',function($routeProvider,$locationProvider){

$routeProvider
	.when('/',
	{
		templateUrl:'app/views/products.html',
        controller:'productListController'
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



	blissArts.controller("productController", function ($scope,$http, dataUrl,orderUrl,$location,cart) {

		$scope.data = {};
		$http.get(dataUrl)
			.success(function (data) {
				$scope.data.products = data;
                alert("success");
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

