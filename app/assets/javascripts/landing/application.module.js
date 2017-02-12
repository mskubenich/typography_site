(function () {
    "use strict";
    var TypographySiteLandingApp = angular.module('TypographySiteLandingApp', [
        'ui.router',
        'templates',
        'ngDialog',
        'validation.match',
        'validation.email',
        'fileread',
        'ui.bootstrap',
        'formInput.images',
        'formInput.image',
        'toaster',
        'AuthHttp',
        'ngAnimate'
    ]);

    TypographySiteLandingApp.config(['$urlRouterProvider', '$stateProvider', '$httpProvider',
        function ($urlRouterProvider, $stateProvider, $httpProvider) {

            $httpProvider.defaults.headers.common['X-Requested-With'] = 'AngularXMLHttpRequest';

            $urlRouterProvider.otherwise('/');

            $stateProvider
                .state('home',{
                  url: '/',
                  templateUrl: 'landing/templates/home/index.html',
                  controller: 'LandingController'
                })
                .state('login',{
                  url: '/login',
                  templateUrl: 'landing/templates/sessions/new.html',
                  controller: 'SessionsController'
                });
    }]);

    TypographySiteLandingApp.run(['$http', '$rootScope', function($http, $rootScope){
        var csrf_token = $('meta[name="csrf-token"]').attr('content');
        $http.defaults.headers.common['X-CSRF-Token'] = csrf_token;
    }]);

}());