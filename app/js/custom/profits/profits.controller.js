(function () {
    'use strict';

    angular.module('app')
        .controller('ProfitsController', ProfitsController);

    ProfitsController.$inject = ['DataService', '$firebaseArray', '$rootScope', 'toaster'];

    function ProfitsController(DataService, $firebaseArray, $rootScope, toaster) {

        var $ctrl = this;

        $onInit();

        function $onInit() {

            $ctrl.profits = $firebaseArray(DataService.profits($rootScope.user_id));
            $ctrl.mode = 'save';

        }

        $ctrl.save = function (profit, profitForm) {

            if($ctrl.mode === 'save') {
                $ctrl.profits.$add(profit).then(function (response) {
                    toaster.pop({type: 'success', body: 'Ganho salvo com sucesso!', toasterId: 'app'});
                }, function (reject) {
                    toaster.pop({type: 'error', body: 'Ops! Houve algum erro ao salvar, tente novamente mais tarde.', toasterId: 'app'});
                });
            } else {
                $ctrl.profits[$ctrl.index] = profit;
                $ctrl.profits.$save($ctrl.index).then(function (response) {
                    toaster.pop({type: 'success', body: 'Ganho atualizado com sucesso!', toasterId: 'app'});
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