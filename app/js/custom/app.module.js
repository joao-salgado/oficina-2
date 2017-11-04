(function() {

	'use strict';

	var myApp = angular.module('app', ['firebase', 'ui.router', 'toaster']);

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

        $urlRouterProvider.otherwise('app/despesas');
    
	    $stateProvider
		    .state('app', {
                url: '/app',
                abstract: true,
                templateUrl: '/../app.html',
                resolve: angular.extend(  
                    {
                        'currentAuth': ['authService', function (authService) {	                          
                            return authService.auth.$requireSignIn();
                        }]
                    }
                )               
            })
	        .state('app.expenses', {
	            url: '/despesas',
	            title: 'Despesas',
	            templateUrl: '/../view/expenses.html'
	        })
            .state('app.earnings', {
                url: '/ganhos',
                title: 'Ganhos',
                templateUrl: '/../view/earnings.html'
            })
            .state('app.categories', {
                url: '/categorias',
                title: 'Categorias',
                templateUrl: '/../view/categories.html',
                controller: 'CategoriesController as $ctrl'
            })
	        .state('login', {
	            url: '/entrar',
	            title: 'Login',
	            templateUrl: '/../view/login.html',
	            controller: 'LoginController as $ctrl'
	        })
	});

	myApp.run(function($rootScope, $state, $window, authService) {

		$rootScope.current_view = $state;

        authService.auth.$onAuthStateChanged(function (firebaseUser) {
            if (firebaseUser && firebaseUser.uid) {
                $rootScope.user_id = firebaseUser.uid; //$firebaseObject(DataService.users.child(firebaseUser.uid));
            }
        });

	  	$rootScope.$on('$stateChangeError',
            function (event, toState, toParams, fromState, fromParams, error) {
				$state.transitionTo("login");
				event.preventDefault();

            });

	  	$rootScope.$on('$stateChangeSuccess',
            function (event, toState, toParams, fromState, fromParams) {
                // display new view from top
                $window.scrollTo(0, 0);
                // Save the route title
                $rootScope.currTitle = $state.current.title;
            });

	  	$rootScope.$on("logout", function () {
            authService.logout();
            $state.go('login');
        });

	})
	
})();