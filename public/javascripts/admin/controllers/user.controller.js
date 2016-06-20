(function() {
    angular.module('admin').controller('UserController', UserController);

    UserController.$inject = ['User'];

    function UserController(User) {
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
          User.save(vm.user, vm.loadAll);
        }

        function remove(user) {
          User.remove({id: user.username}, vm.loadAll);
        }
        function loadAll() {
          User.query({}, function(users) {
            vm.users = users;
          })
        }

    }
})();
