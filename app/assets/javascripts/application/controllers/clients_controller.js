(function () {

    "use strict";

    angular.module('TypographySiteApp')
        .controller('ClientsController', ['$scope', '$state', 'ngDialog', '$stateParams', '$timeout', '$sce', 'SweetAlert', 'ClientsFactory', 'CountryFlagsFactory',
            function ($scope, $state, ngDialog, $stateParams, $timeout, $sce, SweetAlert, clients, flags) {
                $scope.I18n = I18n;
                $scope._ = _;
                $scope.$state = $state;

                $scope.getHtml = function(html){
                    return $sce.trustAsHtml(html);
                };


                $scope.filters = {};

                if($state.current.name == 'clients'){
                    $scope.client = [];

                    var timer = false;
                    $scope.$watch('filters', function(){
                        if(timer){
                            $timeout.cancel(timer)
                        }
                        timer= $timeout(function(){
                            $scope.retrieveClients();
                        }, 500)
                    }, true);

                    $scope.page = 1;
                    $scope.retrieveClients = function(){
                        clients.all({page: $scope.page, query: $scope.filters}).success(function (data) {
                            $scope.clients = data.clients;
                            $scope.count = data.count;

                            var pagination = $('#clients-pagination');
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
                                        $scope.retrieveClients();
                                    }
                                })
                            }
                        }).error(function (data) {

                        });
                    };

                    $scope.retrieveClients();
                }

                $scope.destroy = function(id){
                    var scope = $scope;
                    SweetAlert.swal({
                            title: "Are you sure?",
                            text: "Your will not be able to recover this client!",
                            type: "warning",
                            showCancelButton: true,
                            confirmButtonColor: "#DD6B55",confirmButtonText: "Yes, delete it!",
                            cancelButtonText: "No, cancel plx!",
                            closeOnConfirm: true,
                            closeOnCancel: true,
                            allowOutsideClick: true },
                        function(isConfirm){
                            if (isConfirm) {
                                clients.destroy(id).success(function(){
                                    $scope.retrieveClients();
                                });
                            } else {

                            }
                        }
                    );
                };

                if($state.current.name == 'new_client' || $state.current.name == 'edit_client'){

                    $scope.client = {};


                    if($state.current.name == 'edit_client'){
                        clients.show($stateParams.id)
                            .success(function(data){
                                $timeout(function(){
                                    $scope.client = data.client;
                                }, 0);
                            }
                        )
                    }

                    $scope.submitClient = function(){
                        $scope.submitted = true;
                        if($scope.ClientForm.$invalid ){
                            return false;
                        }

                        $scope.formPending = true;
                        clients.upsert($scope.client)
                            .success(function(){
                                $scope.formPending = false;
                                $state.go('clients')
                            })
                            .error(function(data){
                                $scope.validation_errors = data.errors;
                                $scope.formPending = false;
                            })
                    };
                }

                if($state.current.name == 'show_client'){
                    clients.show($stateParams.id).success(function(data){
                        $scope.client = data.client;

                    });
                }
            }])

}());