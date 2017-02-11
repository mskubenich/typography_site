(function () {
    'use strict';
    angular.module('TypographySiteApp').factory('SystemSettingsFactory', ['AuthHttp', function($http){
        return {

            upsert: function(system_setting){
                var fd = new FormData();

                if(system_setting.address){
                    fd.append('system_setting[address]', system_setting.address );
                }
                if(system_setting.phone_number){
                    fd.append('system_setting[phone_number]', system_setting.phone_number );
                }
                if(system_setting.site){
                    fd.append('system_setting[site]', system_setting.site );
                }
                if(system_setting.email){
                    fd.append('system_setting[email]', system_setting.email );
                }

                if(system_setting.id){
                    return $http.put('/system_settings/' + system_setting.id, fd, {
                        transformRequest: angular.identity,
                        headers: {'Content-Type': undefined}
                    });
                }else{
                    return $http.post('/system_settings', fd, {
                        transformRequest: angular.identity,
                        headers: {'Content-Type': undefined}
                    });
                }
            },

            all: function(options){
                return $http.get('/system_settings.json?page=' + options.page);
            },

            show: function(id){
                return $http.get('/system_settings/' + id + '.json');
            },

            destroy: function(id){
                return $http.delete('/system_settings/' + id)
            }
        }
    }])
}());