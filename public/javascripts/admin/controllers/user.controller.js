(function() {
    angular.module('admin').controller('UserController', UserController);

    UserController.$inject = ['User', 'ConfirmationModal'];

    function UserController(User,ConfirmationModal) {
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
          ConfirmationModal.confirm({message: 'Remove user?'})
            .then(function(confirmation) {
              if (confirmation) {
                User.remove({id: user.username}, vm.loadAll);
              }
            });
        }
        
        function loadAll() {
          User.query({}, function(users) {
            vm.users = users;
          })
        }

    }
})();
