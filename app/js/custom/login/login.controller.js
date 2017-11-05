(function() {

	'use strict';

	angular.module('app')
		.controller('LoginController', LoginController);

	LoginController.$inject = ['$scope', 'authService', '$state', 'DataService', 'toaster'];

	function LoginController($scope, authService, $state, DataService, toaster) {

		var $ctrl = this;

		$ctrl.createUser = function(isValid) {

			if(isValid && $ctrl.user.password === $ctrl.user.confirm_password) {
				authService.create($ctrl.user.email, $ctrl.user.password)
					.then(function(firebaseUser) {

						var user = {
							email: firebaseUser.email,
							profile: {
								name: firebaseUser.displayName || $ctrl.user.name,
								picture: firebaseUser.photoURL || 'app/img/avatar-default.png'
							},
							status: "active",
							created: (new Date()).getTime(),
							modified: (new Date()).getTime()
						};
						DataService.users.child(firebaseUser.uid)
							.set(user)
							.then(function () {
								console.log('Synchronization succeeded');
							})
							.catch(function (error) {
                                console.log('Synchronization failed');
							});

						$state.go('app.expenses');
					})
					.catch(function(reject) {
                        if(reject.code === 'auth/email-already-in-use') {
                            toaster.pop({type: 'error', body: 'Ops! Este email já está sendo utilizado', toasterId: 'app'});
                        }
					});
			}

		};

		$ctrl.login = function (login) {
        
            authService.login(login.email, login.password)
                .then(function (firebaseUser) {
                    $state.go('app.expenses');
                })
                .catch(function (error) {
                    // vm.authCode = error.code; // auth/user-not-found, auth/wrong-password
                    $ctrl.loginError = true;
                });
                
        };

        //EFEITO NO LOGIN
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