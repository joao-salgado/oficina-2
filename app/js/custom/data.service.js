(function() {
    'use strict';

    angular
        .module('app')
        .factory('DataService', DataService);

    function DataService() {
        var root = firebase.database().ref();

        return {
            root: root,
            users: root.child('User'),
            expenses: _expenses,
            categories: _categories,
            profits: _profits
        };

        function _categories(id) {
            return root.child('users').child(id).child('TypeofExpenses');
        }

        function _expenses(id) {
            return root.child('users').child(id).child('Expenses');
        }

        function _profits(id) {
            return root.child('users').child(id).child('Profit');
        }
    }
    
})();
