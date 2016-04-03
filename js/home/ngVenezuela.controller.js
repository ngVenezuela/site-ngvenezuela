/**
 * Controladores de la aplicación.
 */
/*jslint browser: true*/
/*global $, angular, Organizacion, Repositorios,
QuienesSomos, execute, ObtenerInformacion, ObtenerRepos*/
(function () {
    'use strict';
    angular
        .module('ng.venezuela')
        .controller('HomeController', Organizacion)
        .controller('RepoController', Repositorios)
        .controller('QuienesSomosController', QuienesSomos);
    Organizacion.$inject = ['GitHub'];
    function Organizacion(GitHub) {
        var vm = this;
        vm.organizacion = {};
        execute();
        function execute() {
            return new ObtenerInformacion();
        }
        function ObtenerInformacion() {
            return GitHub.organizacion()
                .then(function (data) {
                vm.organizacion = data;
                console.log(data);
                return vm.organizacion;
            });
        }
    }
    function Repositorios(GitHub) {
        var vm = this;
        vm.repositorios = {};
        execute();
        function execute() {
            return new ObtenerRepos();
        }
        function ObtenerRepos() {
            return GitHub.repositorios()
                .then(function (data) {
                vm.repositorios = data;
                console.log(data);
                return vm.repositorios;
            });
        }

    }
    function QuienesSomos() {

    }

})(); // fin main function
