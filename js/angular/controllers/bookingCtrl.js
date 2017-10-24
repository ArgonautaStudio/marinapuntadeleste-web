app.controller('bookingCtrl', ['$scope', '$http', '$rootScope', '$location', function ($scope, $http, $rootScope, $location) {
    console.log('Booking controller');
    $scope.availableTime = false;
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
            console.log(r);
        });
    };
    //Jquery
    $('#datepickerBooking').datepicker({
        autoclose: true
    });

    if ($location.path() == '/booking') {
        getResources();
    }
}]);