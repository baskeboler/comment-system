(function() {
    'use strict';
    angular.module('admin', [
            'ngResource',
            'ui.router',
            'ui.bootstrap',
            'ngAnimate'
            // 'foundation'
            // Foundation UI components
            // 'foundation'
            // Routing with front matter
            // 'foundation.dynamicRouting',
            // Transitioning between views
            // 'foundation.dynamicRouting.animations'
        ])
        .config(configureStates)
        .run(run);

    configureStates.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider'];

    function configureStates($stateProvider, $urlRouterProvider, $locationProvider) {
        $urlRouterProvider.otherwise('/dashboard');
        // Use this to enable HTML5 mode
        $locationProvider.html5Mode({
            enabled: false,
            requireBase: false
        });
        // Use this to set the prefix for hash-bangs
        // Example: example.com/#!/page
        $locationProvider.hashPrefix('!');
        $stateProvider
            .state('app', {
                abstract: true,
                views: {
                    'menuView@': {
                        templateUrl: '/partials/admin/menu.html',
                        controller: 'MenuController',
                        controllerAs: 'vm'
                    }
                }
            })
            .state('login', {
              url: '/login',
              views: {
                'menuView@': {
                  template: ''
                },
                'contentView@': {
                  templateUrl: '/partials/admin/login.html',
                  controller: 'LoginController',
                  controllerAs: 'vm'
                }
              }
            })
            .state('app.dashboard', {
                url: '/dashboard',
                abstract: false,
                parent: 'app',
                views: {
                    'contentView@': {
                        templateUrl: '/partials/admin/dashboard.html',
                        controller: 'DashboardController',
                        controllerAs: 'vm'
                    }
                }
            })
            .state('app.referrers', {
                url: '/referrer',
                views: {
                    'contentView@': {
                        templateUrl: '/partials/admin/referrers/referrers.html',
                        controller: 'ReferrerController',
                        controllerAs: 'vm'
                    }
                }
            })
            .state('app.users', {
                url: '/user',
                views: {
                    'contentView@': {
                        templateUrl: '/partials/admin/users/users.html',
                        controller: 'UserController',
                        controllerAs: 'vm'
                    }
                }
            })
    }
    run.$inject = ['$log','$rootScope', '$state', '$stateParams'];
    function run($log, $rootScope, $state, $stateParams) {
        // Enable FastClick to remove the 300ms click delay on touch devices
        // FastClick.attach(document.body);
        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;
        $log.info('Starting up admin dashboard app.');
    }
})();
