var app = angular.module('bookingApp', ['ngRoute', 'ui.bootstrap']);

app.controller('mainCtrl', ['$scope', '$http', '$rootScope', function ($scope, $http, $rootScope) {

    $scope.formInput = {};
    $scope.formMessageText = '';

    function showMessage_f() {
        //Work with scope.contactForm
        $scope.formMessageType = false;
        $scope.formMessagetext = 'All fields are required';
        $scope.showFormMessage = true;
    };

    $scope.validarCorreo = function () {
        if ($scope.contactForm.$valid) {
            $scope.showFormMessage = false;
            $scope.formMessagetext = '';
            console.log($scope.formInput);

            $http.post('app/mailing/sendMail.php', $scope.formInput).then(function (r) {
                $scope.formMessageType = true;
                $scope.formMessagetext = r.data.message;
                $scope.showFormMessage = true;
                if (!r.data.error) {
                    $scope.formInput = {};
                }
            });
        } else {
            showMessage_f();
        }
    };
}]);