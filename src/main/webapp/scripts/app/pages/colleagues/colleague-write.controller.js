'use strict';

angular.module('feedyApp')
    .controller('ColleagueWriteController', function ($scope, $stateParams, $uibModalInstance, User) {
        $scope.user = {};
        $scope.load = function (login) {
            User.get({login: login}, function(result) {
                $scope.user = result;
            });
        };
        $scope.load($stateParams.login);

        $scope.clear = function() {
            $uibModalInstance.dismiss('cancel');
        };
    });

