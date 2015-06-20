/**
 * Rutas de la aplicación.
 */
(function () {
    'use strict';
    angular
        .module('ng.venezuela')
        .config(routes);
    routes.$inject = ['$stateProvider','$urlRouterProvider'];
    function routes($stateProvider, $urlRouterProvider){
        $urlRouterProvider.otherwise('/');
        $stateProvider
            .state('home',{
                url : '/',
                templateUrl : 'home/home_tpl.html'
            })
    }
})();