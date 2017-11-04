(function () {
    'use strict';

    angular.module('app')
        .controller('CategoriesController', CategoriesController);

    CategoriesController.$inject = ['DataService', '$firebaseArray', '$rootScope', 'toaster'];

    function CategoriesController(DataService, $firebaseArray, $rootScope, toaster) {

        var $ctrl = this;

        $onInit();

        function $onInit() {

            $ctrl.categories = $firebaseArray(DataService.categories($rootScope.user_id));
            $ctrl.mode = 'save';

        }

        $ctrl.save = function (category, categoryForm) {

            if($ctrl.mode === 'save') {
                $ctrl.categories.$add(category).then(function (response) {
                    toaster.pop({type: 'success', body: 'Categoria salva com sucesso!', toasterId: 'app'});
                }, function (reject) {
                    toaster.pop({type: 'error', body: 'Ops! Houve algum erro ao salvar, tente novamente mais tarde.', toasterId: 'app'});
                });
            } else {
                $ctrl.categories[$ctrl.index] = category;
                $ctrl.categories.$save($ctrl.index).then(function (response) {
                    toaster.pop({type: 'success', body: 'Categoria atualizada com sucesso!', toasterId: 'app'});
                }, function (reject) {
                    toaster.pop({type: 'error', body: 'Ops! Houve algum erro ao atualizar, tente novamente mais tarde.', toasterId: 'app'});
                });
            }

            $ctrl.clear(category, categoryForm);

        };

        $ctrl.clear = function (category, categoryForm) {

            delete $ctrl.category;
            categoryForm.$submitted=false;
            $ctrl.mode = 'save';
        };

        $ctrl.delete = function (category){

            $ctrl.categories.$remove(category).then(function (response) {
                toaster.pop({type: 'success', body: 'Categoria removida com sucesso!', toasterId: 'app'});
            }, function (reject) {
                toaster.pop({type: 'error', body: 'Ops! Houve algum erro ao excluir, tente novamente mais tarde.', toasterId: 'app'});
            });

            $ctrl.clear(category, categoryForm);

        };

        $ctrl.edit = function (category, index) {
            $ctrl.mode = 'edit';
            $ctrl.category = angular.copy(category);
            $ctrl.index = index;
        }

    }

})();