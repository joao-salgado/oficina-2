(function() {
    'use strict';

    angular
        .module('app')
        .factory('DataService', DataService);

    function DataService() {
        var root = firebase.database().ref();

        return {
            root: root,
            users: root.child('users'),
            payments: root.child('payments'),
            categories: root.child('categories')
        };
    }
    
})();
