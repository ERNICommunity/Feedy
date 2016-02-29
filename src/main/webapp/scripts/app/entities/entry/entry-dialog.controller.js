'use strict';

angular.module('feedyApp').controller('EntryDialogController',
    ['$scope', '$stateParams', '$uibModalInstance', '$q', 'entity', 'Entry', 'Answer', 'User',
        function($scope, $stateParams, $uibModalInstance, $q, entity, Entry, Answer, User) {

        $scope.entry = entity;
        $scope.answers = Answer.query();
        $scope.users = User.query();
        $scope.load = function(id) {
            Entry.get({id : id}, function(result) {
                $scope.entry = result;
            });
        };

        var onSaveSuccess = function (result) {
            $scope.$emit('feedyApp:entryUpdate', result);
            $uibModalInstance.close(result);
            $scope.isSaving = false;
        };

        var onSaveError = function (result) {
            $scope.isSaving = false;
        };

        $scope.save = function () {
            $scope.isSaving = true;
            if ($scope.entry.id != null) {
                Entry.update($scope.entry, onSaveSuccess, onSaveError);
            } else {
                Entry.save($scope.entry, onSaveSuccess, onSaveError);
            }
        };

        $scope.clear = function() {
            $uibModalInstance.dismiss('cancel');
        };
        $scope.datePickerForCreated = {};

        $scope.datePickerForCreated.status = {
            opened: false
        };

        $scope.datePickerForCreatedOpen = function($event) {
            $scope.datePickerForCreated.status.opened = true;
        };
        $scope.datePickerForLastEdited = {};

        $scope.datePickerForLastEdited.status = {
            opened: false
        };

        $scope.datePickerForLastEditedOpen = function($event) {
            $scope.datePickerForLastEdited.status.opened = true;
        };
        $scope.datePickerForFirstRead = {};

        $scope.datePickerForFirstRead.status = {
            opened: false
        };

        $scope.datePickerForFirstReadOpen = function($event) {
            $scope.datePickerForFirstRead.status.opened = true;
        };
}]);
