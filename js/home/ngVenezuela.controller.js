/**
 * Controladores de la aplicación.
 */

(function (){

    'use strict';
    angular
        .module('ng.venezuela')
        .controller('HomeController', Organizacion)
        .controller('RepoController', Repositorios)
        .controller('QuienesSomosController',QuienesSomos);
    Organizacion.$inject = ['GitHub'];
    function Organizacion(GitHub) {
        var vm = this;
        vm.organizacion = {};
        execute();
        function execute(){
            return ObtenerInformacion();
        }
        function ObtenerInformacion() {
            return GitHub.organizacion()
                .then(function(data) {
                vm.organizacion = data;
                return vm.organizacion;
                console.log(data);
            });
        }
    }
    function Repositorios(GitHub) {
        var vm = this;
        vm.repositorios = {};
        execute();
        function execute(){
            return ObtenerRepos ();
        }
        function ObtenerRepos (){
            return GitHub.repositorios()
                .then(function(data){
                vm.repositorios = data;
                return vm.repositorios;
                console.log(data);
            });
        }
    }
    function QuienesSomos(){

    }

})(); // fin main function
