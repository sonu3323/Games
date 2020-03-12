console.log("Js file is loeaded");


let userClickedPattern = [];
let gamePattern = [];

let buttonColors = ["red","green", "blue" , "yellow"];


let level = 0;
let started = false;


$(document).keypress(function () { 
  
    if(!started){
        $("#level-title").text(`Level - ${level}`);
        nextSequence();
        started=true;
    }
   
    
});



$(".btn").click((e)=>{
    
   
    let userChosenColor = e.target.id;
    console.log(userChosenColor)
    userClickedPattern.push(userChosenColor);
   // console.log(userClickedPattern);

   playSound(userChosenColor);
   
   animatePress(userChosenColor)

   checkAnswer(userClickedPattern.length-1);
    
});



const checkAnswer=(currentLevel)=>{
  
  console.log(userClickedPattern);
  console.log(gamePattern)
    if(gamePattern[currentLevel]===userClickedPattern[currentLevel]) {
        if(userClickedPattern.length===gamePattern.length) {
            setTimeout(()=>{
                nextSequence();
            },1000)
        }
    }else{
        playSound("wrong");
        $("body").addClass("game-over");
        $("#level-title").text("Game Over , Press any key to start");

        setTimeout(()=>{
            $("body").removeClass("game-over");
        },200);
        
        startOver();
    }

};



//Function for Sounds play --- 
const playSound=(name)=> {
    let sound = new Audio();
    sound.src = `/sounds/${name}.mp3`;
   
    sound.play();
 };




const animatePress=(currentColor)=>{
    $(`#${currentColor}`).addClass("pressed");

    setTimeout(()=>{
        $(`#${currentColor}`).removeClass("pressed")
    } ,100);
};




const nextSequence=()=> {

userClickedPattern =[];
level++;

$("#level-title").text(`Level - ${level}`);

let randomNumber = Math.floor(Math.random() * 4);
let randomChosencolor = buttonColors[randomNumber];

gamePattern.push(randomChosencolor)

  $(`#${randomChosencolor}`).fadeOut(100).fadeIn(100);

playSound(randomChosencolor);

};


//console.log(gamePattern)

const startOver=()=>{

    level=0;
    gamePattern =[]; 
    started = false;
};