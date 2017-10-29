app.config(function ($routeProvider, $locationProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'templates/home.html',
            controller: 'mainCtrl'
        })
        .when('/activities', {
            templateUrl: 'templates/tours.html'
        })
        .when('/activities/jungleTour', {
            templateUrl: 'templates/jungle.html'
        })
        .when('/activities/scubaDive', {
            templateUrl: 'templates/scuba-dive.html'
        })
        .when('/activities/mangroveTour', {
            templateUrl: 'templates/mangrove.html'
        })
        .when('/booking', {
            templateUrl: 'templates/booking.html',
            controller: 'bookingCtrl'
        })
        .when('/discounts', {
            templateUrl: 'templates/discounts.html'
        })
        .otherwise({
            redirectTo: '/'
        });
});