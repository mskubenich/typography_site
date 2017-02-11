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
                .state('new_product',{
                    url: '/product/new',
                    templateUrl: 'application/templates/products/form.html',
                    controller: 'ProductsController'
                })
            $stateProvider
                .state('show_product',{
                    url: '/product/:id',
                    templateUrl: 'application/templates/products/show.html',
                    controller: 'ProductsController'
                });
            $stateProvider
                .state('edit_product',{
                    url: '/product/:id/edit',
                    templateUrl: 'application/templates/products/form.html',
                    controller: 'ProductsController'
                })
            $stateProvider
                .state('products',{
                    url: '/products',
                    templateUrl: 'application/templates/products/index.html',
                    controller: 'ProductsController'
                })
            $stateProvider
                .state('new_system_setting',{
                    url: '/system_setting/new',
                    templateUrl: 'application/templates/system_settings/form.html',
                    controller: 'SystemSettingsController'
                })
            $stateProvider
                .state('show_system_setting',{
                    url: '/system_setting/:id',
                    templateUrl: 'application/templates/system_settings/show.html',
                    controller: 'SystemSettingsController'
                });
            $stateProvider
                .state('edit_system_setting',{
                    url: '/system_setting/:id/edit',
                    templateUrl: 'application/templates/system_settings/form.html',
                    controller: 'SystemSettingsController'
                })
            $stateProvider
                .state('system_settings',{
                    url: '/system_settings',
                    templateUrl: 'application/templates/system_settings/index.html',
                    controller: 'SystemSettingsController'
                })
            $stateProvider
                .state('new_client',{
                    url: '/client/new',
                    templateUrl: 'application/templates/clients/form.html',
                    controller: 'ClientsController'
                })
            $stateProvider
                .state('show_client',{
                    url: '/client/:id',
                    templateUrl: 'application/templates/clients/show.html',
                    controller: 'ClientsController'
                });
            $stateProvider
                .state('edit_client',{
                    url: '/client/:id/edit',
                    templateUrl: 'application/templates/clients/form.html',
                    controller: 'ClientsController'
                })
            $stateProvider
                .state('clients',{
                    url: '/clients',
                    templateUrl: 'application/templates/clients/index.html',
                    controller: 'ClientsController'
                })
            $stateProvider
                .state('new_team_member',{
                    url: '/team_member/new',
                    templateUrl: 'application/templates/team_members/form.html',
                    controller: 'TeamMembersController'
                })
            $stateProvider
                .state('show_team_member',{
                    url: '/team_member/:id',
                    templateUrl: 'application/templates/team_members/show.html',
                    controller: 'TeamMembersController'
                });
            $stateProvider
                .state('edit_team_member',{
                    url: '/team_member/:id/edit',
                    templateUrl: 'application/templates/team_members/form.html',
                    controller: 'TeamMembersController'
                })
            $stateProvider
                .state('team_members',{
                    url: '/team_members',
                    templateUrl: 'application/templates/team_members/index.html',
                    controller: 'TeamMembersController'
                })
            $stateProvider
                .state('new_solution_label',{
                    url: '/solution_label/new',
                    templateUrl: 'application/templates/solution_labels/form.html',
                    controller: 'SolutionLabelsController'
                })
            $stateProvider
                .state('show_solution_label',{
                    url: '/solution_label/:id',
                    templateUrl: 'application/templates/solution_labels/show.html',
                    controller: 'SolutionLabelsController'
                });
            $stateProvider
                .state('edit_solution_label',{
                    url: '/solution_label/:id/edit',
                    templateUrl: 'application/templates/solution_labels/form.html',
                    controller: 'SolutionLabelsController'
                })
            $stateProvider
                .state('solution_labels',{
                    url: '/solution_labels',
                    templateUrl: 'application/templates/solution_labels/index.html',
                    controller: 'SolutionLabelsController'
                })
            $stateProvider
                .state('new_product_label',{
                    url: '/product_label/new',
                    templateUrl: 'application/templates/product_labels/form.html',
                    controller: 'ProductLabelsController'
                })
            $stateProvider
                .state('show_product_label',{
                    url: '/product_label/:id',
                    templateUrl: 'application/templates/product_labels/show.html',
                    controller: 'ProductLabelsController'
                });
            $stateProvider
                .state('edit_product_label',{
                    url: '/product_label/:id/edit',
                    templateUrl: 'application/templates/product_labels/form.html',
                    controller: 'ProductLabelsController'
                })
            $stateProvider
                .state('product_labels',{
                    url: '/product_labels',
                    templateUrl: 'application/templates/product_labels/index.html',
                    controller: 'ProductLabelsController'
                })
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