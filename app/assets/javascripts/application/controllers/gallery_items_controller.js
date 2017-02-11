(function () {

    "use strict";

    angular.module('TypographySiteApp')
        .controller('GalleryItemsController', ['$scope', '$state', 'ngDialog', '$stateParams', '$timeout', '$sce', 'SweetAlert', 'GalleryItemsFactory', 'CountryFlagsFactory',
            function ($scope, $state, ngDialog, $stateParams, $timeout, $sce, SweetAlert, gallery_items, flags) {
                $scope.I18n = I18n;
                $scope._ = _;
                $scope.$state = $state;

                $scope.getHtml = function(html){
                    return $sce.trustAsHtml(html);
                };


                $scope.filters = {};

                if($state.current.name == 'gallery_items'){
                    $scope.gallery_item = [];

                    var timer = false;
                    $scope.$watch('filters', function(){
                        if(timer){
                            $timeout.cancel(timer)
                        }
                        timer= $timeout(function(){
                            $scope.retrieveGalleryItems();
                        }, 500)
                    }, true);

                    $scope.page = 1;
                    $scope.retrieveGalleryItems = function(){
                        gallery_items.all({page: $scope.page, query: $scope.filters}).success(function (data) {
                            $scope.gallery_items = data.gallery_items;
                            $scope.count = data.count;

                            var pagination = $('#gallery_items-pagination');
                            pagination.empty();
                            pagination.removeData('twbs-pagination');
                            pagination.unbind('page');

                            if($scope.count > 0){
                                pagination.twbsPagination({
                                    totalPages: Math.ceil($scope.count / 9),
                                    startPage: $scope.page,
                                    visiblePages: 9,
                                    onPageClick: function (event, page) {
                                        $scope.page = page;
                                        $scope.retrieveGalleryItems();
                                    }
                                })
                            }
                        }).error(function (data) {

                        });
                    };

                    $scope.retrieveGalleryItems();
                }

                $scope.destroy = function(id){
                    var scope = $scope;
                    SweetAlert.swal({
                            title: "Are you sure?",
                            text: "Your will not be able to recover this gallery_item!",
                            type: "warning",
                            showCancelButton: true,
                            confirmButtonColor: "#DD6B55",confirmButtonText: "Yes, delete it!",
                            cancelButtonText: "No, cancel plx!",
                            closeOnConfirm: true,
                            closeOnCancel: true,
                            allowOutsideClick: true },
                        function(isConfirm){
                            if (isConfirm) {
                                gallery_items.destroy(id).success(function(){
                                    $scope.retrieveGalleryItems();
                                });
                            } else {

                            }
                        }
                    );
                };

                if($state.current.name == 'new_gallery_item' || $state.current.name == 'edit_gallery_item'){

                    $scope.gallery_item = {};


                    if($state.current.name == 'edit_gallery_item'){
                        gallery_items.show($stateParams.id)
                            .success(function(data){
                                $timeout(function(){
                                    $scope.gallery_item = data.gallery_item;
                                }, 0);
                            }
                        )
                    }

                    $scope.submitGalleryItem = function(){
                        $scope.submitted = true;
                        if($scope.GalleryItemForm.$invalid ){
                            return false;
                        }

                        $scope.formPending = true;
                        gallery_items.upsert($scope.gallery_item)
                            .success(function(){
                                $scope.formPending = false;
                                $state.go('gallery_items')
                            })
                            .error(function(data){
                                $scope.validation_errors = data.errors;
                                $scope.formPending = false;
                            })
                    };
                }

                if($state.current.name == 'show_gallery_item'){
                    gallery_items.show($stateParams.id).success(function(data){
                        $scope.gallery_item = data.gallery_item;

                    });
                }
            }])

}());