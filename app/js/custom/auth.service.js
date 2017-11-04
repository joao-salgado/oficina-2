(function() {

	'use strict';

	angular.module('app')
		.service('authService', authService);

	authService.$inject = ['$firebaseAuth'];

	function authService($firebaseAuth) {

		var _firebaseAuthObject = $firebaseAuth();

		return {
			isAuthenticated: _isAuthenticated,
			create: _createNewUser,
			auth: _firebaseAuthObject,
			login: _login,
			logout: _logout
		};

		function _isAuthenticated() {
			return !!_firebaseAuthObject.$getAuth();
		}

		function _login(username, password) {
            return _firebaseAuthObject.$signInWithEmailAndPassword(username, password);
        }

		function _logout() {
            _firebaseAuthObject.$signOut();
        }


  		function _createNewUser(email, password) {
  			return _firebaseAuthObject.$createUserWithEmailAndPassword(email, password);
	    }

	}	

})();