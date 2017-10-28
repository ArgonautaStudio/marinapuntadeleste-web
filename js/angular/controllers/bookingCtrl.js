app.controller('bookingCtrl', ['$scope', '$http', '$rootScope', '$location', function ($scope, $http, $rootScope, $location) {
    console.log('Booking controller');
    $scope.booking = {
        adult: 0,
        child: 0,
        infant: 0,
        Info: {},
        Extras: {}
    };
    $scope.availableTime = false;
    $scope.bookingTabs = {
        schedule: true,
        info: true,
        terms: true,
        extras: true,
        checkout: true
    }
    /**
     * Recursos
    */

    function getResources() {
        $http.post('app/Marina_PDE_DB/getTours.php', true).then(function (r) {
            $scope.toursList = r.data.data;
            if (r.data.error) {
                console.info(r.data.message);
            }
        });

    };

    $scope.selectTimes = function (item) {
        $scope.availableTime = true;
    };

    $scope.checkAvailability = function () {
        console.log($scope.booking);
        $http.post('app/Marina_PDE_DB/checkAvailability.php', $scope.booking).then(function (r) {
            $scope.bookingData = r.data;
            console.log($scope.bookingData);
        });
    };


    //Watch for changes on Booking var
    function verificarTabInfo() {
        if ($scope.booking.Info.nombre && $scope.booking.Info.apellido && $scope.booking.Info.telefono && $scope.booking.Info.correo) {
            return true;
        } else {
            return false;
        }
    };

    function bookingStatus() {
        if ($scope.booking.activity && $scope.booking.date && $scope.booking.time) {
            $scope.bookingTabs.schedule = false;
        }

        if (verificarTabInfo()) {
            $scope.bookingTabs.info = false;
        }
    };

    $scope.$watch('booking', function (booking) {
        console.log('Watcher booking active');
        bookingStatus();
    }, true);

    //Jquery and JS
    $('#datepickerBooking').datepicker({
        autoclose: true
    });

    paypal.Button.render({
        funding: {
            allowed: [ paypal.FUNDING.CARD ]
        },
        env: 'sandbox',
        client: {
            sandbox: 'AYDB0oHxL_sQEDiX6MzuT1D0G6HISqecF-N-Z4NmTLJlrx7YAd8QuGF9EG7UhjK62yn6-6h87tfG1Yvu',
            production: 'AYDB0oHxL_sQEDiX6MzuT1D0G6HISqecF-N-Z4NmTLJlrx7YAd8QuGF9EG7UhjK62yn6-6h87tfG1Yvu'
        },
        commit: true,
        payment: function (data, actions) {
            return actions.payment.create({
                payment: {
                    transactions: [
                        {
                            amount: { total: '1.00', currency: 'USD' }
                        }
                    ]
                }
            });
        },
        onAuthorize: function (data, actions) {
            return actions.payment.execute().then(function (payment) {
                console.log(payment);
            });
        }
    }, '#paypal-button');


    if ($location.path() == '/booking') {
        // $scope.booking.schedule.disabled = false;
        getResources();
    }
}]);