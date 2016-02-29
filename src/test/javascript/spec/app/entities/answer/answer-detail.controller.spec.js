'use strict';

describe('Controller Tests', function() {

    describe('Answer Detail Controller', function() {
        var $scope, $rootScope;
        var MockEntity, MockAnswer, MockQuestion, MockOption;
        var createController;

        beforeEach(inject(function($injector) {
            $rootScope = $injector.get('$rootScope');
            $scope = $rootScope.$new();
            MockEntity = jasmine.createSpy('MockEntity');
            MockAnswer = jasmine.createSpy('MockAnswer');
            MockQuestion = jasmine.createSpy('MockQuestion');
            MockOption = jasmine.createSpy('MockOption');
            

            var locals = {
                '$scope': $scope,
                '$rootScope': $rootScope,
                'entity': MockEntity ,
                'Answer': MockAnswer,
                'Question': MockQuestion,
                'Option': MockOption
            };
            createController = function() {
                $injector.get('$controller')("AnswerDetailController", locals);
            };
        }));


        describe('Root Scope Listening', function() {
            it('Unregisters root scope listener upon scope destruction', function() {
                var eventType = 'feedyApp:answerUpdate';

                createController();
                expect($rootScope.$$listenerCount[eventType]).toEqual(1);

                $scope.$destroy();
                expect($rootScope.$$listenerCount[eventType]).toBeUndefined();
            });
        });
    });

});
