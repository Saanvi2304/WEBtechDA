angular.module('loginApp', [])
    .controller('LoginController', function($scope, $window) {
        $scope.user = {};

        $scope.submitForm = function() {
            // Perform validation
            if (!$scope.loginForm.$valid) {
                return;
            }

            // Redirect to home page
            alert("Login successful.");
            $window.location.href = 'home.html';
        };
    });
