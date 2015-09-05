var blissArts=angular.module('blissArts', ['ngRoute','homePageController','productsController','aboutUsController','clientsController','testimonialsController']);
blissArts.config(['$routeProvider',function($routeProvider){

$routeProvider
	.when('/',
	{
		controller:'homePageController',
		templateUrl:'../views/homePage.html'
	}
	)
	.when('/products',
	{
		controller:'productsController',
		templateUrl:'../views/products.html'
	})
	.when('/clients',
	{
		controller:'clientsController',
		templateUrl:'../views/clients.html'
	})
	.when('/testimonials',
	{
		controller:'testimonialsController',
		templateUrl:'../views/testimonials.html'
	})
	.when('/aboutUs',
    {
        controller: 'aboutUsController',
        templateUrl: '../views/aboutUs.html'
    }
    )
    .when('/contactUs',
    {

        templateUrl: '../views/contactUs.html'
    }
    )
	.otherwise({redirectTo:'/'
	});
	} ]);


blissArts.controller('navController',['$scope', '$location', function ($scope, $location) {
        $scope.navClass = function (page) {
            var currentRoute = $location.path().substring(1) ;
            return page === currentRoute ? 'active' : '';
        }

}]);