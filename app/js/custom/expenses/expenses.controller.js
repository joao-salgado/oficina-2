(function () {
    'use strict';

    angular.module('app')
        .controller('ExpensesController', ExpensesController);

    ExpensesController.$inject = ['DataService', '$firebaseArray', '$rootScope', 'toaster'];

    function ExpensesController(DataService, $firebaseArray, $rootScope, toaster) {

        var $ctrl = this;

        $onInit();

        function $onInit() {

            $ctrl.expenses = $firebaseArray(DataService.expenses($rootScope.user_id));
            $ctrl.categories = $firebaseArray(DataService.categories($rootScope.user_id));
            $ctrl.mode = 'save';

        }

        $ctrl.save = function (expense, expenseForm) {

            if($ctrl.mode === 'save') {
                $ctrl.expenses.$add(expense).then(function (response) {
                    toaster.pop({type: 'success', body: 'Despesa salvo com sucesso!', toasterId: 'app'});
                }, function (reject) {
                    toaster.pop({type: 'error', body: 'Ops! Houve algum erro ao salvar, tente novamente mais tarde.', toasterId: 'app'});
                });
            } else {
                $ctrl.expenses[$ctrl.index] = expense;
                $ctrl.expenses.$save($ctrl.index).then(function (response) {
                    toaster.pop({type: 'success', body: 'Despesa atualizada com sucesso!', toasterId: 'app'});
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