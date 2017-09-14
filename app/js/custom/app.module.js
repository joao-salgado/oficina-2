(function() {

	'use strict';

	var myApp = angular.module('app', ['ui.router']);

	myApp.config(function($stateProvider, $urlRouterProvider) {
    
	    $urlRouterProvider.otherwise('/home');
	    
	    $stateProvider
	        .state('home', {
	            url: '/home',
	            templateUrl: '../../view/home.html'
	        })
	        
	        .state('login', {
	            url: '/login',
	            templateUrl: '../../view/login.html',
	            controller: function($scope) {}
	        })
	});
	
})();