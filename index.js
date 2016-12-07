(function() {
  var app = angular.module( 'spells', [] );

  app.controller( 'spellCtrl', function( $scope, $http ) {
    $scope.spellname = "A spell to rid yourself of hunger";
    $scope.ingredients = [
      "3 pinches of salt",
      "The foot of a spider",
      "1 small glass of water"
    ];
    $scope.special = "Perform while sitting alone in a room, preferably seated on the floor.";
    $scope.steps = [
      "Mix the salt and spider leg into the water.",
      "Drink without breathing."
    ];

    $scope.pagenum = Math.ceil(Math.random() * 997) + 2;
  });

})();
