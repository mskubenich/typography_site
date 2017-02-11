(function () {

    "use strict";

    angular.module('TypographySiteApp')
        .controller('SystemSettingsController', ['$scope', '$state', 'ngDialog', '$stateParams', '$timeout', '$sce', 'SweetAlert', 'SystemSettingsFactory', 'CountryFlagsFactory',
            function ($scope, $state, ngDialog, $stateParams, $timeout, $sce, SweetAlert, system_settings, flags) {
                $scope.I18n = I18n;
                $scope._ = _;
                $scope.$state = $state;

                $scope.getHtml = function(html){
                    return $sce.trustAsHtml(html);
                };


                $scope.filters = {};

                if($state.current.name == 'system_settings'){
                    $scope.system_setting = [];

                    var timer = false;
                    $scope.$watch('filters', function(){
                        if(timer){
                            $timeout.cancel(timer)
                        }
                        timer= $timeout(function(){
                            $scope.retrieveSystemSettings();
                        }, 500)
                    }, true);

                    $scope.page = 1;
                    $scope.retrieveSystemSettings = function(){
                        system_settings.all({page: $scope.page, query: $scope.filters}).success(function (data) {
                            $scope.system_settings = data.system_settings;
                            $scope.count = data.count;

                            var pagination = $('#system_settings-pagination');
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
                                        $scope.retrieveSystemSettings();
                                    }
                                })
                            }
                        }).error(function (data) {

                        });
                    };

                    $scope.retrieveSystemSettings();
                }

                $scope.destroy = function(id){
                    var scope = $scope;
                    SweetAlert.swal({
                            title: "Are you sure?",
                            text: "Your will not be able to recover this system_setting!",
                            type: "warning",
                            showCancelButton: true,
                            confirmButtonColor: "#DD6B55",confirmButtonText: "Yes, delete it!",
                            cancelButtonText: "No, cancel plx!",
                            closeOnConfirm: true,
                            closeOnCancel: true,
                            allowOutsideClick: true },
                        function(isConfirm){
                            if (isConfirm) {
                                system_settings.destroy(id).success(function(){
                                    $scope.retrieveSystemSettings();
                                });
                            } else {

                            }
                        }
                    );
                };

                if($state.current.name == 'new_system_setting' || $state.current.name == 'edit_system_setting'){

                    $scope.system_setting = {};


                    if($state.current.name == 'edit_system_setting'){
                        system_settings.show($stateParams.id)
                            .success(function(data){
                                $timeout(function(){
                                    $scope.system_setting = data.system_setting;
                                }, 0);
                            }
                        )
                    }

                    $scope.submitSystemSetting = function(){
                        $scope.submitted = true;
                        if($scope.SystemSettingForm.$invalid ){
                            return false;
                        }

                        $scope.formPending = true;
                        system_settings.upsert($scope.system_setting)
                            .success(function(){
                                $scope.formPending = false;
                                $state.go('system_settings')
                            })
                            .error(function(data){
                                $scope.validation_errors = data.errors;
                                $scope.formPending = false;
                            })
                    };
                }

                if($state.current.name == 'show_system_setting'){
                    system_settings.show($stateParams.id).success(function(data){
                        $scope.system_setting = data.system_setting;

                    });
                }
            }])

}());