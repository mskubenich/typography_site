#= require jquery
#= require jquery_ujs
#= require bootstrap
#= require bootstrap-sprockets
#= require angular/angular
#= require angular-rails-templates
#= require angular-ui-bootstrap/dist/ui-bootstrap
#= require angular-ui-bootstrap/dist/ui-bootstrap-tpls
#= require angular-animate/angular-animate
#= require sweetalert/lib/sweet-alert
#= require angular-sweetalert/SweetAlert
#= require angular-ui-router
#= require ng-dialog/js/ngDialog
#= require angular-input-match
#= require angular-email-available
#= require angular-file-input
#= require angular-redactor.directive
#= require angular-images.directive
#= require angular-image.directive
#= require toastr
#= require underscore
#= require i18n
#= require i18n/translations
#= require_tree ../../../vendor/assets/javascripts/redactor
#= require twbs-pagination.js
#= require metisMenu/jquery.metisMenu.js
#= require pace/pace.min.js
#= require peity/jquery.peity.min.js
#= require slimscroll/jquery.slimscroll.min.js
#= require inspinia.js
#= require wow
#= require scrollspy
#= require icheck
#= require spin
#= require ladda
#= require angular-ladda
#= require angular-auth-http.service
# load angular modules
#= require ./landing/application.module.js
#= require ./application/application.module.js
#= require_tree ./application/factories
#= require_tree ./application/controllers
#= require_tree ./application/templates
#= require_tree .

$(document).ready ->
  $('#side-menu').slimScroll
    height: '100%'