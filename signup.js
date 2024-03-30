angular.module('signupApp', [])
    .controller('SignupController', function($scope) {
        $scope.user = {};

        $scope.submitForm = function() {
            // Perform any additional validation logic here if needed
            alert("Sign up successful.");
            window.location.href = 'index.html';
        };
    });
