(function () {
    'use strict';

    angular.module('app')
        .controller('ProfitsController', ProfitsController);

    ProfitsController.$inject = ['DataService', '$firebaseArray', '$rootScope', 'toaster'];

    function ProfitsController(DataService, $firebaseArray, $rootScope, toaster) {

        var $ctrl = this;

        $onInit();

        function $onInit() {

            var promise = $firebaseArray(DataService.profits($rootScope.user_id)).$loaded();

            promise.then(function (response) {
                $ctrl.profits = response;// $ctrl.expenses = response;
                $ctrl.profits = $ctrl.profits || [];
                calcTotal();
            });

            $ctrl.mode = 'save';

        }

        function calcTotal() {
            if($ctrl.profits[1]) {
                $ctrl.total = $ctrl.profits.reduce(function (v1, v2) {
                    return parseInt(v1.value) + parseInt(v2.value);
                });
            } else {
                $ctrl.total = $ctrl.profits && $ctrl.profits[0] ? $ctrl.profits[0].value : 0;
            }
        }

        $ctrl.save = function (profit, profitForm) {

            if($ctrl.mode === 'save') {
                $ctrl.profits.$add(profit).then(function (response) {
                    toaster.pop({type: 'success', body: 'Ganho salvo com sucesso!', toasterId: 'app'});
                    calcTotal();
                }, function (reject) {
                    toaster.pop({type: 'error', body: 'Ops! Houve algum erro ao salvar, tente novamente mais tarde.', toasterId: 'app'});
                });
            } else {
                $ctrl.profits[$ctrl.index] = profit;
                $ctrl.profits.$save($ctrl.index).then(function (response) {
                    toaster.pop({type: 'success', body: 'Ganho atualizado com sucesso!', toasterId: 'app'});
                    calcTotal();
                }, function (reject) {
                    toaster.pop({type: 'error', body: 'Ops! Houve algum erro ao atualizar, tente novamente mais tarde.', toasterId: 'app'});
                });
            }

            $ctrl.clear(profit, profitForm);

        };

        $ctrl.clear = function (profit, profitForm) {

            delete $ctrl.profit;
            profitForm.$submitted=false;
            $ctrl.mode = 'save';
        };

        $ctrl.delete = function (profit){

            $ctrl.profits.$remove(profit).then(function (response) {
                toaster.pop({type: 'success', body: 'Ganho removido com sucesso!', toasterId: 'app'});
                calcTotal();
            }, function (reject) {
                toaster.pop({type: 'error', body: 'Ops! Houve algum erro ao excluir, tente novamente mais tarde.', toasterId: 'app'});
            });

            $ctrl.clear(profit, profitForm);

        };

        $ctrl.edit = function (profit, index) {
            $ctrl.mode = 'edit';
            $ctrl.profit = angular.copy(profit);
            $ctrl.index = index;
        }

    }

})();