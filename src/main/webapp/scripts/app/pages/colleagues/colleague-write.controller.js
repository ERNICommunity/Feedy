'use strict';

angular.module('feedyApp')
    .controller('ColleagueWriteController', function ($scope, $stateParams, $uibModalInstance, entity, Answer, User, Form, Question) {
        $scope.user = {};
        $scope.selectedForm ={};
        $scope.forms = Form.query(function(result){
            $scope.selectedForm = result[0];
        });

        $scope.load = function (login) {
            User.get({login: login}, function(result) {
                $scope.user = result;
            });
        };
        $scope.load($stateParams.login);

        $scope.clear = function() {
            $uibModalInstance.dismiss('cancel');
        };

         $scope.questions = [];
                 $scope.loadAll = function() {
                    Question.query(function(result) {
                        $scope.questions = result;
                    });
                 };
                 $scope.loadAll();


                 $scope.refresh = function () {
                    $scope.loadAll();
                    $scope.clear();
                 };
        $scope.save = function () {
                    $scope.isSaving = true;
                    if ($scope.answer.id != null) {
                        Answer.update($scope.answer, onSaveSuccess, onSaveError);
                    } else {
                        Answer.save($scope.answer, onSaveSuccess, onSaveError);
                    }
                };

        $scope.answer = entity;
        var onSaveSuccess = function (result) {
                    $scope.$emit('feedyApp:answerUpdate', result);
                    $uibModalInstance.close(result);
                    $scope.isSaving = false;
                };

        var onSaveError = function (result) {
                    $scope.isSaving = false;
                };


        $scope.save = function () {
                    $scope.isSaving = true;
                    if ($scope.answer.id != null) {
                        Answer.update($scope.answer, onSaveSuccess, onSaveError);
                    } else {
                        Answer.save($scope.answer, onSaveSuccess, onSaveError);
                    }
                };
    });

