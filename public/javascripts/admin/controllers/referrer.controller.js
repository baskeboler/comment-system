(function() {
    angular.module('admin').controller('ReferrerController', ReferrerController);

    ReferrerController.$inject = ['Referrer'];

    function ReferrerController(Referrer) {
        var vm = this;
        vm.users = [];
        vm.loadAll = loadAll;
        vm.save=save;
        vm.remove=remove;
        activate();

        function activate(){
          vm.loadAll();
        }
        function save() {
          Referrer.save(vm.user, vm.loadAll);
        }

        function remove(user) {
          Referrer.remove({id: user.username}, vm.loadAll);
        }
        function loadAll() {
          Referrer.query({}, function(users) {
            vm.users = users;
          })
        }

    }
})();
