(function () {
    'use strict';
    angular.module('TypographySiteApp').factory('ProductsFactory', ['AuthHttp', function($http){
        return {

            upsert: function(product){
                var fd = new FormData();


                fd.append('product[image][file]', product.image.file );
                if(product.image.id != undefined){
                    fd.append('product[image][id]', product.image.id );
                    fd.append('product[image][removed]', !!product.image.removed );
                }
                for(var i in product.images){
                    fd.append('product[images][][file]', product.images[i].file );
                    if(product.images[i].id != undefined){
                        fd.append('product[images][][id]', product.images[i].id );
                        fd.append('product[images][][removed]', !!product.images[i].removed );
                    }
                }
                if(product.title){
                    fd.append('product[title]', product.title );
                }
                if(product.text){
                    fd.append('product[text]', product.text );
                }

                fd.append('product[offset_printing_price][file]', product.offset_printing_price.file );
                if(product.offset_printing_price.id != undefined){
                    fd.append('product[offset_printing_price][id]', product.offset_printing_price.id );
                    fd.append('product[offset_printing_price][removed]', !!product.offset_printing_price.removed );
                }

                fd.append('product[digital_printing_price][file]', product.digital_printing_price.file );
                if(product.digital_printing_price.id != undefined){
                    fd.append('product[digital_printing_price][id]', product.digital_printing_price.id );
                    fd.append('product[digital_printing_price][removed]', !!product.digital_printing_price.removed );
                }

                if(product.id){
                    return $http.put('/products/' + product.id, fd, {
                        transformRequest: angular.identity,
                        headers: {'Content-Type': undefined}
                    });
                }else{
                    return $http.post('/products', fd, {
                        transformRequest: angular.identity,
                        headers: {'Content-Type': undefined}
                    });
                }
            },

            all: function(options){
                return $http.get('/products.json?page=' + options.page);
            },

            show: function(id){
                return $http.get('/products/' + id + '.json');
            },

            destroy: function(id){
                return $http.delete('/products/' + id)
            }
        }
    }])
}());