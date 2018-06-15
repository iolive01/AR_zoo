// $scope, $element, $attrs, $injector, $sce, $timeout, $http, $ionicPopup, and $ionicPopover services are available
var scanned=false;
var clueArrayIndex=-1; //current index of clues array
var nameOfPanel = 'panel';
var startButton = 'start_button';
var nextButton = 'next_button';
var restartButton = 'restart_button';
var clues = ['app/resources/Uploaded/shark_clue_0.png', 'app/resources/Uploaded/shark_answer_0.png', 'app/resources/Uploaded/shark_clue_1.png', 'app/resources/Uploaded/shark_answer_1.png', 'app/resources/Uploaded/shark_clue_2.png', 'app/resources/Uploaded/shark_answer_2.png'];
var tapObjs = ['tapObj0','tapObj1','tapObj2'];
var tapObjIndex=-1;
var startImage = 'app/resources/Uploaded/shark_start.png';
var endImage = 'app/resources/Uploaded/shark_end.png';
var incorrectText = 'incorrect_text';
var exhibitNumber = 2;
var emoji = 'emoji';
var incorrectTextOptions = ['Not quite, try again.', 'Sorry, try again.', 'Wrong spot, try again.', 'Not quit there, keep trying.', 'Keep trying, it has to be somewhere.'];
var hintText = ['Hint: Try tapping near top of the shark!', 'Hint: Try tapping near the mouth!', 'Hint: Try tapping near the middle of the shark!'];
var numberOfIncorrect=0;
var incorrectEmojiOptions = ['😕', '😬', '😅', '😨', '🙁'];
var correctEmojiOptions = ['😁', '😄', '👍', '😎', '😀'];
var defaultEmoji = '🧐';
var endOfExhibitEmoji = '🤩';


var timerId = -1;
var angleIncrement = -.1; // degrees
var timingInterval = 30; // milliseconds
var myStorage = window.sessionStorage;

$scope.rotateModel = function(){
  
  myAudio = new Audio('app/resources/Uploaded/Underwater sound effect.mp3'); 
myAudio.addEventListener('ended', function() {
    this.currentTime = 0;
    this.play();
}, false);
myAudio.play();
  
  
console.log($scope.app);
    if (timerId > -1) {
    clearInterval(timerId);
  }

  timerId = setInterval(function() {
  	
  	if (!$scope.app.params.ry) {
      $scope.app.params.ry = 0;
    }
    
    $scope.$apply(function(){
  
	$scope.app.params.ry += angleIncrement % 360;
    });
    }, timingInterval);
};

function sleep(delay) {
        var start = new Date().getTime();
        while (new Date().getTime() < start + delay);
      }

//Tap the model and it's not the correct spot
$scope.TestIncorrectTap = function() {
	if($scope.app.view.shark.wdg[startButton]['visible'] == false && $scope.app.view.shark.wdg[restartButton]['visible'] == false&& $scope.app.view.shark.wdg[nextButton]['visible'] == false) {
numberOfIncorrect++;
    	  ChangeProperty(incorrectText, 'visible', true);
console.log($scope.app);
              if(numberOfIncorrect%2==0) {
                  ChangeProperty('incorrect_img', 'ry', 0);
        }
        else {
                            ChangeProperty('incorrect_img', 'ry', 180);

        }
      if(numberOfIncorrect<5){
                  ChangeProperty(incorrectText, 'text', incorrectTextOptions[Math.floor(Math.random() * incorrectTextOptions.length)]);
        
        //red.delay( 800 );
		//
         ChangeProperty('incorrect_img', 'visible', true);

      }
      else {
        
                          ChangeProperty(incorrectText, 'text', hintText[clueArrayIndex/2]);

      }
          ChangeProperty(emoji, 'text', incorrectEmojiOptions[Math.floor(Math.random() * incorrectEmojiOptions.length)]);

    }

}




//The player has just scanned the model
function enableBadges() {
     
        if(myStorage.getItem('completedSnake')=='yes') {
      ChangeProperty('snake_badge', 'opacity', 1); 
    }
     if(myStorage.getItem('completedShark')=='yes') {
      ChangeProperty('shark_badge', 'opacity', 1); 
    }
         if(myStorage.getItem('completedElephant')=='yes') {
      ChangeProperty('elephant_badge', 'opacity', 1); 
    } 
}

window.onbeforeunload = function (e) {
 myStorage.clear(); 
}
$scope.VeryStart = function() {
  if(myStorage.getItem('started')!='yes') {
    myStorage.setItem('started', 'yes');
    myStorage.setItem('completedSnake', 'no');
    myStorage.setItem('completedelElephant', 'no');
    myStorage.setItem('completedShark', 'no');
  }

}
//reset
$scope.HasBeenScanned = function() {
  if(!scanned){
    enableBadges();
    console.log("scanned");
    ChangeProperty(emoji, 'text', defaultEmoji);

    ChangeProperty(startButton, 'visible', true);
    ChangeProperty(restartButton, 'visible', false);
	ChangeProperty(nameOfPanel, 'resource', startImage);
    ChangeProperty(nameOfPanel, 'src', startImage);
    ChangeProperty(nameOfPanel, 'visible', true);
    
    //badges
    
    ChangeProperty('snake_badge', 'text', '🐍');
ChangeProperty('elephant_badge', 'text', '🐘');
ChangeProperty('shark_badge', 'text', '🦈');

  }
  scanned = true;
}
$scope.HasBeenScanned2 = function() {

    enableBadges();
    console.log("scanned");
    ChangeProperty(emoji, 'text', defaultEmoji);

    ChangeProperty(startButton, 'visible', true);
    ChangeProperty(restartButton, 'visible', false);
	ChangeProperty(nameOfPanel, 'resource', startImage);
    ChangeProperty(nameOfPanel, 'src', startImage);
    ChangeProperty(nameOfPanel, 'visible', true);
  
  scanned = true;
}
$scope.SetToStart = function() {
  	if(!scanned) {
      enableBadges();
          ChangeProperty(emoji, 'text', defaultEmoji);

  	ChangeProperty(startButton, 'visible', true);
    ChangeProperty(restartButton, 'visible', false);
	ChangeProperty(nameOfPanel, 'res1ource', startImage);
      	ChangeProperty(nameOfPanel, 'src', startImage);

    }
}
$scope.SetToEnd = function() {
           ChangeProperty('correct_img', 'visible', false);

	ChangeProperty(nameOfPanel, 'resource', endImage);
  	ChangeProperty(nameOfPanel, 'src', endImage);

      ChangeProperty(restartButton, 'visible', true);
  clueArrayIndex=-1;
  tapObjIndex=-1;
}
function SetToEnd() {
             ChangeProperty('correct_img', 'visible', false);

  	ChangeProperty(nameOfPanel, 'resource', endImage);
  	ChangeProperty(nameOfPanel, 'src', endImage);

      ChangeProperty(restartButton, 'visible', true);
    clueArrayIndex=-1;
tapObjIndex=-1;
}

$scope.NextClue = function() {
           ChangeProperty('correct_img', 'visible', false);

  numberOfIncorrect=0;
    ChangeProperty(incorrectText, 'visible', false);

    ChangeProperty(startButton, 'visible', false);
  	clueArrayIndex++;
	if(clueArrayIndex<clues.length) {
      ChangeProperty(nameOfPanel, 'resource', clues[clueArrayIndex]);
            ChangeProperty(nameOfPanel, 'src', clues[clueArrayIndex]);

    
  if(clueArrayIndex%2==1) {
		ChangeProperty(emoji, 'text', correctEmojiOptions[Math.floor(Math.random() * correctEmojiOptions.length)]);

       ChangeProperty(nextButton, 'visible', true); 
       ChangeProperty(tapObjs[tapObjIndex], 'visible', false); 
        ChangeProperty(incorrectText, 'visible', true);
               ChangeProperty('incorrect_img', 'visible', false);

                 ChangeProperty('correct_img', 'visible', true);

		ChangeProperty(incorrectText, 'text', 'Correct!');
  }
  else {
        ChangeProperty(emoji, 'text', '🤔');

    	tapObjIndex++;
       ChangeProperty(nextButton, 'visible', false); 
       ChangeProperty(tapObjs[tapObjIndex], 'visible', true); 
    
  }
    }
  else{
    
    ChangeProperty(nextButton, 'visible', false); 
    //SET TO END
    	SetToEnd(); 
    		ChangeProperty(emoji, 'text', endOfExhibitEmoji);
if(exhibitNumber==1) {
      $scope.app.params.exhibit_1_complete= 0;
      ChangeProperty('snake_badge', 'visible', true); 
                myStorage.setItem('completedSnake', 'yes');


    }
        if(exhibitNumber==2) {
      $scope.app.params.exhibit_2_complete= 0;
                ChangeProperty('shark_badge', 'visible', true); 
        myStorage.setItem('completedShark', 'yes');

    }
        if(exhibitNumber==3) {
      $scope.app.params.exhibit_3_complete= 0;
                ChangeProperty('elephant_badge', 'visible', true); 

    myStorage.setItem('completedElephant', 'yes');

    }
      enableBadges();

  }
 
}
$scope.ResetScan = function() {
	scanned=false;
  
}
function ChangeProperty(object, property, value) {

	$scope.app.view.shark.wdg[object][property] = value;
  	//$scope.app.view.shark.wdg[object].UpdatePropertyValues($scope.app.view.shark.wdg[object][property]);
  
}