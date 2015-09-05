var blissArts=angular.module('blissArts', ['ngRoute']);
blissArts.config(['$routeProvider',function($routeProvider){

$routeProvider
	.when('/home',
	{
		controller:'homePageController',
		templateUrl:'app/views/homePage.html'
	}
	)
	.when('/products',
	{
		controller:'productsController',
		templateUrl:'app/views/products.html'
	})
	.when('/clients',
	{
		controller:'clientsController',
		templateUrl:'app/views/clients.html'
	})
	.when('/testimonials',
	{
		controller:'testimonialsController',
		templateUrl:'app/views/testimonials.html'
	})
	.when('/aboutUs',
    {
        controller: 'aboutUsController',
        templateUrl: 'app/views/aboutUs.html'
    }
    )
    .when('/contactUs',
    {

        templateUrl: 'app/views/contactUs.html'
    }
    )
	} ]);


blissArts.controller('navController',['$scope', '$location', function ($scope, $location) {
        $scope.navClass = function (page) {
            var currentRoute = $location.path().substring(1) ;
            return page === currentRoute ? 'active' : '';
        }

}]);