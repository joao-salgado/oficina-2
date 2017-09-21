(function() {

	'use strict';

	angular.module('app')
		.service('authService', authService);

	authService.$inject = ['$firebaseAuth'];

	function authService($firebaseAuth) {

		return {
			isAuthenticated: _isAuthenticated,
			create: _createNewUser,
			updateProfile: _updateProfile,
			auth: _instance
		}

		function _isAuthenticated() {

		}


		function _instance() {
    		return $firebaseAuth();
  		}

  		function _createNewUser(email, password) {

  			var auth = _instance();

  			return auth.$createUserWithEmailAndPassword(email, password)
		        .then(function(firebaseUser) {
		        	return firebaseUser;
		        }).catch(function(error) {
		         	return error;
		        });
	    };

	    function _updateProfile(user) {

			var auth = _instance();

			//is not a function :/
  			return auth.updateProfile(user).then(function(response) {
		  		return response;
			}, function(error) {
			  	return error;
			});
  		}

	}	

})();