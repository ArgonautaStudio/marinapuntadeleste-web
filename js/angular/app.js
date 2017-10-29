var app = angular.module('bookingApp', ['ngRoute', 'ui.bootstrap']);

app.controller('mainCtrl', ['$scope', '$http', '$rootScope', function ($scope, $http, $rootScope) {

    /**
     * Contact Form
     */
    $scope.formInput = {};

    $scope.validarCorreo = function () {
        console.log('Validar formulario');
        console.log($scope.contactForm.$valid);
        console.log($scope.formInput);
    };
}]);