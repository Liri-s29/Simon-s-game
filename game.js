var gamePattern = [];
var userClickedPattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];
var level = 0;
var started = false;
var heading = $("#simons-game");
var timer = 1001;
var counter = 1;
if(innerWidth < 991){
    $(".mob").on("click",function(){ // calls the function nextSequence when the letter A is pressed
        if (!started){
            nextSequence();
            started = true;
            heading.remove();
        }
    });
}
else{
    $(document).on("keydown",function(){ // calls the function nextSequence when the letter A is pressed
        if (!started){
            nextSequence();
            started = true;
            heading.remove();
        } 
    });
}

$(".btn").on("click", function(){ //when a button is clicked, its colour will be added to the user pattern array
    
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    animatePress(userChosenColour);
    checkLevel(userClickedPattern.length-1);

});

function nextSequence(){ // randomly chosen colour will flash and the colour will be updated in game patter array
    
    level += 1;
    if(innerWidth < 991){
        $(".mob").text("level "+level);
    }else{
        $(".pc").text("level "+level);
    }
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    playSound(randomChosenColour);
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    
    
}


function playSound(name){ // plays sound for each button when its pressed or called.
   
    var audio = new Audio("sounds/"+name+".mp3");
    audio.play();

}

function animatePress(currentColour){
    
    console.log(currentColour);
    $("#"+currentColour).addClass("pressed");
    setTimeout(function(){
        $("#"+currentColour).removeClass("pressed");
    },100);

}
function checkLevel(currentLevel){
     if(level === 50){
        $(".pc").text("Yay!!, You Won!`. Game Over, Press Any Key to Restart ");
         $(".mob").text("Yay!!, You Won!. Game Over, Click here to Restart ");
         startOver();
     }
     else if(userClickedPattern[currentLevel] === gamePattern[currentLevel]){
            console.log("Success");
            if(userClickedPattern.length === gamePattern.length){
               setTimeout(function(){
                   nextSequence();
               },difficulty());
           }
         
     } 
     else{
         console.log("Level Failed");
         $(".pc").text("Game Over, Press Any Key to Restart");
         $(".mob").text("Game Over, Click here to Restart");
         $("body").addClass("game-over");
         setTimeout(function(){
            $("body").removeClass("game-over");
         },300);
         playSound("wrong");
         startOver();
     }
}

function startOver(){
    userClickedPattern = [];
    gamePattern = [];
    started = false;
    level = 0;
    $("body").append(heading);
}

function difficulty(){
    
    if (level === counter*5){
        counter++;
        timer -= 100;
    }
    console.log(timer);
    console.log(counter);
    return timer;
}