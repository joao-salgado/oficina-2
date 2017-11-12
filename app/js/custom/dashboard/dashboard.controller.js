(function () {
    'use strict';

    angular.module('app')
        .controller('DashboardController', DashboardController);

    DashboardController.$inject = ['DataService', '$firebaseArray', '$rootScope', 'toaster'];

    function DashboardController(DataService, $firebaseArray, $rootScope, toaster) {

        var $ctrl = this;

        $onInit();

        function $onInit() {

            $ctrl.expenses = $firebaseArray(DataService.expenses($rootScope.user_id));
            $ctrl.categories = $firebaseArray(DataService.categories($rootScope.user_id));
            $ctrl.mode = 'save';

        }
    }


})();