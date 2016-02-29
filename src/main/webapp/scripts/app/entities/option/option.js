'use strict';

angular.module('feedyApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('option', {
                parent: 'entity',
                url: '/options',
                data: {
                    authorities: ['ROLE_USER'],
                    pageTitle: 'feedyApp.option.home.title'
                },
                views: {
                    'content@': {
                        templateUrl: 'scripts/app/entities/option/options.html',
                        controller: 'OptionController'
                    }
                },
                resolve: {
                    translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                        $translatePartialLoader.addPart('option');
                        $translatePartialLoader.addPart('global');
                        return $translate.refresh();
                    }]
                }
            })
            .state('option.detail', {
                parent: 'entity',
                url: '/option/{id}',
                data: {
                    authorities: ['ROLE_USER'],
                    pageTitle: 'feedyApp.option.detail.title'
                },
                views: {
                    'content@': {
                        templateUrl: 'scripts/app/entities/option/option-detail.html',
                        controller: 'OptionDetailController'
                    }
                },
                resolve: {
                    translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                        $translatePartialLoader.addPart('option');
                        return $translate.refresh();
                    }],
                    entity: ['$stateParams', 'Option', function($stateParams, Option) {
                        return Option.get({id : $stateParams.id});
                    }]
                }
            })
            .state('option.new', {
                parent: 'option',
                url: '/new',
                data: {
                    authorities: ['ROLE_USER'],
                },
                onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                    $uibModal.open({
                        templateUrl: 'scripts/app/entities/option/option-dialog.html',
                        controller: 'OptionDialogController',
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
                        $state.go('option', null, { reload: true });
                    }, function() {
                        $state.go('option');
                    })
                }]
            })
            .state('option.edit', {
                parent: 'option',
                url: '/{id}/edit',
                data: {
                    authorities: ['ROLE_USER'],
                },
                onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                    $uibModal.open({
                        templateUrl: 'scripts/app/entities/option/option-dialog.html',
                        controller: 'OptionDialogController',
                        size: 'lg',
                        resolve: {
                            entity: ['Option', function(Option) {
                                return Option.get({id : $stateParams.id});
                            }]
                        }
                    }).result.then(function(result) {
                        $state.go('option', null, { reload: true });
                    }, function() {
                        $state.go('^');
                    })
                }]
            })
            .state('option.delete', {
                parent: 'option',
                url: '/{id}/delete',
                data: {
                    authorities: ['ROLE_USER'],
                },
                onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                    $uibModal.open({
                        templateUrl: 'scripts/app/entities/option/option-delete-dialog.html',
                        controller: 'OptionDeleteController',
                        size: 'md',
                        resolve: {
                            entity: ['Option', function(Option) {
                                return Option.get({id : $stateParams.id});
                            }]
                        }
                    }).result.then(function(result) {
                        $state.go('option', null, { reload: true });
                    }, function() {
                        $state.go('^');
                    })
                }]
            });
    });
