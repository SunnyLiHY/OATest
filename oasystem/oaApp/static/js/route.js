var testapp = angular.module("oasystem", ['ngRoute']);
testapp.config(['$routeProvider', function($routeProvider) {
	console.log($routeProvider);
	$routeProvider
		.when('/list', {
			// template : '<h1>{{test}}</h1>',
			templateUrl: 'static/views/list.html',
			controller: 'oacontroller'
		}).when('/list/add', {
			templateUrl: 'static/views/add.html',
			controller: 'oacontroller'
		}).when('/list/update/:idpos', {
			templateUrl: 'static/views/update.html',
			controller: 'oaupcontroller'
		}).otherwise({
			redirectTo: '/list'
		});
}]);