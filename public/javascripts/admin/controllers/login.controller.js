(function() {
    angular.module('admin').controller('LoginController', LoginController);

    LoginController.$inject = ['Auth', '$window', '$log', '$state'];

    function LoginController(Auth, $window, $log, $state) {
        var vm = this;
        vm.user = {};
        vm.login = login;

        function login() {
          Auth.login(vm.user).then(
            function (token) {
              $log.info('Got token. Saving.');
              $window.sessionStorage.token = token;
              $state.go('app.dashboard');
            }
          );
        }
    }
})();
