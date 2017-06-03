/**
 * Created by Peter on 25.5.2017
 */
var colors = ["Navy","Aqua","Bisque","FloralWhite","Crimson","Gainsboro","HotPink","Ivory","Lime","Khaki",
                "Maroon","Violet","Orchid","Peru","Salmon","Tan","Wheat","DarkTurquoise", "Yellow","Red"];
var selectedColors = [];
var pcColor;
var counter = 0;
var onStartClick = function() {
    swal({
            title: "Greetings!",
            text: "Welcome to our color guessing game! Care for a try?",
            type: "info",
            showCancelButton: true,
            confirmButtonColor: "#032E37",
            confirmButtonText: "Yes, go for it!",
            cancelButtonText: "No, cancel that!",
            closeOnConfirm: false,
            closeOnCancel: false
        },
        function(isConfirm){
            if (isConfirm) {
               gameOn();
            } else {
                swal("Cancelled", "Hope to see you soon! BB. :)", "info");
            }
        });

};
var onAboutClick = function() {
    swal({
            title: "Here are the rules.",
            text: "This is a color guessing game. Computer picks a color and you have to type in the right answer." + "\n\r"+
            "You have unlimited number of tries. Once you guess, the page background will change." + "\n\r" +
            "Have fun!",
            type: "info",
            showCancelButton: false,
            confirmButtonColor: "#032E37",
            confirmButtonText: "OK, got it!",
            closeOnConfirm: false,
            closeOnCancel: false
        });

};
var element = document.getElementById("start");
var about = document.getElementById("clickableAwesomeFont");
console.log(about);
about.addEventListener('click', onAboutClick , false);
element.addEventListener('click', onStartClick , false);

function gameOn() {
    counter = 0;
    selectedColors = generateColors();
    setTimeout(function(){ pcColor = getComputerGuess(selectedColors); }, 500);

    var done = false;
 do {
     done = callInput("");
 }
 while (!done)
}
function callInput(hintText) {
    var gameColors = selectedColors,
        correcto=false,
        firstEntry=true,
        hint;

    swal({
            title: "Guess the color!",
            text: gameColors.join(", ") + "\n\r" + hintText,
            type: "input",
            showCancelButton: true,
            closeOnConfirm: false,
            animation: "slide-from-top",
            inputPlaceholder: "Write something"
        },
        function(inputValue){
            firstEntry=false;
            if (inputValue === false) return false;

            else if(inputValue === "") {
                swal.showInputError("You need to write something!");
                return false
            }
            else if(!isNaN(inputValue)) {
                swal.showInputError("I do not recognise that color!");
                return false
            }
            if (inputValue!=="") {
                counter += 1;
                correcto = checkAnswer(inputValue);
                if (!correcto) {
                    hint = "Your color is alphabetically " + hinter(inputValue.toString()) + " than mine...";
                    callInput(hint);
                } else {
                    document.getElementsByTagName("body")[0].style.background = pcColor;
                    document.getElementById("natGeo").style.visibility = "hidden";
                    swal({
                            title: "Great!",
                            text: "Right answer! It took you " + counter + " tries.",
                            type: "success",
                            closeOnConfirm: true
                        },
                        function(){
                            document.getElementsByTagName("body")[0].style.backgroundImage = "url(\"http://www.nationalgeographic.com/content/dam/photography/photos/000/013/1399.ngsversion.1467942034668.adapt.1900.1.jpg\")";
                            document.getElementsByTagName("body")[0].style.backgroundSize = "cover";
                            document.getElementById("natGeo").style.visibility = "visible";
                        });
                    counter = 0;
                }
            }
        });
    return correcto || firstEntry;
}

function getComputerGuess(gameColors) {
var indexOfColor = Math.floor(Math.random()*10);
    if (indexOfColor >= 0 && indexOfColor <= 9) {
        return gameColors[indexOfColor];
    } else {
        return gameColors[7];
    }

}
function checkAnswer(userColor) {
    if(typeof pcColor === 'undefined') {
        pcColor = getComputerGuess(selectedColors);
        console.log("Changing")
    }
    var pcSets = pcColor.toLowerCase();
   return userColor.toLowerCase() === pcSets;

}
function hinter(userColor) {
    var pcSetsColor = pcColor.toLowerCase(),
        code1 = pcSetsColor.charCodeAt(0),
        code2 = userColor.toLowerCase().charCodeAt(0);
    if (code1>code2) {
        return "lower";
    } else if (code1<code2){
        return "higher";
    } else {
        return "... actually equal ..."
    }
}
function generateColors() {
var indexes = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19],
    i=0,
    len=8,
    newColors=[];
    function shuffle(o) {
        for(var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
        return o;
    };

    var random = shuffle(indexes);
    for (i; i<len;i+=1) {
        newColors[i]=colors[random[i]];
    }
    return newColors;
}