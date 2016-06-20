(function() {
    angular.module('admin').factory('authInterceptor', authInterceptor);
    angular.module('admin').config(configureAuthInterceptor);
    authInterceptor.$inject = ['$rootScope', '$q', '$window', '$log'];

    function authInterceptor($rootScope, $q, $window, $log) {
        return {
            request: function(config) {
                config.headers = config.headers || {};
                if ($window.sessionStorage.token) {
                    config.headers.Authorization = 'JWT ' + $window.sessionStorage.token;
                }
                return config;
            },
            response: function (response) {
              $log.info('response interceptor, status: ', response.status);
              if (response.status == 401) {
                $log.warn('Unauthorized, redirecting to login state.');
                $rootScope.$state.go('login');
              }
              return response || $q.when(response);
            },
            responseError: function (response) {
              $log.info('response error interceptor, status: ', response.status);
              if (response.status == 401) {
                $log.warn('Unauthorized, redirecting to login state.');
                $rootScope.$state.go('login');
              }
              return response || $q.when(response);
            }
        }
    }
    configureAuthInterceptor.$inject = ['$httpProvider'];
    function configureAuthInterceptor($httpProvider){
      $httpProvider.interceptors.push('authInterceptor');
      console.log('Auth interceptor set up.');
    }
})();
