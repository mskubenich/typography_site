(function () {
    "use strict";
    var TypographySiteApp = angular.module('TypographySiteApp', [
        'ui.router',
        'templates',
        'ngDialog',
        'validation.match',
        'validation.email',
        'fileread',
        'ui.bootstrap',
        'bootstrapLightbox',
        'ui-rangeSlider',
        'redactor',
        'formInput.images',
        'formInput.image',
        'toaster',
        'angular-ladda',
        'AuthHttp',
        'oitozero.ngSweetAlert'
    ]);

    TypographySiteApp.config(['$urlRouterProvider', '$stateProvider', '$httpProvider',
        function ($urlRouterProvider, $stateProvider, $httpProvider) {

            $httpProvider.defaults.headers.common['X-Requested-With'] = 'AngularXMLHttpRequest';

            $urlRouterProvider.otherwise('home');

            $stateProvider
                .state('home',{
                  url: '',
                  templateUrl: 'application/templates/home/index.html',
                  controller: 'HomeController'
                })
                .state('profile',{
                    url: '/profile',
                    templateUrl: 'application/templates/users/edit.html',
                    controller: 'UsersController'
                });
            // generated routes:
    }]);

    TypographySiteApp.run(['$http', '$rootScope', function($http, $rootScope){
        var csrf_token = $('meta[name="csrf-token"]').attr('content');
        $http.defaults.headers.common['X-CSRF-Token'] = csrf_token;
    }]);

}());