'use strict';

angular.module('feedyApp')
	.controller('OptionDeleteController', function($scope, $uibModalInstance, entity, Option) {

        $scope.option = entity;
        $scope.clear = function() {
            $uibModalInstance.dismiss('cancel');
        };
        $scope.confirmDelete = function (id) {
            Option.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        };

    });
