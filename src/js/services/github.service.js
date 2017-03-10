/**
 * Github Service
 * Servicio de comunicación con la
 * API de Github, versión 3.0
 */
(function () {
    'use strict';
    angular
        .module('github.ng.venezuela',[])
        .constant('gh',{
        BASE    : 'https://api.github.com',
        ORG     : '/orgs/ngVenezuela',
        REPOS   : '/orgs/ngVenezuela/repos',
        MEMBERS : '/orgs/ngVenezuela/members'
    })
        .factory('GitHub',githubService);

    //Inyectando Dependencias
    githubService.$inject = ['$log','$http','gh'];
    function githubService ($log, $http,gh) {
        return {
            organizacion : getOrganizacion,
            repositorios : getRepos,
            miembros     : getMembers
        };
        /**
        * @description realiza una petición a la API de Github
        * solicitando la información de ngVenezuela como
        * oganización.
        */
        function getOrganizacion () {
            var peticion = $http({
                method : 'GET',
                url : gh.BASE+gh.ORG
            });
            return peticion
                .then(function(response){
                return response.data;
            })
                .catch(function(response){
                $log.error('Error organizacion');
                return response;
            });
        }
        /**
        * @description realiza una petición a la API de Github
        * solicitando la información de los repos de ngVenezuela.
        */
        function getRepos () {
            var peticion = $http({
                method : 'GET',
                url : gh.BASE+gh.REPOS
            });
            return peticion
                .then(function(response){
                return response.data;
            })
                .catch(function(response){
                $log.error('Error organizacion');
                return response;
            });
        }
        function getMembers () {
            var peticion = $http({
                method : 'GET',
                url : gh.BASE+gh.MEMBERS
            });
            return peticion
                .then(function(response){
                return response.data;
            })
                .catch(function(response){
                $log.error('Error organizacion');
                return response;
            });
        }
    } // Fin githubService
})();
