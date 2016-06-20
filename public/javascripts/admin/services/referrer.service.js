(function() {
    angular.module('admin')
        .factory('Referrer', Referrer);

    Referrer.$inject = ['$resource'];

    function Referrer($resource) {
        return $resource('/api/admin/referrer/:id');
    }
})();
