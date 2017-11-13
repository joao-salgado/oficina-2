(function () {
    'use strict';

    angular.module('app')
        .controller('ExpensesController', ExpensesController);

    ExpensesController.$inject = ['$scope', 'DataService', '$firebaseArray', '$rootScope', 'toaster'];

    function ExpensesController($scope, DataService, $firebaseArray, $rootScope, toaster) {

        var $ctrl = this;

        $onInit();

        function $onInit() {

            var promise = $firebaseArray(DataService.expenses($rootScope.user_id)).$loaded();

            promise.then(function (response) {
                $ctrl.expenses = response;// $ctrl.expenses = response;
                $ctrl.expenses = $ctrl.expenses || [];
                calcTotal();
            });

            $ctrl.categories = $firebaseArray(DataService.categories($rootScope.user_id));
            $ctrl.mode = 'save';
        }

        function calcTotal() {
            if($ctrl.expenses[1]) {
                $ctrl.total = $ctrl.expenses.reduce(function (v1, v2) {
                    return parseInt(v1.value) + parseInt(v2.value);
                });
            } else {
                $ctrl.total = $ctrl.expenses && $ctrl.expenses[0] ? $ctrl.expenses[0].value : 0;
            }
        }

        $ctrl.save = function (expense, expenseForm) {

            if($ctrl.mode === 'save') {
                $ctrl.expenses.$add(expense).then(function (response) {
                    toaster.pop({type: 'success', body: 'Despesa salvo com sucesso!', toasterId: 'app'});
                    calcTotal();
                }, function (reject) {
                    toaster.pop({type: 'error', body: 'Ops! Houve algum erro ao salvar, tente novamente mais tarde.', toasterId: 'app'});
                });
            } else {
                $ctrl.expenses[$ctrl.index] = expense;
                $ctrl.expenses.$save($ctrl.index).then(function (response) {
                    toaster.pop({type: 'success', body: 'Despesa atualizada com sucesso!', toasterId: 'app'});
                    calcTotal();
                }, function (reject) {
                    toaster.pop({type: 'error', body: 'Ops! Houve algum erro ao atualizar, tente novamente mais tarde.', toasterId: 'app'});
                });
            }

            $ctrl.clear(expense, expenseForm);

        };

        $ctrl.clear = function (expense, expenseForm) {
            delete $ctrl.expense;
            expenseForm.$submitted=false;
            $ctrl.mode = 'save';
        };

        $ctrl.delete = function (expense){

            $ctrl.expenses.$remove(expense).then(function (response) {
                toaster.pop({type: 'success', body: 'Despesa removida com sucesso!', toasterId: 'app'});
                calcTotal()
            }, function (reject) {
                toaster.pop({type: 'error', body: 'Ops! Houve algum erro ao excluir, tente novamente mais tarde.', toasterId: 'app'});
            });

            $ctrl.clear(expense, expenseForm);

        };

        $ctrl.edit = function (expense, index) {
            $ctrl.mode = 'edit';
            $ctrl.expense = angular.copy(expense);
            $ctrl.index = index;
        }

    }

})();