'use strict';

angular.module('feedyApp')
    .controller('OptionController', function ($scope, $state, Option) {

        $scope.options = [];
        $scope.loadAll = function() {
            Option.query(function(result) {
               $scope.options = result;
            });
        };
        $scope.loadAll();


        $scope.refresh = function () {
            $scope.loadAll();
            $scope.clear();
        };

        $scope.clear = function () {
            $scope.option = {
                text: null,
                id: null
            };
        };
    });
