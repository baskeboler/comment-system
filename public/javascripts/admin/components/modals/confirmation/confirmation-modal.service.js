(function(){
  angular.module('admin').factory('ConfirmationModal', ConfirmationModal);

  ConfirmationModal.$inject = [ '$uibModal', '$q'];
  function ConfirmationModal($uibModal, $q) {
    return {
      confirm: confirm
    };

    function confirm(opts) {
      var deferred = $q.defer();
      $uibModal.open({
        templateUrl: '/partials/admin/common/modals/confirmation-modal.html',
        controller: 'ConfirmationModalController',
        controllerAs: 'vm',
        bindToController: true,
        animate: false,
        resolve: {
          title: function(){
            return opts.title || 'Confirmation';
          },
          message: function(){
            return opts.message || 'Are you sure?';
          }
        }
      }).result.then(function(res) {
        deferred.resolve(true);
      }, function(reason) {
        deferred.resolve(false);
      });

      return deferred.promise;
    }
  }
})();
