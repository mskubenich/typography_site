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
            $stateProvider
                .state('new_gallery_item',{
                    url: '/gallery_item/new',
                    templateUrl: 'application/templates/gallery_items/form.html',
                    controller: 'GalleryItemsController'
                })
            $stateProvider
                .state('show_gallery_item',{
                    url: '/gallery_item/:id',
                    templateUrl: 'application/templates/gallery_items/show.html',
                    controller: 'GalleryItemsController'
                });
            $stateProvider
                .state('edit_gallery_item',{
                    url: '/gallery_item/:id/edit',
                    templateUrl: 'application/templates/gallery_items/form.html',
                    controller: 'GalleryItemsController'
                })
            $stateProvider
                .state('gallery_items',{
                    url: '/gallery_items',
                    templateUrl: 'application/templates/gallery_items/index.html',
                    controller: 'GalleryItemsController'
                })
    }]);

    TypographySiteApp.run(['$http', '$rootScope', function($http, $rootScope){
        var csrf_token = $('meta[name="csrf-token"]').attr('content');
        $http.defaults.headers.common['X-CSRF-Token'] = csrf_token;
    }]);

}());