var app = angular.module('bookingApp', ['ngRoute', 'ui.bootstrap']);

app.controller('mainCtrl', ['$scope', '$http', '$rootScope', function ($scope, $http, $rootScope) {

    $scope.formInput = {};
    $scope.formMessageText = '';

    function showMessage_f() {
        //Work with scope.contactForm
        $scope.formMessagetext = 'All fields are required';
        $scope.showFormMessage = true;
    };

    $scope.validarCorreo = function () {
        if ($scope.contactForm.$valid) {
            $scope.showFormMessage = false;
            $scope.formMessagetext = '';
            console.log($scope.formInput);
            $scope.formInput = {};
            alert('Must send form data...');
        } else {
            showMessage_f();
        }
    };
}]);