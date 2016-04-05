/**
 * Rutas de la aplicación.
 */
/*jslint browser: true*/
/*global $, angular, routes, removerCache*/
(function () {
    'use strict';
    angular
        .module('ng.venezuela')
        .config(routes)
        .run(removerCache);

    // Inyectando dependencias.
    routes.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider'];
    /**
     * @description gestiona las rutas de la aplicación.
     * @param $stateProvider
     * @param $urlRouterProvider
     */
    function routes($stateProvider, $urlRouterProvider, $locationProvider) {
        $urlRouterProvider.otherwise('/');
        $stateProvider
            .state('home', {
            url : '/',
            controller: 'HomeController',
            controllerAs : 'ctrl',
            templateUrl : './templates/home/home_tpl.html'
        })
            .state('quienes', {
            url: '/quienes-somos/',
            controller: 'QuienesSomosController',
            controllerAs: 'ctrl',
            templateUrl: './templates/quienes/quienes_tpl.html'
        })
            .state('repos', {
            url: '/repos/',
            controller: 'RepoController',
            controllerAs: 'ctrl',
            templateUrl: './templates/repos/repos_tpl.html'
        })
            .state('unirme', {
            url: '/quiero-unirme/',
/*            controller: 'QuienesSomosController',
            controllerAs: 'ctrl',*/
            templateUrl: './templates/unirme/unirme_tpl.html'
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
    function removerCache($rootScope, $templateCache) {
        $rootScope.$on('$routeChangeStart', function (event, next, current) {
            if (typeof (current) !== 'undefined') {
                $templateCache.remove(current.templateUrl);
            }
        });
    }

})();
