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
            earnings: _earnings
        };

        function _categories(id) {
            return root.child('users').child(id).child('TypeofExpenses');
        }

        function _expenses(id) {
            return root.child('users').child(id).child('Expenses');
        }

        function _earnings(id) {
            return root.child('users').child(id).child('Profit');
        }
    }
    
})();
