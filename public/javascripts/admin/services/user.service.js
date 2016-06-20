(function() {
    angular.module('admin')
        .factory('User', User);

    User.$inject = ['$resource'];

    function User($resource) {
        return $resource('/api/admin/user/:id');
    }
})();
