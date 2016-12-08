(function() {
  var app = angular.module( 'spells', [] );

  var concepts = [
    {name: 'money', positive: true, traits: ['','','','','','']},
    {name: 'love', positive: true, traits: ['','','','','','']},
    {name: 'luck', positive: true, traits: ['','','','','','']},
    {name: 'fortune', positive: true, traits: ['','','','','','']},
    {name: 'health', positive: true, traits: ['','','','','','']},
    {name: 'peace', positive: true, traits: ['','','','','','']},
    {name: 'joy', positive: true, traits: ['','','','','','']},
    {name: 'calm', positive: true, traits: ['','','','','','']},
    {name: 'strength', positive: true, traits: ['','','','','','']},
    {name: 'work', positive: true, traits: ['','','','','','']},
    {name: 'work', positive: false, traits: ['','','','','','']},
    {name: 'sorrow', positive: false, traits: ['','','','','','']},
    {name: 'fatigue', positive: false, traits: ['','','','','','']},
    {name: 'hunger', positive: false, traits: ['','','','','','']},
    {name: 'ill luck', positive: false, traits: ['','','','','','']},
    {name: 'bad fortune', positive: false, traits: ['','','','','','']},
    {name: 'negative influences', positive: false, traits: ['','','','','','']},
    {name: 'enemies', positive: false, traits: ['','','','','','']}
  ]

  var rndArr = function(array) {
    var index = Math.floor(Math.random() * array.length);
    return array[index];
  }

  var getSpellName = function(concept) {
    var positives = ['summon ','bring ','draw in ','call ','find ','discover ', 'gather ', 'draw '];
    var negatives = ['banish ','rid yourself of ','undo ','get rid of ','dispel ','drive away ', 'eliminate ', 'eradicate '];
    var verb = concept.positive ? rndArr(positives) : rndArr(negatives);
    return 'A spell to ' + verb + concept.name;
  }

  app.controller( 'spellCtrl', function( $scope, $http ) {
    var concept = rndArr(concepts);
    $scope.spellname = getSpellName(concept);
    $scope.ingredients = [
      '3 pinches of salt',
      'The foot of a spider',
      '1 small glass of water'
    ];
    $scope.special = 'Perform while sitting alone in a room, preferably seated on the floor.';
    $scope.steps = [
      'Mix the salt and spider leg into the water.',
      'Drink without breathing.'
    ];

    $scope.pagenum = Math.ceil(Math.random() * 997) + 2;
  });

})();
