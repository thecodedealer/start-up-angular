'use strict';

angular.module('startupApp', ['ui.router', 'ngResource', 'ngCookies'])
    /*.run(function ($rootScope) {

        $rootScope
            .$on('$stateChangeSuccess',
                function (event, toState, toParams, fromState, fromParams) {
                    $(".loader").addClass("hidden");
                });
    })*/

    .config(function ($stateProvider, $urlRouterProvider, $locationProvider) {

        $stateProvider

            .state('index', {
                url: '/',
                views: {
                    'header': {
                        templateUrl: 'views/header.html'
                    },
                    'content': {
                        templateUrl: 'views/home.html',
                        controller: 'IndexController'
                    },
                    'footer': {
                        templateUrl: 'views/footer.html'
                    }
                }
               /* resolve: {
                    products: function (productsFactory) {
                        return productsFactory.query()
                            .$promise.then(
                                function (response) {//success

                                    return response;
                                    // console.log('Highlights: ' + $scope.highlights);

                                },
                                function (response) { // error

                                    // $scope.message = "Error: "+response.status + " " + response.statusText;
                                }
                            );

                    },

                    highlights: function (highlightsFactory) {
                        return highlightsFactory.query()
                            .$promise.then(
                                function (response) {//success
                                    return response;

                                },
                                function (response) { // error
                                    // $scope.message = "Error: "+response.status + " " + response.statusText;
                                }
                            );
                    },

                    mainGallery: function (galleryFactory) {
                        return galleryFactory.query()
                            .$promise.then(
                                function (response) {//success
                                    return response;

                                },
                                function (response) { // error
                                    // $scope.message = "Error: "+response.status + " " + response.statusText;
                                }
                            );
                    }


                }*/
            })

        ;

        $urlRouterProvider.otherwise('/');
    })


;