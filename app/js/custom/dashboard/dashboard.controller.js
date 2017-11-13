(function () {
    'use strict';

    angular.module('app')
        .controller('DashboardController', DashboardController);

    DashboardController.$inject = ['DataService', '$firebaseArray', '$rootScope', 'toaster'];

    function DashboardController(DataService, $firebaseArray, $rootScope, toaster) {

        var $ctrl = this;

        $onInit();

        function $onInit() {

            var promiseExpenses = $firebaseArray(DataService.expenses($rootScope.user_id)).$loaded();

            promiseExpenses.then(function (response) {
                $ctrl.expenses = response;// $ctrl.expenses = response;
                $ctrl.expenses = $ctrl.expenses || [];
                makeGraph();
            });

            var promiseProfits = $firebaseArray(DataService.profits($rootScope.user_id)).$loaded();

            promiseProfits.then(function (response) {
                $ctrl.totalProfits = 0;
                response.forEach(function (profit) {
                    $ctrl.totalProfits += parseInt(profit.value);
                });
            });

            var promiseCategories = $firebaseArray(DataService.categories($rootScope.user_id)).$loaded();

            promiseCategories.then(function (response) {
                $ctrl.totalCategories = response.length;
            });

        }

        function getDonutValues(element) {
            var sum = 0;
            $ctrl.expenses.forEach(function (internElement) {
                if(internElement.type_of_expenses.name === element.type_of_expenses.name) {
                    sum += parseInt(internElement.value);
                }
            });
            return sum;
        }
        
        function makeGraph() {

            var auxCategories = [];

            $ctrl.expenses.forEach(function (element) {

                var oldCategory = auxCategories.some(function (t) {
                    return t.category === element.type_of_expenses.name;
                });

                if(!oldCategory) {
                    auxCategories.push({
                        category: element.type_of_expenses.name,
                        value: getDonutValues(element)
                    });
                }

            });

            $ctrl.donutData = [];
            $ctrl.donutColors = [];
            $ctrl.totalExpenses = 0;
            auxCategories.forEach(function (element) {
                $ctrl.totalExpenses += element.value;

                $ctrl.donutData.push({
                    label: element.category,
                    value: element.value
                });
                $ctrl.donutColors.push('#' + Math.random().toString(16).slice(2, 8));
            });
        }
    }


})();