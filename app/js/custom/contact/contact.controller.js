(function () {
    'use strict';

    angular.module('app')
        .controller('ContactController', ContactController);

    ContactController.$inject = ['toaster'];

    function ContactController(toaster) {

        var $ctrl = this;

        $onInit();

        function $onInit() {

        }

        $ctrl.submitContact = function () {
            $ctrl.contact = {};
            toaster.pop({type: 'success', body: 'Mensagem enviada com sucesso! Aguarde contato.', toasterId: 'app'});
        }
    }


})();