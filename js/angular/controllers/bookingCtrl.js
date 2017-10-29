app.controller('bookingCtrl', ['$scope', '$http', '$rootScope', '$location', function ($scope, $http, $rootScope, $location) {
    console.log('Booking controller');
    $scope.booking = {
        adult: 0,
        child: 0,
        infant: 0,
        Info: {},
        Extras: {
            wetsuit: 0,
            mask: 0
        },
        promo: 0,
        taxes: 0,
        total: 0
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

    function calcularTotal() {
        $scope.booking.subtotal = $scope.booking.totalTickets + $scope.booking.totalExtras - $scope.booking.promo;
        $scope.booking.total = $scope.booking.subtotal + $scope.booking.taxes;
    };

    $scope.selectTimes = function (item) {
        $scope.availableTime = true;
    };

    $scope.checkAvailability = function () {
        $http.post('app/Marina_PDE_DB/checkAvailability.php', $scope.booking).then(function (r) {
            $scope.bookingData = r.data;
        });
    };

    $scope.getExtras = function () {
        $http.get('app/Marina_PDE_DB/getExtras.php').then(function (r) {
            $scope.bookingData.extras = r.data.content;
            if (r.data.error) {
                console.error(r.data.message);
            }
        });
    };

    $scope.verificarPromoCode = function (promoCode) {
        $http.post('app/Marina_PDE_DB/checkPromoCode.php', promoCode).then(function (r) {
            $scope.booking.promo = r.data.promo;
            calcularTotal();
            if (r.data.error) {
                console.error(r.data.message);
            }

        });
    };

    $scope.checkTickets = function () {
        var totalAdulto = $scope.booking.adult * parseFloat($scope.bookingData.precios.precioAdulto);
        var totalNino = $scope.booking.child * parseFloat($scope.bookingData.precios.precioNino);
        var totalInfante = $scope.booking.infant * parseFloat($scope.bookingData.precios.precioInfante);
        $scope.booking.totalTickets = totalAdulto + totalNino + totalInfante;
    };

    $scope.checkExtras = function () {
        var totalExtra1 = $scope.booking.Extras.wetsuit * parseFloat($scope.bookingData.extras.extra1);
        var totalExtra2 = $scope.booking.Extras.mask * parseFloat($scope.bookingData.extras.extra2);
        $scope.booking.totalExtras = totalExtra1 + totalExtra2;

        $scope.bookingTabs.extras = false;
        calcularTotal();
    };

    //Watch for changes on Booking var
    function verificarTabInfo() {
        if ($scope.booking.Info.nombre && $scope.booking.Info.apellido && $scope.booking.Info.telefono && $scope.booking.Info.correo) {
            if ($scope.booking.adult + $scope.booking.child + $scope.booking.infant == 0) {
                return false;
            } else {
                if ($scope.booking.adult + $scope.booking.child + $scope.booking.infant <= $scope.bookingData.tickets) {
                    return true;
                } else {
                    return false;
                }
            }
        } else {
            return false;
        }

    };

    function verificarTerminos() {
        if ($scope.booking.aceptDockFee && $scope.booking.aceptTerms) {
            return true;
        } else {
            return false;
        }
    };

    function bookingStatus() {
        if ($scope.booking.activity && $scope.booking.date && $scope.booking.time) {
            $scope.bookingTabs.schedule = false;
        } else {
            $scope.bookingTabs.schedule = true;
        }

        if (verificarTabInfo()) {
            $scope.bookingTabs.info = false;
        } else {
            $scope.bookingTabs.info = true;
        }

        if (verificarTerminos()) {
            $scope.bookingTabs.terms = false;
        } else {
            $scope.bookingTabs.terms = true;
        }
    };

    $scope.$watch('booking', function (booking) {
        bookingStatus();
    }, true);
    $scope.$watch('booking.time', function (res) {
        switch (res) {
            case '1':
                $scope.booking.hour = $scope.booking.activity.hora1;
                break;
            case '2':
                $scope.booking.hour = $scope.booking.activity.hora2;
                break;
            case '3':
                $scope.booking.hour = $scope.booking.activity.hora3;
                break;
        };
    });

    //Jquery and JS
    $('#datepickerBooking').datepicker({
        autoclose: true
    });

    paypal.Button.render({
        funding: {
            allowed: [paypal.FUNDING.CARD]
        },
        env: 'production',
        client: {
            sandbox: 'AYDB0oHxL_sQEDiX6MzuT1D0G6HISqecF-N-Z4NmTLJlrx7YAd8QuGF9EG7UhjK62yn6-6h87tfG1Yvu',
            production: 'AWfPFDDy47qYE-E-WAeyAEOrhTo9fpJNeBozDanwHo_aTUvrqJ710iYWITmm-Y80u9-TBNApIXuBauPp'
        },
        commit: true,
        payment: function (data, actions) {
            return actions.payment.create({
                payment: {
                    transactions: [
                        {
                            amount: { total: $scope.booking.total, currency: 'USD' }
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