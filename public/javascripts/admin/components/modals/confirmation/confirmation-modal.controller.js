(function () {
  angular.module('admin').controller('ConfirmationModalController', ConfirmationModalController);

  ConfirmationModalController.$inject = ['$uibModalInstance', 'title', 'message'];

  function ConfirmationModalController($uibModalInstance, title, message) {
    var vm = this;
    vm.message = message;
    vm.title = title;
    vm.ok = ok;
    vm.cancel = cancel;

    function ok() {
      $uibModalInstance.close(true);
    }

    function cancel() {
      $uibModalInstance.dismiss('cancel');
    }
  }
})();
