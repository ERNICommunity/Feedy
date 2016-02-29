'use strict';

angular.module('feedyApp')
    .controller('FormController', function ($scope, $state, Form) {

        $scope.forms = [];
        $scope.loadAll = function() {
            Form.query(function(result) {
               $scope.forms = result;
            });
        };
        $scope.loadAll();


        $scope.refresh = function () {
            $scope.loadAll();
            $scope.clear();
        };

        $scope.clear = function () {
            $scope.form = {
                id: null
            };
        };
    });
