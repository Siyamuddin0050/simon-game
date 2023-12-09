var gamePattern = [];
var userClickedPattern = [];
var buttonColours = ["green", "red", "yellow", "blue"];

var level = 0;
var started = false;

$(document).keypress(function () {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
  }
});

$(".btn").on("click", function () {
  var userChosenColor = $(this).attr("id");
  console.log(userChosenColor);
  userClickedPattern.push(userChosenColor);

  playSound(userChosenColor);
  animatePress(userChosenColor);

  checkAnswer(userClickedPattern.length - 1);
});

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log("success");
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    console.log("wrong");

    playSound("wrong");
    $("body").addClass('game-over');
    setTimeout(()=>{
        $("body").removeClass('game-over');
    },200);
    $("#level-title").text("Game Over, Press Any Key to Restart ");
    startOver();
  }
}

function startOver(){
    level = 0;
    gamePattern = [];
    started = false;
}

function animatePress(currentColour) {
  $("." + currentColour).addClass("pressed");
  setTimeout(function () {
    $("." + currentColour).removeClass("pressed");
  }, 100);
}

function nextSequence() {
    userClickedPattern = [];
    level++;

  $("#level-title").text("Level " + level);
  randumNumber = Math.floor(Math.random() * 4);
  console.log(randumNumber);
  randomChosenColour = buttonColours[randumNumber];
  console.log(randomChosenColour);
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);
    playSound(randomChosenColour);
}
function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
  }