(function() {
    angular.module('admin').controller('DashboardController', DashboardController);

    DashboardController.$inject = ['User', 'Referrer'];

    function DashboardController(User, Referrer) {
        var vm = this;
        vm.users = [];
        vm.referrers = [];
        vm.loadAll = loadAll;

        activate();
        function activate(){
          vm.loadAll();
        }
        function loadAll(){
          User.query({}, function(users) {
            vm.users = users;
          });
          Referrer.query({}, function(referrers) {
            vm.referrers = referrers;
          });
        }

    }
})();
