(function() {

	'use strict';

	angular.module('app')
		.controller('TopNavBarController', TopNavBarController);

	TopNavBarController.$inject = ['$rootScope'];

	function TopNavBarController($rootScope) {

		var $ctrl = this;

		$ctrl.logout = function() {
			$rootScope.$emit('logout');
		}

	}

})();