(function() {
    angular.module('admin').controller('MenuController', MenuController);

    MenuController.$inject = ['$rootScope', '$window'];

    function MenuController($rootScope, $window) {
        var vm = this;

        vm.logout = logout;

        function logout() {
          delete $window.sessionStorage.token;
          $rootScope.$state.go('login');
        }

    }
})();
