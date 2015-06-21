/**
 * Rutas de la aplicación.
 */
(function () {
    'use strict';
    angular
        .module('ng.venezuela')
        .config(routes)
        .run(removerCache);

    // Inyectando dependencias.
    routes.$inject = ['$stateProvider','$urlRouterProvider','$locationProvider'];
    /**
     * @description gestiona las rutas de la aplicación.
     * @param $stateProvider
     * @param $urlRouterProvider
     */
    function routes($stateProvider, $urlRouterProvider, $locationProvider){
        $urlRouterProvider.otherwise('/');
        $stateProvider
            .state('home',{
                url : '/',
                templateUrl : 'home/home_tpl.html'
            });
        $locationProvider.html5Mode(true);
    }
    // Inyectando dependencias.
    removerCache.$inject = ['$rootScope', '$templateCache'];
    /**
     * @description Remueve el cache al detectar que un cambio de ruta comienza.
     * @param $rootScope
     * @param $templateCache
     */
    function removerCache ($rootScope, $templateCache) {
        $rootScope.$on('$routeChangeStart', function(event, next, current) {
            if (typeof(current) !== 'undefined'){
                $templateCache.remove(current.templateUrl);
            }
        });
    }

})();