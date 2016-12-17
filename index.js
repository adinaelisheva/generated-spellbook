(function() {
  var app = angular.module( 'spells', [] );

  var concepts = [
    {name: 'money', positive: true, traits: ['metal','light','green','weight']},
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

  var traitsToIngredients = {
    'metal' : ['coin','red wine','mirror','ring','silver'],
    'light' : ['candle','mirror','gold'],//'eye'],
    'green' : ['green','basil','olive oil','thyme'],
    'weight' : ['stone','dish','grey','black'],
    '' : [],
    '' : [],
    '' : [],
  }

  var namesToObjs = {
    'coin' : { 'name' : 'coin',  'type' : 'object', 'canBeColored' : true},
    'red wine' : { 'name' : 'red wine',  'type' : 'liquid', 'canBeColored' : false},
    'white wine' : { 'name' : 'white wine',  'type' : 'liquid', 'canBeColored' : false},
    'mirror' : { 'name' : 'mirror',  'type' : 'object', 'canBeColored' : true},
    'ring' : { 'name' : 'ring',  'type' : 'object', 'canBeColored' : true},
    'silver' : { 'name' : 'silver',  'type' : 'color', 'canBeColored' : false},
    'green' : { 'name' : 'green',  'type' : 'color', 'canBeColored' : false},
    'gold' : { 'name' : 'gold',  'type' : 'color', 'canBeColored' : false},
    'candle' : { 'name' : 'candle',  'type' : 'object', 'canBeColored' : true},
    //'eye' : { 'name' : 'eye',  'type' : 'symbol', 'canBeColored' : true},
    'basil' : { 'name' : 'basil',  'type' : 'spice', 'canBeColored' : false},
    'thyme' : { 'name' : 'thyme',  'type' : 'spice', 'canBeColored' : false},
    'olive oil' : { 'name' : 'olive oil', 'type' : 'liquid', 'canBeColored' : false},
    'stone' : { 'name' : 'stone',  'type' : 'object', 'canBeColored' : true},
    'dish' : { 'name' : 'dish',  'type' : 'object', 'canBeColored' : true},
    'grey' : { 'name' : 'grey',  'type' : 'color', 'canBeColored' : false},
    'black' : { 'name' : 'black',  'type' : 'color', 'canBeColored' : false}
  }

  godNames = ['Lord','Lady','Master','Mistress','God','Goddess','Saint','Patron','Matron','']

  positiveInvocations = [
    'Call out to the ^ of _',
    'Summon the ^ of _',
    'Beg the ^ of _ for favor',
    'Recite the ancient words of _',
    'Chant the chants of the ^',
    'Sing the ^ of _\'s songs'
  ];
  negativeInvocations = [
    'Reject the ^ of _',
    'Banish the ^ of _',
    'Beg the ^ of _ to spare you',
    'Recite the ancient words to dispel _',
    'Chant the chants of the ^',
    'Sing the songs the ^ of _ detests'
  ];

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

  var getNewIngredient = function(trait,usedNames,canBeAdj) {
    var possIngs = traitsToIngredients[trait];
    possIngs = _.shuffle(possIngs);
    for(var i = 0; i < possIngs.length; i++) {
      var ing = possIngs[i];
      ing = namesToObjs[ing];
      var isAdj = ing.type === 'color';
      if((usedNames.indexOf(ing.name) === -1) && (canBeAdj || !isAdj) ) {
        return ing;
      }
    }
  }

  var getIngredients = function(concept) {
    var stuff = [];
    var colors = [];
    var canBeColored = [];
    for(var i = 0; i < concept.traits.length; i++) {
      var trait = concept.traits[i];
      var names = stuff.concat(colors.concat(canBeColored)).map(function(x) { return x.name; });
      var ing = getNewIngredient(trait, names, colors.length < canBeColored.length);
      if(!ing) { continue; }
      if(ing.type === 'color' ) {
        colors.push(ing);
      } else if(ing.canBeColored) {
        canBeColored.push(ing);
      } else {
        stuff.push(ing);
      }
    }
    for(i = 0; i < canBeColored.length; i++) {
      if(colors[i]) {
        canBeColored[i].name = colors[i].name + ' ' + canBeColored[i].name;
      }
      stuff.push(canBeColored[i]);
    }
    return _.shuffle(stuff);
  }

  var sortByType = function(a,b) {
    return a.type > b.type ? 1 : a.type < b.type ? -1 : 0;
  }

  var getStep = function(ing1,ing2) {
    //types are: 'liquid', 'object', 'spice'
    var ings = [ing1,ing2].sort(sortByType);
    ing1 = ings[0];
    ing2 = ings[1];
    var step,newIng;
    if(ing1.type === 'liquid' && (ing2.type === 'liquid' || ing2.type === 'spice')){
      step = 'Mix ' + ing1.name + ' and ' + ing2.name;
      newIng = { 'name' : ing1.name + ' mixture',  'type' : 'liquid'};
    } else if(ing1.type === 'liquid' && ing2.type === 'object') {
      var optionA = 'Pour ' + ing1.name + ' onto ' + ing2.name;
      var optionB = 'Annoint ' + ing2.name + ' with ' + ing1.name;
      step = rndArr([optionA, optionB]);
      newIng = { 'name' : ing2.name,  'type' : 'object'};
    } else if(ing1.type === 'object' && ing2.type === 'object') {
      var optionA = 'Place ' + ing1.name + ' onto ' + ing2.name;
      var optionB = 'Attach ' + ing2.name + ' to ' + ing1.name;
      step = rndArr([optionA, optionB]);
      newIng = { 'name' : ing1.name + ' and ' + ing2.name,  'type' : 'object'};
    } else if(ing1.type === 'object' && ing2.type === 'spice') {
      step = 'Sprinkle ' + ing2.name + ' onto ' + ing1.name;
      newIng = { 'name' : ing1.name,  'type' : 'object'};
    } else if(ing1.type === 'spice' && ing2.type === 'spice') {
      step = 'Mix ' + ing1.name + ' and ' + ing2.name;
      newIng = { 'name' : ing1.name + ' mixture',  'type' : 'spice'};
    }
    return [step,newIng];
  }

  var getSteps = function(ingredients) {
    ingredients = _.shuffle(ingredients);
    var steps = [];
    while(ingredients.length > 1) {
      //combine the ingredients 1 by 1
      var ing1 = ingredients.pop();
      var ing2 = ingredients.pop();
      var result = getStep(ing1,ing2);
      steps.push(result[0]);
      ingredients.push(result[1]);
    }
    return steps;
  };

  var getInvocation = function(concept) {
    var invocations = concept.positive ? positiveInvocations : negativeInvocations;
    return rndArr(invocations).replace('_',concept.name).replace('^',rndArr(godNames));
  }

  app.controller( 'spellCtrl', function( $scope, $http ) {
    var concept = concepts[0];//rndArr(concepts);
    $scope.spellname = getSpellName(concept);
    var ingredients = getIngredients(concept);
    $scope.ingNameList = ingredients.map(function(x){return x.name;});
    $scope.special = '';
    var steps = getSteps(ingredients)
    steps.push(getInvocation(concept));
    $scope.steps = steps;
    $scope.pagenum = Math.ceil(Math.random() * 997) + 2;
  });

})();
