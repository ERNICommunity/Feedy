'use strict';

angular.module('feedyApp')
    .factory('Entry', function ($resource, DateUtils) {
        return $resource('api/entrys/:id', {}, {
            'query': { method: 'GET', isArray: true},
            'get': {
                method: 'GET',
                transformResponse: function (data) {
                    data = angular.fromJson(data);
                    data.created = DateUtils.convertDateTimeFromServer(data.created);
                    data.lastEdited = DateUtils.convertDateTimeFromServer(data.lastEdited);
                    data.firstRead = DateUtils.convertDateTimeFromServer(data.firstRead);
                    return data;
                }
            },
            'update': { method:'PUT' }
        });
    });
