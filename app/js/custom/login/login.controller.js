(function() {

	'use strict';

	angular.module('app')
		.controller('LoginController', LoginController);

	LoginController.$inject = ['$scope', 'authService'];

	function LoginController($scope, authService) {

		var $ctrl = this;



		$ctrl.createUser = function(isValid) {

			if(isValid) {
				authService.create($ctrl.user.email, $ctrl.user.password)
					.then(function(firebaseUser) {

						firebaseUser.display_name = $ctrl.user.name;
						authService.updateProfile(firebaseUser);

					});
			}


			console.log($ctrl.user);
		}




		$('#login-form-link').click(function(e) {
		$("#login-form").delay(100).fadeIn(100);
 		$("#register-form").fadeOut(100);
		$('#register-form-link').removeClass('active');
		$(this).addClass('active');
			e.preventDefault();
		});
		$('#register-form-link').click(function(e) {
			$("#register-form").delay(100).fadeIn(100);
	 		$("#login-form").fadeOut(100);
			$('#login-form-link').removeClass('active');
			$(this).addClass('active');
			e.preventDefault();
		});

	}	

})();