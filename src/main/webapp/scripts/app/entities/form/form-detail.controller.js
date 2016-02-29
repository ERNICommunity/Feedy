'use strict';

angular.module('feedyApp')
    .controller('FormDetailController', function ($scope, $rootScope, $stateParams, entity, Form, Question) {
        $scope.form = entity;
        $scope.load = function (id) {
            Form.get({id: id}, function(result) {
                $scope.form = result;
            });
        };
        var unsubscribe = $rootScope.$on('feedyApp:formUpdate', function(event, result) {
            $scope.form = result;
        });
        $scope.$on('$destroy', unsubscribe);

    });
