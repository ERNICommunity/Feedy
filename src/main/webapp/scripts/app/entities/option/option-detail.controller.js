'use strict';

angular.module('feedyApp')
    .controller('OptionDetailController', function ($scope, $rootScope, $stateParams, entity, Option, Question) {
        $scope.option = entity;
        $scope.load = function (id) {
            Option.get({id: id}, function(result) {
                $scope.option = result;
            });
        };
        var unsubscribe = $rootScope.$on('feedyApp:optionUpdate', function(event, result) {
            $scope.option = result;
        });
        $scope.$on('$destroy', unsubscribe);

    });
