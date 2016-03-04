'use strict';

angular.module('feedyApp').controller('OptionDialogController',
    ['$scope', '$stateParams', '$uibModalInstance', 'entity', 'Option', 'Question',
        function($scope, $stateParams, $uibModalInstance, entity, Option, Question) {

        $scope.option = entity;
        $scope.questions = Question.query();
        $scope.load = function(id) {
            Option.get({id : id}, function(result) {
                $scope.option = result;
            });
        };

        var onSaveSuccess = function (result) {
            $scope.$emit('feedyApp:optionUpdate', result);
            $uibModalInstance.close(result);
            $scope.isSaving = false;
        };

        var onSaveError = function (result) {
            $scope.isSaving = false;
        };

        $scope.save = function () {
            $scope.isSaving = true;
            if ($scope.option.id != null) {
                Option.update($scope.option, onSaveSuccess, onSaveError);
            } else {
                Option.save($scope.option, onSaveSuccess, onSaveError);
            }
        };

        $scope.clear = function() {
            $uibModalInstance.dismiss('cancel');
        };
}]);
