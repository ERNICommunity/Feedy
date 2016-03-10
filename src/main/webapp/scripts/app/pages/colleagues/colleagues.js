'use strict';

angular.module('feedyApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('colleagues', {
                parent: 'site',
                url: '/colleagues',
                data: {
                    authorities: []
                },
                views: {
                    'content@': {
                        templateUrl: 'scripts/app/pages/colleagues/colleagues.html',
                        controller: 'ColleaguesController'
                    }
                },
                resolve: {
                    mainTranslatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate,$translatePartialLoader) {
                        $translatePartialLoader.addPart('colleagues');
                        return $translate.refresh();
                    }]
                }
            })
            .state('colleagues.write', {
                parent: 'colleagues',
                url: '/{login}/write',
                data: {
                    authorities: ['ROLE_USER'],
                },
                onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                    $uibModal.open({
                        templateUrl: 'scripts/app/pages/colleagues/colleague-write.html',
                        controller: 'ColleagueWriteController',
                        size: 'lg',
                        resolve: {
                            entity: ['User', function(User) {
                                return User.get({login : $stateParams.login});
                            }]
                        }
                    }).result.then(function(result) {
                        $state.go('colleagues', null, { reload: true });
                    }, function() {
                        $state.go('^');
                    })
                }]
            })
    });
