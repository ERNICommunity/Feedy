'use strict';

angular.module('feedyApp')
	.controller('AnswerDeleteController', function($scope, $uibModalInstance, entity, Answer) {

        $scope.answer = entity;
        $scope.clear = function() {
            $uibModalInstance.dismiss('cancel');
        };
        $scope.confirmDelete = function (id) {
            Answer.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        };

    });
