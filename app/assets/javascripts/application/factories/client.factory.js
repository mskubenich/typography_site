(function () {
    'use strict';
    angular.module('TypographySiteApp').factory('ClientsFactory', ['AuthHttp', function($http){
        return {

            upsert: function(client){
                var fd = new FormData();


                fd.append('client[logo][file]', client.logo.file );
                if(client.logo.id != undefined){
                    fd.append('client[logo][id]', client.logo.id );
                    fd.append('client[logo][removed]', !!client.logo.removed );
                }
                if(client.title){
                    fd.append('client[title]', client.title );
                }

                if(client.id){
                    return $http.put('/clients/' + client.id, fd, {
                        transformRequest: angular.identity,
                        headers: {'Content-Type': undefined}
                    });
                }else{
                    return $http.post('/clients', fd, {
                        transformRequest: angular.identity,
                        headers: {'Content-Type': undefined}
                    });
                }
            },

            all: function(options){
                return $http.get('/clients.json?page=' + options.page);
            },

            show: function(id){
                return $http.get('/clients/' + id + '.json');
            },

            destroy: function(id){
                return $http.delete('/clients/' + id)
            }
        }
    }])
}());