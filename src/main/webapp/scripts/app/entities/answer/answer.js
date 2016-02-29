'use strict';

angular.module('feedyApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('answer', {
                parent: 'entity',
                url: '/answers',
                data: {
                    authorities: ['ROLE_USER'],
                    pageTitle: 'feedyApp.answer.home.title'
                },
                views: {
                    'content@': {
                        templateUrl: 'scripts/app/entities/answer/answers.html',
                        controller: 'AnswerController'
                    }
                },
                resolve: {
                    translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                        $translatePartialLoader.addPart('answer');
                        $translatePartialLoader.addPart('global');
                        return $translate.refresh();
                    }]
                }
            })
            .state('answer.detail', {
                parent: 'entity',
                url: '/answer/{id}',
                data: {
                    authorities: ['ROLE_USER'],
                    pageTitle: 'feedyApp.answer.detail.title'
                },
                views: {
                    'content@': {
                        templateUrl: 'scripts/app/entities/answer/answer-detail.html',
                        controller: 'AnswerDetailController'
                    }
                },
                resolve: {
                    translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                        $translatePartialLoader.addPart('answer');
                        return $translate.refresh();
                    }],
                    entity: ['$stateParams', 'Answer', function($stateParams, Answer) {
                        return Answer.get({id : $stateParams.id});
                    }]
                }
            })
            .state('answer.new', {
                parent: 'answer',
                url: '/new',
                data: {
                    authorities: ['ROLE_USER'],
                },
                onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                    $uibModal.open({
                        templateUrl: 'scripts/app/entities/answer/answer-dialog.html',
                        controller: 'AnswerDialogController',
                        size: 'lg',
                        resolve: {
                            entity: function () {
                                return {
                                    text: null,
                                    id: null
                                };
                            }
                        }
                    }).result.then(function(result) {
                        $state.go('answer', null, { reload: true });
                    }, function() {
                        $state.go('answer');
                    })
                }]
            })
            .state('answer.edit', {
                parent: 'answer',
                url: '/{id}/edit',
                data: {
                    authorities: ['ROLE_USER'],
                },
                onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                    $uibModal.open({
                        templateUrl: 'scripts/app/entities/answer/answer-dialog.html',
                        controller: 'AnswerDialogController',
                        size: 'lg',
                        resolve: {
                            entity: ['Answer', function(Answer) {
                                return Answer.get({id : $stateParams.id});
                            }]
                        }
                    }).result.then(function(result) {
                        $state.go('answer', null, { reload: true });
                    }, function() {
                        $state.go('^');
                    })
                }]
            })
            .state('answer.delete', {
                parent: 'answer',
                url: '/{id}/delete',
                data: {
                    authorities: ['ROLE_USER'],
                },
                onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                    $uibModal.open({
                        templateUrl: 'scripts/app/entities/answer/answer-delete-dialog.html',
                        controller: 'AnswerDeleteController',
                        size: 'md',
                        resolve: {
                            entity: ['Answer', function(Answer) {
                                return Answer.get({id : $stateParams.id});
                            }]
                        }
                    }).result.then(function(result) {
                        $state.go('answer', null, { reload: true });
                    }, function() {
                        $state.go('^');
                    })
                }]
            });
    });
