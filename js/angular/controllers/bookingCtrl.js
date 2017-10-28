app.controller('bookingCtrl', ['$scope', '$http', '$rootScope', '$location', function ($scope, $http, $rootScope, $location) {
    console.log('Booking controller');
    $scope.booking = {
        adult: 0,
        child: 0,
        infant: 0,
        Info: {}
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

    //Jquery
    $('#datepickerBooking').datepicker({
        autoclose: true
    });

    if ($location.path() == '/booking') {
        // $scope.booking.schedule.disabled = false;
        getResources();
    }
}]);