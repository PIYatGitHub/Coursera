/**
 * Created by FM2A on 21.6.2017 г..
 */

var app = angular.module("confusionApp");
app.controller("MenuController", ["$scope", "menuFactory", function ($scope, menuFactory) {
    // we just created an empty controller
    'use strict';
    $scope.showDetails = false;
    $scope.filtText = '';
    $scope.showMenu = false;
    $scope.message = "Loading ...";

    menuFactory.getDishes().query(
        function(response) {
            $scope.dishes = response;
            $scope.showMenu = true;
        },
        function(response) {
            $scope.message = "Error: "+response.status + " " + response.statusText;
        });

    $scope.tab=1;
    $scope.select = function(setTab) {
        $scope.tab = setTab;
        if (setTab === 2)
        {$scope.filtText = "appetizer";}else if (setTab === 3)
        {$scope.filtText = "mains";} else if (setTab === 4)
        {$scope.filtText = "dessert";}else
        {$scope.filtText = "";}

    };
    $scope.isSelected = function (checkTab) {
        return ($scope.tab === checkTab);
    };
    $scope.toggleDetails = function() {
        $scope.showDetails = !$scope.showDetails;
    };

}])
    .controller('ContactController', ['$scope', function($scope) {
    'use strict';
    $scope.feedback = {mychannel:"", firstName:"", lastName:"", agree:false, email:"" };
    var channels = [{value:"tel", label:"Tel."}, {value:"Email",label:"Email"}];
    $scope.channels = channels;
    $scope.invalidChannelSelection = false;
}])
    .controller('FeedbackController', ['$scope','saveFeedback', function($scope, saveFeedback) {
    'use strict';
    $scope.feedback = {mychannel:"", firstName:"", lastName:"", agree:false, email:"", areacode: "", tel:"", feedback:"" };
    $scope.channels = [{value:"tel", label:"Tel."}, {value:"Email",label:"Email"}];
    $scope.invalidChannelSelection = false;
        $scope.saveThis = function () {
            saveFeedback.saveComment().save($scope.feedback);
        };


}])
    .controller('DishDetailController', ['$scope','$stateParams', "menuFactory", function($scope, $stateParams,menuFactory) {
    'use strict';
    var searchBy="";
        $scope.showDish = false;
        $scope.message="Loading ...";
        $scope.dish = menuFactory.getDishes().get({id:parseInt($stateParams.id,10)})
            .$promise.then(
                function(response){
                    $scope.dish = response;
                    $scope.showDish = true;
                },
                function(response) {
                    $scope.message = "Error: "+response.status + " " + response.statusText;
                }
            );
    $scope.searchBy=searchBy;

}])
    .controller('DishCommentController', ['$scope', 'menuFactory', function($scope,menuFactory) {
    'use strict';
    $scope.formComment = {
        rating:"5",
        comment: "",
        author: "",
        date: ""
    };
        $scope.submitComment = function () {
            $scope.formComment.date = new Date().toISOString();
            console.log($scope.formComment);
            $scope.dish.comments.push($scope.formComment);

            menuFactory.getDishes().update({id:$scope.dish.id},$scope.dish);
            //$scope.formComment.$setPristine(); OVERRIDDEN - DOES NOT WORK!!!!
            $scope.formComment = {rating:5, comment:"", author:"", date:""};
        };


}]);
app.controller("IndexController", ["$scope", "menuFactory", "corporateFactory", function ($scope, menuFactory, corporateFactory) {
    // we just created an empty controller
    'use strict';
    $scope.showDish = false;
    $scope.showChef = false;
    $scope.showPromo = false;
    $scope.message="Loading ...";

    $scope.featuredDish = menuFactory.getDishes().get({id:0})
        .$promise.then(
            function(response){
                $scope.featuredDish = response;
                $scope.showDish = true;
            },
            function(response) {
                $scope.message = "Error: "+response.status + " " + response.statusText;
            }
        );
    $scope.executiveChef = corporateFactory.getLeaders().get({id:3})
        .$promise.then(
            function(response){
                $scope.executiveChef = response;
                $scope.showChef = true;
            },
            function(response) {
                $scope.message = "Error: "+response.status + " " + response.statusText;
            }
        );
    $scope.promoDish = menuFactory.getPromotion().get({id:0})
        .$promise.then(
            function(response){
                $scope.promoDish = response;
                $scope.showPromo = true;
            },
            function(response) {
                $scope.message = "Error: "+response.status + " " + response.statusText;
            }
        );


    // menuFactory.getDish(0) //Utah pizza
    //     .then(
    //         function(response){
    //             $scope.featuredDish = response.data;
    //             $scope.showDish = true;
    //         },
    //         function(response) {
    //             $scope.message = "Error: "+response.status + " " + response.statusText;
    //         }
    //     );
    // corporateFactory.getLeader(3) //Utah pizza
    //     .then(
    //         function(response){
    //             $scope.executiveChef = response.data;
    //             $scope.showChef = true;
    //         },
    //         function(response) {
    //             $scope.message = "Error: "+response.status + " " + response.statusText;
    //         }
    //     );
    // menuFactory.getPromotion(0) //Utah pizza
    //     .then(
    //         function(response){
    //             $scope.promoDish = response.data;
    //             $scope.showPromo = true;
    //         },
    //         function(response) {
    //             $scope.message = "Error: "+response.status + " " + response.statusText;
    //         }
    //     );
}]);
app.controller("AboutController", ["$scope", "corporateFactory", function ($scope, corporateFactory) {
    'use strict';
    $scope.showLeaders = true;
    $scope.message="Loading ...";

    corporateFactory.getLeaders().query(
        function(response) {
            $scope.leadership = response;
            $scope.showLeaders = true;
        },
        function(response) {
            $scope.message = "Error: "+response.status + " " + response.statusText;
        });
}]);

