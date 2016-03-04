'use strict';

describe('Controller Tests', function() {

    describe('Question Detail Controller', function() {
        var $scope, $rootScope;
        var MockEntity, MockQuestion, MockOption, MockForm;
        var createController;

        beforeEach(inject(function($injector) {
            $rootScope = $injector.get('$rootScope');
            $scope = $rootScope.$new();
            MockEntity = jasmine.createSpy('MockEntity');
            MockQuestion = jasmine.createSpy('MockQuestion');
            MockOption = jasmine.createSpy('MockOption');
            MockForm = jasmine.createSpy('MockForm');
            

            var locals = {
                '$scope': $scope,
                '$rootScope': $rootScope,
                'entity': MockEntity ,
                'Question': MockQuestion,
                'Option': MockOption,
                'Form': MockForm
            };
            createController = function() {
                $injector.get('$controller')("QuestionDetailController", locals);
            };
        }));


        describe('Root Scope Listening', function() {
            it('Unregisters root scope listener upon scope destruction', function() {
                var eventType = 'feedyApp:questionUpdate';

                createController();
                expect($rootScope.$$listenerCount[eventType]).toEqual(1);

                $scope.$destroy();
                expect($rootScope.$$listenerCount[eventType]).toBeUndefined();
            });
        });
    });

});
