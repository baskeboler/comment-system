(function() {
    angular.module('admin')
        .factory('Auth', Auth);

    Auth.$inject = ['$http', '$q'];

    function Auth($http, $q) {
        return {
            login: login
        };

        function login(user) {
            var deferred = $q.defer();
            $http.post('/admin/login', user)
                .then(
                    function(res) {
                        var status = res.status;
                        if (status == 200) {
                            deferred.resolve(res.data.token);
                        } else {
                            deferred.reject(res.data.message);
                        }
                    },
                    function(res) {
                        deferred.reject(res.data.message || '');
                    }
                );
            return deferred.promise;
        }
    }
})();
