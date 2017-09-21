(function() {

	'use strict';

	var myApp = angular.module('app', ['firebase', 'ui.router']);


	myApp.config(function($stateProvider, $urlRouterProvider, $injector) {

		var config = {
		    apiKey: "AIzaSyDgYMrMMXhkNCvVLl7bTNY3vltNvZ_1yBo",
		    authDomain: "controle-de-dispesas.firebaseapp.com",
		    databaseURL: "https://controle-de-dispesas.firebaseio.com",
		    projectId: "controle-de-dispesas",
		    storageBucket: "",
		    messagingSenderId: "194792838263"
	  	};
	  	firebase.initializeApp(config);
    
	    $urlRouterProvider.otherwise('home');
	    
	    $stateProvider
	        .state('home', {
	            url: '/home',
	            templateUrl: '../../view/home.html'
	        })
	        
	        .state('login', {
	            url: '/login',
	            templateUrl: '../../view/login.html',
	            controller: 'LoginController as $ctrl'
	        })
	});

	myApp.run(function($rootScope, $state) {

		$rootScope.current_view = $state;


		/*$rootScope.$on("$stateChangeError", function(event, toState, toParams, fromState, fromParams, error) {
		    if (error === "AUTH_REQUIRED") {
		      $state.go("login");
		    }
	  	});*/


	})
	
})();