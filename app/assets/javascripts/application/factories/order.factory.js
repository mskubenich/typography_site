(function () {
    'use strict';
    angular.module('TypographySiteApp').factory('OrdersFactory', ['AuthHttp', function($http){
        return {

            upsert: function(order){
                var fd = new FormData();

                if(order.name){
                    fd.append('order[name]', order.name );
                }
                if(order.phone_number){
                    fd.append('order[phone_number]', order.phone_number );
                }
                if(order.email){
                    fd.append('order[email]', order.email );
                }
                if(order.what_are_you_interested_in){
                    fd.append('order[what_are_you_interested_in]', order.what_are_you_interested_in );
                }
                if(order.comment){
                    fd.append('order[comment]', order.comment );
                }

                if(order.id){
                    return $http.put('/orders/' + order.id, fd, {
                        transformRequest: angular.identity,
                        headers: {'Content-Type': undefined}
                    });
                }else{
                    return $http.post('/orders', fd, {
                        transformRequest: angular.identity,
                        headers: {'Content-Type': undefined}
                    });
                }
            },

            all: function(options){
                return $http.get('/orders.json?page=' + options.page);
            },

            show: function(id){
                return $http.get('/orders/' + id + '.json');
            },

            destroy: function(id){
                return $http.delete('/orders/' + id)
            }
        }
    }])
}());