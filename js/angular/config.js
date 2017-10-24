app.config(function ($routeProvider, $locationProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'templates/home.html',
            controller: 'mainCtrl'
        })
        .when('/booking', {
            templateUrl: 'templates/booking.html',
            controller: 'bookingCtrl'
        })
        .otherwise({
            redirectTo: '/'
        });
});